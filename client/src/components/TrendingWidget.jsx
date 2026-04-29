import { Link } from "react-router-dom";
import { getPostPath } from "../utils/posts";

function TrendingWidget({ posts }) {
  return (
    <aside className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
      <h3 className="mb-3 text-lg font-semibold text-brand-red">Trending Movies</h3>
      <ul className="space-y-3">
        {posts.map((post, idx) => (
          <li key={post._id} className="flex items-start gap-3 border-b border-zinc-800 pb-3 last:border-b-0">
            <span className="text-sm font-bold text-zinc-500">{String(idx + 1).padStart(2, "0")}</span>
            <Link to={getPostPath(post)} className="text-sm hover:text-brand-red">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default TrendingWidget;
