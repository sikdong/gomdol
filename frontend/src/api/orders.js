import apiClient from './client';

export const placeOrder = (userId, payload) =>
  apiClient.post('/orders', payload, { params: { userId } });

export const fetchOrders = async () => {
  const { data } = await apiClient.get('/user/orders');
  return data;
};
