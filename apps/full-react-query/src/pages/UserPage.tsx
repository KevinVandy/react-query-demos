import { useParams } from "react-router-dom";
import { useFetchUser } from "../hooks/useFetchUser";

export const UserPage = () => {
  const { id } = useParams();
  const { data } = useFetchUser(id as string);

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};
