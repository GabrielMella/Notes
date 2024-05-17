import { useEffect } from 'react';
import useSWR from 'swr';
import { useUserStore } from '_store/user';
import { useAuthStore } from '_store/auth';

export default function useUser() {
  const { token } = useAuthStore();
  const { setUser } = useUserStore();

  const { data, error, mutate } = useSWR(
    token ? `http://localhost:8080/me` : null,
    url =>
      fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }).then(res => res.json()),
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, error, setUser]);

  return { user: data, mutate };
}
