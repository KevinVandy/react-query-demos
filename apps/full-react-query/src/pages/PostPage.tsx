import { useParams } from "react-router-dom";
import { useFetchPost } from "../hooks/useFetchPost";

export const PostPage = () => {
  const { id } = useParams();
  const { data } = useFetchPost(id as string);

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};
