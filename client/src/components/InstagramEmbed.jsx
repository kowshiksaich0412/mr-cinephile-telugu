function InstagramEmbed() {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
      <h3 className="text-lg font-semibold text-brand-red">Instagram</h3>
      <p className="mt-2 text-sm text-zinc-300">
        Follow <span className="font-semibold">@mr_cinephile_telugu</span> for quick reels, reviews, and discussion clips.
      </p>
      <a
        href="https://www.instagram.com/mr_cinephile_telugu/"
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-block rounded-md border border-brand-red px-4 py-2 text-sm hover:bg-brand-red"
      >
        Open Instagram Profile
      </a>
    </div>
  );
}

export default InstagramEmbed;
