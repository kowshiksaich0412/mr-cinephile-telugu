import { useEffect, useMemo, useState } from "react";

const initialState = {
  title: "",
  category: "review",
  summary: "",
  content: "",
  rating: "",
  author: "Mr Cinephile Telugu",
  tags: ""
};

const buildFormState = (editingPost) => {
  if (!editingPost) return initialState;

  return {
    title: editingPost.title || "",
    category: editingPost.category || "review",
    summary: editingPost.summary || "",
    content: editingPost.content || "",
    rating: editingPost.rating ?? "",
    author: editingPost.author || "Mr Cinephile Telugu",
    tags: (editingPost.tags || []).join(", ")
  };
};

function AdminPostForm({ onSubmit, editingPost, loading, onCancel }) {
  const [form, setForm] = useState(() => buildFormState(editingPost));
  const [imageFile, setImageFile] = useState(null);

  const isReview = useMemo(() => form.category === "review", [form.category]);

  useEffect(() => {
    setForm(buildFormState(editingPost));
    setImageFile(null);
  }, [editingPost]);

  const submit = (event) => {
    event.preventDefault();
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "rating" && !isReview) return;
      if (key === "rating" && value === "") return;
      payload.append(key, value);
    });
    if (imageFile) payload.append("image", imageFile);
    onSubmit(payload);
  };

  return (
    <form onSubmit={submit} className="grid gap-3 rounded-lg border border-zinc-800 bg-zinc-950 p-4">
      <h3 className="text-lg font-semibold">{editingPost ? "Edit Post" : "Create New Post"}</h3>
      <input
        required
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Title"
        className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2"
      />
      <select
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2"
      >
        <option value="review">Review</option>
        <option value="news">News</option>
        <option value="trailer">Trailer</option>
        <option value="list">Top List</option>
      </select>
      <input
        value={form.summary}
        onChange={(e) => setForm({ ...form, summary: e.target.value })}
        placeholder="Short summary"
        className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2"
      />
      <textarea
        rows={8}
        required
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        placeholder={
          isReview
            ? "Use sections like: Story Overview:, Performance Analysis:, Music Review:, Cinematography Analysis:, Final Verdict:"
            : "Write article content"
        }
        className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2"
      />
      <div className="grid gap-3 md:grid-cols-2">
        <input
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          placeholder="Author"
          className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2"
        />
        <input
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          placeholder="Tags (comma separated)"
          className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2"
        />
      </div>
      {isReview && (
        <input
          type="number"
          min="0"
          max="5"
          step="0.1"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: e.target.value })}
          placeholder="Rating /5"
          className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2"
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2"
      />
      <div className="flex gap-2">
        <button className="rounded bg-brand-red px-4 py-2 font-semibold disabled:opacity-70" disabled={loading}>
          {loading ? "Saving..." : editingPost ? "Update Post" : "Create Post"}
        </button>
        {editingPost && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded border border-zinc-600 px-4 py-2"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default AdminPostForm;
