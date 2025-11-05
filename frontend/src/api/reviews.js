import apiClient from './client';

export const fetchReviews = async (productId) => {
  const { data } = await apiClient.get('/reviews', { params: { productId } });
  return data;
};

export const createReview = (productId, userId, payload) =>
  apiClient.post('/reviews', payload, { params: { productId, userId } });

export const updateReview = (id, userId, payload) =>
  apiClient.put(`/reviews/${id}`, payload, { params: { userId } });

export const deleteReview = (id, userId, admin = false) =>
  apiClient.delete(`/reviews/${id}`, { params: { userId, admin } });
