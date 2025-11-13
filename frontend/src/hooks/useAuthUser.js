import { useEffect, useState } from 'react';
import apiClient from '../api/client';
import { AUTH_USER_UPDATED_EVENT } from '../constants/auth';

const useAuthUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchAuthUser = async () => {
      try {
        const { data } = await apiClient.get('/auth/me');
        if (cancelled) {
          return;
        }
        setUser({
          id: data.memberId,
          nickname: data.nickname,
          provider: data.provider,
          profileImageUrl: data.profileImageUrl
        });
      } catch (err) {
        if (!cancelled) {
          setUser(null);
        }
      }
    };

    const handleAuthUpdate = () => fetchAuthUser();

    fetchAuthUser();

    if (typeof window !== 'undefined') {
      window.addEventListener(AUTH_USER_UPDATED_EVENT, handleAuthUpdate);
    }

    return () => {
      cancelled = true;
      if (typeof window !== 'undefined') {
        window.removeEventListener(AUTH_USER_UPDATED_EVENT, handleAuthUpdate);
      }
    };
  }, []);

  return user;
};

export default useAuthUser;
