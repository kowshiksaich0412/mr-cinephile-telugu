import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { getApiErrorMessage, postApi } from "../services/api";
import { resolveMediaUrl } from "../utils/media";
import SocialShareButtons from "../components/SocialShareButtons";

function PostDetailPage() {
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
        setError(getApiErrorMessage(err, "Unable to load this article."));
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) return <section className="container-pad py-10">Loading...</section>;
  if (error) return <section className="container-pad py-10 text-red-400">{error}</section>;
  if (!post) return <section className="container-pad py-10">Article not found.</section>;

  return (
    <article className="container-pad py-10">
      <Helmet>
        <title>{post.title} | Mr Cinephile Telugu</title>
      </Helmet>
      <img
        src={resolveMediaUrl(post.image) || "https://placehold.co/1100x420/111/e50914?text=Mr+Cinephile+Telugu"}
        alt={post.title}
        className="h-72 w-full rounded-lg object-cover md:h-[420px]"
      />
      <h1 className="mt-6 text-3xl font-bold">{post.title}</h1>
      <p className="mt-1 text-sm uppercase tracking-wider text-brand-red">{post.category}</p>
      <div className="mt-4">
        <SocialShareButtons title={post.title} />
      </div>
      <div className="mt-8 rounded-lg border border-zinc-800 bg-zinc-950 p-5">
        <p className="whitespace-pre-line leading-7 text-zinc-300">{post.content}</p>
      </div>
    </article>
  );
}

export default PostDetailPage;
