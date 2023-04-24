import { useCallback, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ActionIcon,
  Alert,
  Box,
  Button,
  Card,
  Collapse,
  Flex,
  Loader,
  Skeleton,
  Stack,
  Text,
  Textarea,
  Title,
  Tooltip,
} from '@mantine/core';
import { IconAlertCircle, IconRefresh } from '@tabler/icons-react';
import { useFetchComments } from '../hooks/useFetchComments';
import { useFetchPost } from '../hooks/useFetchPost';
import { useFetchUser } from '../hooks/useFetchUser';
import { usePostComment } from '../hooks/usePostComment';
import { type IComment } from '../types/api-types';

export const PostPage = () => {
  const { id: postId } = useParams();

  //load post
  const {
    data: post,
    isLoading: isLoadingPost,
    isError: isErrorLoadingPosts,
  } = useFetchPost(postId as string);

  //load user
  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorLoadingUser,
  } = useFetchUser(post?.userId as string | undefined);

  //load comments
  const {
    data: comments,
    isLoading: isLoadingComments,
    isFetching: isFetchingComments,
    isError: isErrorLoadingComments,
    refetch: refetchComments,
  } = useFetchComments(postId as string);

  // Post comment stuff
  const [commentText, setCommentText] = useState('');

  const { mutateAsync: postComment, isLoading: isPostingComment } =
    usePostComment();

  const handleSubmitComment = useCallback(async () => {
    const newComment: Omit<IComment, 'id'> = {
      body: commentText,
      email: 'user@mailinator.com',
      name: 'User',
      postId: Number(postId),
    };
    await postComment(newComment);
    setCommentText('');
  }, [commentText, postId, postComment]);

  return (
    <Stack>
      <Box>
        {isErrorLoadingPosts || isErrorLoadingUser ? (
          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="Bummer!"
            color="red"
          >
            There was an error loading this post
          </Alert>
        ) : isLoadingPost || isLoadingUser ? (
          <>
            <Skeleton animate height="20px" width="50%" mb="md" />
            <Skeleton animate height="40px" width="100%" mb="md" />
          </>
        ) : (
          <>
            <Title order={1}>Post: {post?.id}</Title>
            <Title order={2}>{post?.title}</Title>
            <Title order={3}>
              By:{' '}
              <Link
                to={`/users/${user?.id}`}
                style={{ textDecoration: 'none' }}
              >
                {user?.name}
              </Link>
            </Title>
            <Text my="lg">
              {post.body}. {post.body}. {post.body}. {post.body}. {post.body}.
            </Text>
          </>
        )}
      </Box>
      <Flex justify="space-between" align="center">
        <Title mt="lg" order={3}>
          Comments on this Post
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
        <Textarea
          disabled={isPostingComment}
          label="Post a Comment"
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmitComment();
            }
          }}
          value={commentText}
        />
        <Button
          disabled={isPostingComment || commentText.length === 0}
          leftIcon={
            isPostingComment ? (
              <Loader variant="oval" color="white" size="xs" />
            ) : null
          }
          onClick={handleSubmitComment}
        >
          Post Comment
        </Button>
      </Stack>
    </Stack>
  );
};
