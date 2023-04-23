import { useQuery } from '@tanstack/react-query';
import { type Post } from '../types/api-types';

export const useFetchPosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts`,
      );
      return response.json() as Promise<Post[]>;
    },
  });
};
