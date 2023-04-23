import {
  Card,
  Collapse,
  Flex,
  Loader,
  Skeleton,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useFetchPosts } from '../hooks/useFetchPosts';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const {
    data: posts,
    isLoading: isLoadingPosts,
    isFetching,
  } = useFetchPosts();

  return (
    <Stack>
      <Flex sx={{ width: '100%', justifyContent: 'center', minHeight: '2rem' }}>
        <Collapse in={isFetching}>
          <Loader />
        </Collapse>
      </Flex>
      <Stack sx={{ gap: '1rem', padding: '2rem', paddingTop: 0 }}>
        {isLoadingPosts
          ? [...Array(5)].map((_, index) => (
              <Card key={index}>
                <Skeleton animate height="20px" width="50%" mb="md" />
                <Skeleton animate height="40px" width="100%" mb="md" />
              </Card>
            ))
          : posts?.map((post) => (
              <Link
                key={post.id}
                to={`/posts/${post.id}`}
                style={{ textDecoration: 'none' }}
              >
                <Card
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: '0 0 10px 1px #555',
                    },
                  }}
                >
                  <Title order={2}>{post.title}</Title>
                  <Text>{post.body}</Text>
                </Card>
              </Link>
            ))}
      </Stack>
    </Stack>
  );
};
