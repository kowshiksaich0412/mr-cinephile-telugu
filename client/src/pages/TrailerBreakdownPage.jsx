import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ArticleCard from "../components/ArticleCard";
import SectionBlock from "../components/SectionBlock";
import { getApiErrorMessage, postApi } from "../services/api";

function TrailerBreakdownPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTrailers = async () => {
      try {
        setError("");
        const data = await postApi.list({ category: "trailer", limit: 50 });
        setItems(data.items);
      } catch (err) {
        setError(getApiErrorMessage(err, "Unable to load trailer breakdowns."));
      }
    };

    loadTrailers();
  }, []);

  return (
    <>
      <Helmet>
        <title>Trailer Breakdown | Mr Cinephile Telugu</title>
      </Helmet>
      <SectionBlock title="Trailer Breakdown">
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

export default TrailerBreakdownPage;
