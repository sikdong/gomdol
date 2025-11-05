import apiClient from './client';

export const fetchProducts = async () => {
  const { data } = await apiClient.get('/products');
  return data;
};

export const fetchProductById = async (id) => {
  const { data } = await apiClient.get(`/products/${id}`);
  return data;
};

export const createProduct = (payload) => apiClient.post('/admin/products', payload);

export const updateProduct = (id, payload) => apiClient.put(`/admin/products/${id}`, payload);

export const deleteProduct = (id) => apiClient.delete(`/admin/products/${id}`);
