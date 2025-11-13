import apiClient from './client';

export const exchangeOauthCode = async (provider, code) => {
  const { data } = await apiClient.post(`/auth/oauth/${provider}`, { code });
  return data;
};
