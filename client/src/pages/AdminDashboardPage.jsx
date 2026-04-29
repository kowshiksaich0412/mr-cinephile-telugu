import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { postApi } from "../services/api";
import AdminPostForm from "../components/AdminPostForm";
import { getApiErrorMessage } from "../services/api";

function AdminDashboardPage() {
  const { token, logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [error, setError] = useState("");

  const loadPosts = async () => {
    try {
      setError("");
      const data = await postApi.list({
        limit: 200,
        ...(categoryFilter ? { category: categoryFilter } : {})
      });
      setPosts(data.items);
    } catch (err) {
      setError(getApiErrorMessage(err, "Unable to load posts right now."));
    }
  };

  useEffect(() => {
    loadPosts();
  }, [categoryFilter]);

  const normalizePayload = (payload) => {
    const tagsRaw = String(payload.get("tags") || "");
    payload.delete("tags");
    const cleanTags = tagsRaw
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    payload.append("tags", cleanTags.join(","));
    return payload;
  };

  const handleSubmit = async (payload) => {
    setLoading(true);
    const cleanPayload = normalizePayload(payload);
    try {
      setError("");
      if (editingPost) {
        await postApi.update(editingPost._id, cleanPayload, token);
      } else {
        await postApi.create(cleanPayload, token);
      }
      setEditingPost(null);
      await loadPosts();
    } catch (err) {
      setError(getApiErrorMessage(err, "Unable to save the post."));
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      setError("");
      await postApi.remove(id, token);
      await loadPosts();
    } catch (err) {
      setError(getApiErrorMessage(err, "Unable to delete the post."));
    }
  };

  return (
    <div className="min-h-screen bg-brand-black p-4 text-white md:p-8">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-5">
        <div className="md:col-span-2">
          <AdminPostForm
            onSubmit={handleSubmit}
            editingPost={editingPost}
            loading={loading}
            onCancel={() => setEditingPost(null)}
          />
          <button onClick={logout} className="mt-3 rounded border border-zinc-600 px-4 py-2 text-sm">
            Logout
          </button>
        </div>
        <div className="md:col-span-3 rounded-lg border border-zinc-800 bg-zinc-950 p-4">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">Manage Articles</h2>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm"
            >
              <option value="">All Categories</option>
              <option value="review">Review</option>
              <option value="news">News</option>
              <option value="trailer">Trailer</option>
              <option value="list">List</option>
            </select>
          </div>
          {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post._id}
                className="flex flex-wrap items-center justify-between gap-3 rounded border border-zinc-800 p-3"
              >
                <div>
                  <p className="font-semibold">{post.title}</p>
                  <p className="text-xs uppercase text-brand-red">{post.category}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingPost(post)}
                    className="rounded border border-zinc-600 px-3 py-1 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePost(post._id)}
                    className="rounded bg-brand-red px-3 py-1 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
