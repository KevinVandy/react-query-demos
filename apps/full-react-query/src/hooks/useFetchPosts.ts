import { useQuery } from '@tanstack/react-query';
import { type Post } from '../types/api-types';

export const useFetchPosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts`,
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return response.json() as Promise<Post[]>;
    },
  });
};
