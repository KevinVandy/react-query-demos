import { useQuery } from '@tanstack/react-query';
import { type IComment } from '../types/api-types';

export const useFetchComments = (postId: string) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return response.json() as Promise<IComment[]>;
    },
    refetchInterval: 10000, // 10 seconds
  });
};
