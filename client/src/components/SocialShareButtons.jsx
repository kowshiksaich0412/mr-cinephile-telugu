function SocialShareButtons({ title }) {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const url = encodeURIComponent(currentUrl);
  const text = encodeURIComponent(`Check out this article on Mr Cinephile Telugu: ${title}`);

  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={`https://twitter.com/intent/tweet?url=${url}&text=${text}`}
        target="_blank"
        rel="noreferrer"
        className="rounded border border-zinc-700 px-3 py-2 text-xs hover:border-brand-red"
      >
        Share on X
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank"
        rel="noreferrer"
        className="rounded border border-zinc-700 px-3 py-2 text-xs hover:border-brand-red"
      >
        Share on Facebook
      </a>
      <a
        href={`https://wa.me/?text=${text}%20${url}`}
        target="_blank"
        rel="noreferrer"
        className="rounded border border-zinc-700 px-3 py-2 text-xs hover:border-brand-red"
      >
        Share on WhatsApp
      </a>
    </div>
  );
}

export default SocialShareButtons;
