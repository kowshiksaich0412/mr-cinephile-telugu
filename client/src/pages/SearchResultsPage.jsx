import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SectionBlock from "../components/SectionBlock";
import ArticleCard from "../components/ArticleCard";
import { getApiErrorMessage, postApi } from "../services/api";

function SearchResultsPage() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!q.trim()) {
      setItems([]);
      setError("");
      return;
    }

    const loadResults = async () => {
      try {
        setError("");
        const data = await postApi.list({ search: q, limit: 50 });
        setItems(data.items);
      } catch (err) {
        setError(getApiErrorMessage(err, "Unable to load search results."));
      }
    };

    loadResults();
  }, [q]);

  return (
    <>
      <Helmet>
        <title>Search: {q} | Mr Cinephile Telugu</title>
      </Helmet>
      <SectionBlock title={`Search Results for "${q}"`}>
        {error ? (
          <p className="text-red-400">{error}</p>
        ) : items.length === 0 ? (
          <p className="text-zinc-300">No articles found.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {items.map((post) => (
              <ArticleCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </SectionBlock>
    </>
  );
}

export default SearchResultsPage;
