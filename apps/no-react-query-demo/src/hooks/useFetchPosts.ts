import { useQuery } from '@tanstack/react-query';
import { type IPost } from '../types/api-types';

export const useFetchPosts = (userId?: string) => {
  return useQuery({
    queryKey: ['posts', userId],
    queryFn: async () => {
      const fetchUrl = new URL(`https://jsonplaceholder.typicode.com/posts`);
      if (userId) {
        fetchUrl.searchParams.set('userId', userId);
      }
      const response = await fetch(fetchUrl.href);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return response.json() as Promise<IPost[]>;
    },
  });
};
