import apiClient from './client';

export const fetchProducts = async () => {
  const { data } = await apiClient.get('/products');
  if (Array.isArray(data)) {
    return data;
  }
  if (data && Array.isArray(data.content)) {
    return data.content;
  }
  return [];
};

export const fetchProductById = async (id) => {
  const { data } = await apiClient.get(`/products/${id}`);
  return data;
};

export const createProduct = (payload) => apiClient.post('/admin/products', payload);

export const updateProduct = (id, payload) => apiClient.put(`/admin/products/${id}`, payload);

export const deleteProduct = (id) => apiClient.delete(`/admin/products/${id}`);
