import { useFetchPosts } from "../hooks/useFetchPosts";

export const HomePage = () => {
  const { data } = useFetchPosts();

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};
