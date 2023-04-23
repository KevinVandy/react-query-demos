import { useQuery } from "@tanstack/react-query";

export const useFetchUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/`
      );
      return response.json();
    },
  });
};
