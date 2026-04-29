import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"
});

export function getApiErrorMessage(error, fallback = "Something went wrong.") {
  return error?.response?.data?.message || error?.message || fallback;
}

export const authApi = {
  login: async (payload) => {
    const { data } = await api.post("/auth/login", payload);
    return data;
  }
};

export const postApi = {
  list: async (params = {}) => {
    const { data } = await api.get("/posts", { params });
    return data;
  },
  getBySlug: async (slug) => {
    const { data } = await api.get(`/posts/${slug}`);
    return data;
  },
  getTrending: async () => {
    const { data } = await api.get("/posts/trending");
    return data;
  },
  getPopular: async () => {
    const { data } = await api.get("/posts/popular");
    return data;
  },
  create: async (payload, token) => {
    const { data } = await api.post("/posts", payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  },
  update: async (id, payload, token) => {
    const { data } = await api.put(`/posts/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  },
  remove: async (id, token) => {
    const { data } = await api.delete(`/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  }
};

export const commentApi = {
  listByPost: async (postId) => {
    const { data } = await api.get(`/comments/${postId}`);
    return data;
  },
  create: async (postId, payload) => {
    const { data } = await api.post(`/comments/${postId}`, payload);
    return data;
  }
};

export const contactApi = {
  create: async (payload) => {
    const { data } = await api.post("/contact", payload);
    return data;
  }
};

export default api;
