import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// API de juegos
export const juegosAPI = {
  all: () => api.get('/juegos'),
  getById: (id) => api.get(`/juegos/${id}`), 
  create: (data) => api.post('/juegos', data),
  update: (id, data) => api.put(`/juegos/${id}`, data),
  remove: (id) => api.delete(`/juegos/${id}`)
};


// API de reseñas
export const resenasAPI = {
  all: () => api.get('/resenas'),
  byJuego: (id) => api.get(`/resenas/juego/${id}`),
  create: (data) => api.post('/resenas', data),
  update: (id, data) => api.put(`/resenas/${id}`, data),
  remove: (id) => api.delete(`/resenas/${id}`)
};

export default api;



