export function getPostPath(post) {
  if (!post?.slug) return "/";

  if (post.category === "review") {
    return `/reviews/${post.slug}`;
  }

  if (post.category === "trailer") {
    return `/trailers/${post.slug}`;
  }

  if (post.category === "list") {
    return `/top-lists/${post.slug}`;
  }

  return `/news/${post.slug}`;
}
