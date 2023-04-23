import { useQuery } from '@tanstack/react-query';
import { type IUser } from '../types/api-types';

export const useFetchUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users`,
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return response.json() as Promise<IUser[]>;
    },
  });
};
