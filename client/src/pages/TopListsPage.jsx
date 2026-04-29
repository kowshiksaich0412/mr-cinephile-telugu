import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ArticleCard from "../components/ArticleCard";
import SectionBlock from "../components/SectionBlock";
import { getApiErrorMessage, postApi } from "../services/api";

function TopListsPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadLists = async () => {
      try {
        setError("");
        const data = await postApi.list({ category: "list", limit: 50 });
        setItems(data.items);
      } catch (err) {
        setError(getApiErrorMessage(err, "Unable to load top lists."));
      }
    };

    loadLists();
  }, []);

  return (
    <>
      <Helmet>
        <title>Top Lists | Mr Cinephile Telugu</title>
      </Helmet>
      <SectionBlock title="Top Movie Lists">
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

export default TopListsPage;
