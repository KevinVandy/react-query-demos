import { useFetchUsers } from "../hooks/useFetchUsers";

export const UsersPage = () => {
  const { data } = useFetchUsers();

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};
