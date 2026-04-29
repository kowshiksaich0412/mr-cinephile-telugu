import { Link } from "react-router-dom";
import { resolveMediaUrl } from "../utils/media";
import { getPostPath } from "../utils/posts";

function HeroBanner({ post }) {
  if (!post) return null;

  return (
    <section className="container-pad py-8">
      <div className="relative overflow-hidden rounded-xl border border-zinc-800">
        <img
          src={resolveMediaUrl(post.image) || "https://placehold.co/1200x500/0f0f0f/e50914?text=Trending+Banner"}
          alt={post.title}
          className="h-72 w-full object-cover opacity-60 md:h-96"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent p-6 md:p-10">
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-brand-red">Trending Now</p>
          <h1 className="max-w-2xl text-3xl font-bold md:text-5xl">{post.title}</h1>
          <p className="mt-3 max-w-xl text-zinc-300">{post.summary}</p>
          <Link
            to={getPostPath(post)}
            className="mt-6 inline-block rounded-md bg-brand-red px-5 py-3 font-semibold hover:shadow-glow"
          >
            Read Full Article
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
