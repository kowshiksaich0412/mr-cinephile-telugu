import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import SectionBlock from "../components/SectionBlock";
import ArticleCard from "../components/ArticleCard";
import TrendingWidget from "../components/TrendingWidget";
import InstagramEmbed from "../components/InstagramEmbed";
import { getApiErrorMessage, postApi } from "../services/api";
import { getPostPath } from "../utils/posts";

function HomePage() {
  const [reviews, setReviews] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [lists, setLists] = useState([]);
  const [news, setNews] = useState([]);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setError("");
        const [reviewData, trailerData, listData, newsData, trendingData, popularData] =
          await Promise.all([
            postApi.list({ category: "review", limit: 6 }),
            postApi.list({ category: "trailer", limit: 4 }),
            postApi.list({ category: "list", limit: 4 }),
            postApi.list({ category: "news", limit: 6 }),
            postApi.getTrending(),
            postApi.getPopular()
          ]);

        setReviews(reviewData.items);
        setTrailers(trailerData.items);
        setLists(listData.items);
        setNews(newsData.items);
        setTrending(trendingData);
        setPopular(popularData);
      } catch (err) {
        setError(getApiErrorMessage(err, "Unable to load the homepage content."));
      }
    };
    load();
  }, []);

  return (
    <>
      <Helmet>
        <title>Mr Cinephile Telugu | Reviews, News, Trailer Breakdowns</title>
        <meta
          name="description"
          content="Telugu cinema reviews, top lists, trailer breakdowns, and Tollywood news on Mr Cinephile Telugu."
        />
      </Helmet>

      <HeroBanner post={trending[0] || reviews[0]} />
      {error && <p className="container-pad text-sm text-red-400">{error}</p>}

      <SectionBlock title="Latest Movie Reviews">
        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map((post) => (
            <ArticleCard key={post._id} post={post} />
          ))}
        </div>
      </SectionBlock>

      <SectionBlock title="Trailer Breakdown">
        <div className="grid gap-4 md:grid-cols-2">
          {trailers.map((post) => (
            <ArticleCard key={post._id} post={post} />
          ))}
        </div>
      </SectionBlock>

      <SectionBlock title="Top Movie Lists">
        <div className="grid gap-4 md:grid-cols-2">
          {lists.map((post) => (
            <ArticleCard key={post._id} post={post} />
          ))}
        </div>
      </SectionBlock>

      <SectionBlock title="Latest Tollywood News">
        <div className="grid gap-4 md:grid-cols-3">
          {news.map((post) => (
            <ArticleCard key={post._id} post={post} />
          ))}
        </div>
      </SectionBlock>

      <section className="container-pad grid gap-6 py-8 md:grid-cols-3">
        <TrendingWidget posts={trending.slice(0, 5)} />
        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 md:col-span-1">
          <h3 className="mb-3 text-lg font-semibold text-brand-red">Popular Articles</h3>
          <ul className="space-y-3 text-sm text-zinc-300">
            {popular.slice(0, 5).map((post) => (
              <li key={post._id} className="border-b border-zinc-800 pb-2 last:border-none">
                <Link to={getPostPath(post)} className="hover:text-brand-red">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <InstagramEmbed />
      </section>
    </>
  );
}

export default HomePage;
