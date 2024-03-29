import { useCallback, useEffect, useState } from 'react';
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
import { Link } from 'react-router-dom';
import { IconAlertCircle } from '@tabler/icons-react';
import { IPost } from '../types/api-types';

export const HomePage = () => {
  //posts states
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isErrorLoadingPosts, setIsErrorLoadingPosts] = useState(false);
  const [isFetchingPosts, setIsFetchingPosts] = useState(false);

  //load posts
  const fetchPosts = useCallback(async () => {
    if (!posts.length) {
      setIsLoadingPosts(true);
    }
    setIsFetchingPosts(true);
    try {
      const fetchUrl = new URL(`https://jsonplaceholder.typicode.com/posts`);
      const response = await fetch(fetchUrl.href);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate slow network
      const fetchedPosts = (await response.json()) as IPost[];
      setPosts(fetchedPosts);
    } catch (error) {
      console.error(error);
      setIsErrorLoadingPosts(true);
    } finally {
      setIsLoadingPosts(false);
      setIsFetchingPosts(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //load posts on mount
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

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
                <Title order={3}>{post.title}</Title>
                <Text>{post.body}</Text>
              </Card>
            </Link>
          ))
        )}
      </Stack>
    </Stack>
  );
};
