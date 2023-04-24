import {
  Alert,
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
import { IconAlertCircle } from '@tabler/icons-react';

export const HomePage = () => {
  const {
    data: posts,
    isError: isErrorLoadingPosts,
    isFetching: isFetchingPosts,
    isLoading: isLoadingPosts,
  } = useFetchPosts();

  return (
    <Stack>
      <Title order={2}>Your Home Feed</Title>
      <Flex sx={{ width: '100%', justifyContent: 'center', minHeight: '2rem' }}>
        <Collapse in={isFetchingPosts}>
          <Loader />
        </Collapse>
      </Flex>
      <Stack sx={{ gap: '1rem' }}>
        {isErrorLoadingPosts ? (
          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="Bummer!"
            color="red"
          >
            There was an error fetching posts
          </Alert>
        ) : isLoadingPosts ? (
          [...Array(5)].map((_, index) => (
            <Card key={index}>
              <Skeleton animate height="20px" width="50%" mb="md" />
              <Skeleton animate height="40px" width="100%" mb="md" />
            </Card>
          ))
        ) : (
          posts?.map((post) => (
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
          ))
        )}
      </Stack>
    </Stack>
  );
};
