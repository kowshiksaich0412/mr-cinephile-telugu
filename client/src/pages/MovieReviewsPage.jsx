import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ArticleCard from "../components/ArticleCard";
import SectionBlock from "../components/SectionBlock";
import { getApiErrorMessage, postApi } from "../services/api";

function MovieReviewsPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setError("");
        const data = await postApi.list({ category: "review", limit: 50 });
        setItems(data.items);
      } catch (err) {
        setError(getApiErrorMessage(err, "Unable to load reviews."));
      }
    };

    loadReviews();
  }, []);

  return (
    <>
      <Helmet>
        <title>Movie Reviews | Mr Cinephile Telugu</title>
      </Helmet>
      <SectionBlock title="Movie Reviews">
        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((post) => (
            <ArticleCard key={post._id} post={post} />
          ))}
        </div>
      </SectionBlock>
    </>
  );
}

export default MovieReviewsPage;
