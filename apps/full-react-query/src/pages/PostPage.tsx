import { useParams } from 'react-router-dom';
import { useFetchPost } from '../hooks/useFetchPost';
import { useFetchComments } from '../hooks/useFetchComments';

export const PostPage = () => {
  const { id } = useParams();
  const { data: post } = useFetchPost(id as string);
  const { data: comments } = useFetchComments(id as string);

  return (
    <pre>
      {JSON.stringify(post, null, 2)}
      {JSON.stringify(comments, null, 2)}
    </pre>
  );
};
