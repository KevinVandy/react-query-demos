import { useQuery } from '@tanstack/react-query';
import { type IUser } from '../types/api-types';

export const useFetchUser = (userId?: string) => {
  return useQuery({
    enabled: !!userId,
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return response.json() as Promise<IUser>;
    },
  });
};
