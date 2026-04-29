import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/reviews", label: "Reviews" },
  { to: "/trailers", label: "Trailer Breakdown" },
  { to: "/top-lists", label: "Top Lists" },
  { to: "/news", label: "News" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" }
];

function Layout() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const onSearch = (event) => {
    event.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-brand-black text-white">
      <header className="sticky top-0 z-20 border-b border-zinc-800 bg-brand-black/95 backdrop-blur">
        <div className="container-pad flex flex-wrap items-center justify-between gap-4 py-4">
          <Link to="/" className="text-xl font-bold tracking-wide text-brand-red">
            Mr Cinephile Telugu
          </Link>
          <nav className="flex flex-wrap gap-4 text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? "text-brand-red" : "text-zinc-300 hover:text-white"
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <form onSubmit={onSearch} className="flex w-full max-w-xs">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies, reviews..."
              className="w-full rounded-l-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm focus:outline-none"
            />
            <button className="rounded-r-md bg-brand-red px-3 py-2 text-sm font-semibold">
              Search
            </button>
          </form>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="mt-16 border-t border-zinc-800 py-8 text-center text-sm text-zinc-400">
        <div className="container-pad">
          <p>Mr Cinephile Telugu © {new Date().getFullYear()} | Telugu Cinema Journalism</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
