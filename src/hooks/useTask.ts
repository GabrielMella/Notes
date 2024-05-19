import { useAuthStore } from '_store/auth';
import useSWR from 'swr';
import axios from 'axios';
import { useMemo } from 'react';

export function useTask(url: string) {
    const { token } = useAuthStore();
    const baseUrl = `http://localhost:8080${url}`; 
    const memoizedUrl = useMemo(() => {
        return baseUrl;
    }, [baseUrl])

    const fetcher = (baseUrl: string) => axios.get(baseUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }).then(res => res.data);

    const { data, error, mutate } = useSWR(memoizedUrl, fetcher);
    
    return { taskData: data, taskError: error, mutate };
}
