import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

const apiService = {
  getBoards: (params) => api.get('/boards', { params }),
  createBoard: (data) => api.post('/boards', data),
  deleteBoard: (id) => api.delete(`/boards/${id}`),
  getBoard: (id) => api.get(`/boards/${id}`),
  createCard: (boardId, data) => api.post(`/boards/${boardId}/cards`, data),
  deleteCard: (id) => api.delete(`/cards/${id}`),
  upvoteCard: (id) => api.patch(`/cards/${id}/upvote`),
};

export default apiService;