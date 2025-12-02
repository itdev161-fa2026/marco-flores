import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add auth token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auto-logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ----------------------
// AUTH
// ----------------------
export const registerUser = async (name, email, password) => {
  const res = await api.post('/users', { name, email, password });
  return res.data;
};

export const loginUser = async (email, password) => {
  const res = await api.post('/auth', { email, password });
  return res.data;
};

// ----------------------
// POSTS API
// ----------------------

// GET posts with optional category filter
export const getPosts = async (category = null) => {
  const params = {};
  if (category && category !== "All") params.category = category;

  const res = await api.get('/posts', { params });
  return res.data;
};

// GET single post
export const getPostById = async (id) => {
  const res = await api.get(`/posts/${id}`);
  return res.data;
};

// CREATE post (now includes category)
export const createPost = async (title, body, category) => {
  const res = await api.post('/posts', {
    title,
    body,
    category,
  });
  return res.data;
};

// UPDATE post (now includes category)
export const updatePost = async (id, title, body, category) => {
  const res = await api.put(`/posts/${id}`, {
    title,
    body,
    category,
  });
  return res.data;
};

// DELETE post
export const deletePost = async (id) => {
  const res = await api.delete(`/posts/${id}`);
  return res.data;
};
