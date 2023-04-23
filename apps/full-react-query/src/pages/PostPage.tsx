import { useParams } from 'react-router-dom';
import { useFetchPost } from '../hooks/useFetchPost';
import { useFetchComments } from '../hooks/useFetchComments';
import {
  ActionIcon,
  Alert,
  Box,
  Card,
  Collapse,
  Flex,
  Loader,
  Skeleton,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { IconAlertCircle, IconRefresh } from '@tabler/icons-react';

export const PostPage = () => {
  const { id } = useParams();
  const {
    data: post,
    isLoading: isLoadingPost,
    isError: isErrorLoadingPosts,
  } = useFetchPost(id as string);
  const {
    data: comments,
    isLoading: isLoadingComments,
    isFetching: isFetchingComments,
    isError: isErrorLoadingComments,
    refetch: refetchComments,
  } = useFetchComments(id as string);

  return (
    <Stack>
      <Box>
        {isErrorLoadingPosts ? (
          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="Bummer!"
            color="red"
          >
            There was an error loading this post
          </Alert>
        ) : isLoadingPost ? (
          <>
            <Skeleton animate height="20px" width="50%" mb="md" />
            <Skeleton animate height="40px" width="100%" mb="md" />
          </>
        ) : (
          <>
            <Title order={2}>{post?.title}</Title>
            <Text>{post.body}</Text>
          </>
        )}
      </Box>
      <Flex justify="space-between" align="center">
        <Title mt="lg" order={3}>
          Comments
        </Title>
        <Tooltip withArrow label="Refresh Comments">
          <ActionIcon onClick={() => refetchComments()}>
            <IconRefresh />
          </ActionIcon>
        </Tooltip>
      </Flex>
      <Flex sx={{ width: '100%', justifyContent: 'center', minHeight: '2rem' }}>
        <Collapse in={isFetchingComments}>
          <Loader />
        </Collapse>
      </Flex>
      <Stack sx={{ gap: '1rem' }}>
        {isErrorLoadingComments ? (
          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="Bummer!"
            color="red"
          >
            There was an error loading comments for this post
          </Alert>
        ) : isLoadingComments ? (
          [...Array(5)].map((_, index) => (
            <Card key={index}>
              <Skeleton animate height="20px" width="25%" mb="md" />
              <Skeleton animate height="15px" width="33%" mb="md" />
              <Skeleton animate height="40px" width="100%" mb="md" />
            </Card>
          ))
        ) : (
          comments?.map((comment) => (
            <Card key={comment.id}>
              <Title order={4}>{comment.name}</Title>
              <Title order={5}>{comment.email}</Title>
              <Text>{comment.body}</Text>
            </Card>
          ))
        )}
      </Stack>
    </Stack>
  );
};
