import { Link, useParams } from 'react-router-dom';
import { useFetchUser } from '../hooks/useFetchUser';
import { useFetchPosts } from '../hooks/useFetchPosts';
import {
  Alert,
  Card,
  Collapse,
  Flex,
  Loader,
  Paper,
  Skeleton,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

export const UserPage = () => {
  const { id: userId } = useParams();
  const { data: user, isLoading: isLoadingUser } = useFetchUser(
    userId as string,
  );
  const {
    data: posts,
    isLoading: isLoadingPosts,
    isFetching: isFetchingPosts,
    isError: isErrorLoadingPosts,
  } = useFetchPosts(userId as string);

  if (isLoadingUser) {
    return (
      <Flex w="100%" justify="center">
        <Loader />
      </Flex>
    );
  }

  return (
    <Stack>
      <Paper p="lg">
        <Title order={2}>{user?.name}</Title>
        <Text>Email: {user?.email}</Text>
        <Text>Phone: {user?.phone}</Text>
        <Text>Website: {user?.website}</Text>
        <Text>
          Address:
          <address>
            {user?.address.street}, {user?.address.suite},<br />
            {user?.address.city}, {user?.address.zipcode}
          </address>
        </Text>
      </Paper>
      <Stack>
        <Flex
          sx={{ width: '100%', justifyContent: 'center', minHeight: '2rem' }}
        >
          <Collapse in={isFetchingPosts}>
            <Loader />
          </Collapse>
        </Flex>
        <Stack sx={{ gap: '1rem' }}>
          <Title order={2}>{user?.name}'s Posts</Title>
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
    </Stack>
  );
};
