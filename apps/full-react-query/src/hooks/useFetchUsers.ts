import { useQuery } from '@tanstack/react-query';
import { type User } from '../types/api-types';

export const useFetchUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/`,
      );
      return response.json() as Promise<User[]>;
    },
  });
};
