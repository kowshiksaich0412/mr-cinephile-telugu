import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="container-pad py-20 text-center">
      <h1 className="text-5xl font-bold text-brand-red">404</h1>
      <p className="mt-3 text-zinc-300">Page not found.</p>
      <Link to="/" className="mt-6 inline-block rounded bg-brand-red px-5 py-2 font-semibold">
        Back to Home
      </Link>
    </section>
  );
}

export default NotFoundPage;
