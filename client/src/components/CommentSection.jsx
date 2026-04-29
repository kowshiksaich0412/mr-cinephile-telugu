import { useEffect, useState } from "react";
import { commentApi, getApiErrorMessage } from "../services/api";

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadComments = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await commentApi.listByPost(postId);
      setComments(data);
    } catch (err) {
      setError(getApiErrorMessage(err, "Unable to load comments."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) loadComments();
  }, [postId]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError("");
      await commentApi.create(postId, form);
      setForm({ name: "", message: "" });
      await loadComments();
    } catch (err) {
      setError(getApiErrorMessage(err, "Unable to post your comment."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-10 rounded-lg border border-zinc-800 bg-zinc-950 p-6">
      <h3 className="text-xl font-semibold">Discussion</h3>
      <form onSubmit={submit} className="mt-4 grid gap-3">
        <input
          required
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2"
        />
        <textarea
          required
          rows={4}
          placeholder="Write your thoughts"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2"
        />
        <button
          disabled={submitting}
          className="w-fit rounded bg-brand-red px-4 py-2 font-semibold disabled:opacity-70"
        >
          {submitting ? "Posting..." : "Post Comment"}
        </button>
      </form>

      <div className="mt-6 space-y-4">
        {error && <p className="text-sm text-red-400">{error}</p>}
        {loading && <p className="text-sm text-zinc-400">Loading comments...</p>}
        {!loading && comments.length === 0 && !error && (
          <p className="text-sm text-zinc-400">No comments yet. Start the discussion.</p>
        )}
        {comments.map((comment) => (
          <div key={comment._id} className="rounded border border-zinc-800 p-4">
            <p className="font-semibold">{comment.name}</p>
            <p className="mt-1 text-zinc-300">{comment.message}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CommentSection;
