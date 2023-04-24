import { useCallback, useEffect, useState } from 'react';
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
import type { IComment, IPost, IUser } from '../types/api-types';

export const PostPage = () => {
  const { id: postId } = useParams();

  //post states
  const [post, setPost] = useState<IPost | null>(null);
  const [isLoadingPost, setIsLoadingPost] = useState(false);
  const [isErrorLoadingPosts, setIsErrorLoadingPosts] = useState(false);

  //user states
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isErrorLoadingUser, setIsErrorLoadingUser] = useState(false);

  //comments states
  const [comments, setComments] = useState<IComment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isFetchingComments, setIsFetchingComments] = useState(false);
  const [isErrorLoadingComments, setIsErrorLoadingComments] = useState(false);
  const [isPostingComment, setIsPostingComment] = useState(false);

  //load post
  const fetchPost = useCallback(async () => {
    setIsLoadingPost(true);
    try {
      const fetchUrl = new URL(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
      );
      const response = await fetch(fetchUrl.href);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate slow network
      const fetchedPost = (await response.json()) as IPost;
      setPost(fetchedPost);
    } catch (error) {
      console.error(error);
      setIsErrorLoadingPosts(true);
    } finally {
      setIsLoadingPost(false);
    }
  }, [postId]);

  //load user
  const fetchUser = useCallback(async () => {
    if (!post?.userId) return;
    setIsLoadingUser(true);
    try {
      const fetchUrl = new URL(
        `https://jsonplaceholder.typicode.com/users/${post.userId}`,
      );
      const response = await fetch(fetchUrl.href);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate slow network
      const fetchedUser = (await response.json()) as IUser;
      setUser(fetchedUser);
    } catch (error) {
      console.error(error);
      setIsErrorLoadingUser(true);
    } finally {
      setIsLoadingUser(false);
    }
  }, [post?.userId]);

  //load comments
  const fetchComments = useCallback(async () => {
    setIsLoadingComments(true);
    setIsFetchingComments(true);
    try {
      const fetchUrl = new URL(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
      );
      const response = await fetch(fetchUrl.href);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate slow network
      const fetchedComments = (await response.json()) as IComment[];
      setComments(fetchedComments);
    } catch (error) {
      console.error(error);
      setIsErrorLoadingComments(true);
    } finally {
      setIsLoadingComments(false);
      setIsFetchingComments(false);
    }
  }, [postId]);

  //load post, user, and comments on mount
  useEffect(() => {
    fetchPost();
    fetchUser();
    fetchComments();
  }, [fetchPost, fetchUser, fetchComments]);

  // Post comment stuff
  const [commentText, setCommentText] = useState('');

  const postComment = useCallback(
    async (newComment: Omit<IComment, 'id'>) => {
      setIsPostingComment(true);
      try {
        const fetchUrl = new URL(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
        );
        const response = await fetch(fetchUrl.href, {
          method: 'POST',
          body: JSON.stringify(newComment),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        const postedComment = (await response.json()) as IComment;
        // Optimistically update the comments client-side
        setComments((prev) => [...prev, postedComment]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsPostingComment(false);
      }
    },
    [postId],
  );

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
        ) : !post || isLoadingPost || isLoadingUser ? (
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
          <ActionIcon onClick={() => fetchComments()}>
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
