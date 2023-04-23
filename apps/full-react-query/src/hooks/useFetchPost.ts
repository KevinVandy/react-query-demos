import { useQuery } from '@tanstack/react-query';
import { type Post } from '../types/api-types';

export const useFetchPost = (id: string) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
      );
      return response.json() as Promise<Post>;
    },
  });
};
