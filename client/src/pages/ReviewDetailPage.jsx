import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { getApiErrorMessage, postApi } from "../services/api";
import { resolveMediaUrl } from "../utils/media";
import CommentSection from "../components/CommentSection";
import SocialShareButtons from "../components/SocialShareButtons";

const sectionTitles = [
  "Story Overview",
  "Performance Analysis",
  "Music Review",
  "Cinematography Analysis",
  "Final Verdict"
];

function extractSection(content, title) {
  const regex = new RegExp(`${title}:([\\s\\S]*?)(?=\\n[A-Za-z ]+:|$)`, "i");
  const match = content.match(regex);
  return match?.[1]?.trim() || "";
}

function ReviewDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await postApi.getBySlug(slug);
        setPost(data);
      } catch (err) {
        setError(getApiErrorMessage(err, "Unable to load this review."));
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  const parsedSections = useMemo(() => {
    if (!post?.content) return {};
    return Object.fromEntries(sectionTitles.map((title) => [title, extractSection(post.content, title)]));
  }, [post]);

  if (loading) {
    return <section className="container-pad py-10">Loading...</section>;
  }
  if (error) {
    return <section className="container-pad py-10 text-red-400">{error}</section>;
  }
  if (!post) {
    return <section className="container-pad py-10">Review not found.</section>;
  }

  return (
    <article className="container-pad py-10">
      <Helmet>
        <title>{post.title} Review | Mr Cinephile Telugu</title>
        <meta name="description" content={post.summary || post.title} />
      </Helmet>
      <img
        src={resolveMediaUrl(post.image) || "https://placehold.co/1100x420/111/e50914?text=Movie+Poster"}
        alt={post.title}
        className="h-72 w-full rounded-lg object-cover md:h-[420px]"
      />
      <h1 className="mt-6 text-3xl font-bold">{post.title}</h1>
      <p className="mt-2 text-yellow-400">Rating: {post.rating || 0}/5</p>
      <div className="mt-4">
        <SocialShareButtons title={post.title} />
      </div>

      <div className="mt-8 space-y-8">
        {sectionTitles.map((title) => (
          <section key={title} className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
            <h2 className="text-xl font-semibold text-brand-red">{title}</h2>
            <p className="mt-2 whitespace-pre-line text-zinc-300">
              {parsedSections[title] || "Section not provided in this review."}
            </p>
          </section>
        ))}
      </div>

      <section className="mt-8 rounded-lg border border-zinc-800 bg-zinc-950 p-5">
        <h2 className="text-xl font-semibold text-brand-red">Full Review</h2>
        <p className="mt-2 whitespace-pre-line text-zinc-300">{post.content}</p>
      </section>

      <CommentSection postId={post._id} />
    </article>
  );
}

export default ReviewDetailPage;
