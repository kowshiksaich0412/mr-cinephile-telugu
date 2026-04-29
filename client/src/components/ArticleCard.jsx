import { Link } from "react-router-dom";
import { resolveMediaUrl } from "../utils/media";
import { getPostPath } from "../utils/posts";

function ArticleCard({ post }) {
  const targetPath = getPostPath(post);

  return (
    <article className="group rounded-lg border border-zinc-800 bg-zinc-950 transition hover:-translate-y-1 hover:border-brand-red">
      <img
        src={resolveMediaUrl(post.image) || "https://placehold.co/600x350/101010/e50914?text=Mr+Cinephile+Telugu"}
        alt={post.title}
        className="h-48 w-full rounded-t-lg object-cover"
      />
      <div className="space-y-2 p-4">
        <span className="text-xs uppercase tracking-wide text-brand-red">{post.category}</span>
        <h3 className="line-clamp-2 text-lg font-semibold">{post.title}</h3>
        <p className="line-clamp-3 text-sm text-zinc-300">{post.summary || "Detailed analysis on latest Telugu cinema updates."}</p>
        {post.category === "review" && (
          <p className="text-sm font-semibold text-yellow-400">Rating: {post.rating || 0}/5</p>
        )}
        <Link
          to={targetPath}
          className="inline-block text-sm font-medium text-brand-red group-hover:underline"
        >
          Read more
        </Link>
      </div>
    </article>
  );
}

export default ArticleCard;
