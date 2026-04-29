import { Helmet } from "react-helmet-async";

function AboutPage() {
  return (
    <section className="container-pad py-10">
      <Helmet>
        <title>About | Mr Cinephile Telugu</title>
      </Helmet>
      <div className="mx-auto max-w-3xl rounded-lg border border-zinc-800 bg-zinc-950 p-8">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="mt-4 text-zinc-300">
          Mr Cinephile Telugu is a platform dedicated to Telugu cinema, offering honest reviews, movie discussions, and film analysis for passionate cinephiles.
        </p>
      </div>
    </section>
  );
}

export default AboutPage;
