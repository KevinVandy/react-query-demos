import { useQuery } from '@tanstack/react-query';
import { type Post } from '../types/api-types';

export const useFetchPosts = (userId?: string) => {
  return useQuery({
    queryKey: ['posts', userId],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts`,
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return response.json() as Promise<Post[]>;
    },
  });
};
