import { useQuery } from '@tanstack/react-query';
import { type User } from '../types/api-types';

export const useFetchUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
      );
      return response.json() as Promise<User>;
    },
  });
};
