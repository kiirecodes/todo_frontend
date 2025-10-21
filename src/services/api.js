import axios from 'axios';
/*
 Use REACT_APP_API_URL environment variable in production (set by Vercel).
 Falls back to localhost for development.
*/
const BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/';
const API = axios.create({
  baseURL: BASE,
  withCredentials: true,
});
export const fetchTasks = () => API.get('tasks/');
export const createTask = (payload) => API.post('tasks/', payload);
export const updateTask = (id, payload) => API.put(`tasks/${id}/`, payload);
export const deleteTask = (id) => API.delete(`tasks/${id}/`);
