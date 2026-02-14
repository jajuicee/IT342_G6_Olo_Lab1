import axios from 'axios';

// Spring Boot default port is 8080.
const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Necessary for the 'session' table/cookies
});

// Auth Endpoints (matching your AuthController.java)
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);
export const getMe = () => api.get('/auth/me');

// Content Endpoints (matching your SQL 'content' table)
export const getContent = () => api.get('/content/all');
export const uploadContent = (contentData) => api.post('/content/add', contentData);

export default api;