import axios from 'axios';
const BLOG_API_URL = 'http://localhost:5000/api/blogs';
const AUTH_API_URL = 'http://localhost:5000/auth';
const BASE_URL = 'http://localhost:5000';


export const saveDraft = (data) => axios.post(`${BLOG_API_URL}/save-draft`, data);
export const publishBlog = (data) => axios.post(`${BLOG_API_URL}/publish`, data);
export const getAllBlogs = async (status) => {
  const url = status ? `${BLOG_API_URL}?status=${status}` : BLOG_API_URL;
  return axios.get(url);
};
export const getBlogById = (id) => axios.get(`${BLOG_API_URL}/${id}`);
export const deleteBlog = (id) => axios.delete(`${BLOG_API_URL}/${id}`);

export async function signupUser({ email, password }) {
  return axios.post(`${BASE_URL}/auth/signup`, { email, password });
};




export async function loginUser({ email, password }) {
  const response = await fetch('http://localhost:5000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // <-- crucial for session cookie
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data;
}
export async function logoutUser() {
  const response = await fetch('http://localhost:5000/auth/logout', {
    method: 'POST',
    credentials: 'include', // must include to clear session
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }
}
