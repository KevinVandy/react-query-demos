import { useQuery } from '@tanstack/react-query';
import { type Comment } from '../types/api-types';

export const useFetchComments = (id: string) => {
  return useQuery({
    queryKey: ['comments', id],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return response.json() as Promise<Comment[]>;
    },
  });
};
