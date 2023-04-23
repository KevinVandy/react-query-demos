import { useQuery } from '@tanstack/react-query';
import { type IPost } from '../types/api-types';

export const useFetchPost = (postId: string) => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return response.json() as Promise<IPost>;
    },
  });
};
