const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export function resolveMediaUrl(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path) || path.startsWith("data:")) return path;
  if (path.startsWith("/")) {
    const apiOrigin = API_BASE_URL.replace(/\/api\/?$/, "");
    return `${apiOrigin}${path}`;
  }
  return path;
}
