import { useParams } from 'react-router-dom';
import { useFetchUser } from '../hooks/useFetchUser';
// import { useFetchPosts } from '../hooks/useFetchPosts';
import { Flex, Loader, Paper, Stack, Title } from '@mantine/core';

export const UserPage = () => {
  const { id: userId } = useParams();
  const { data: user, isLoading: isLoadingUser } = useFetchUser(
    userId as string,
  );
  // const { data: posts, isLoading: isLoadingPosts } = useFetchPosts(
  //   userId as string,
  // );

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
      </Paper>
    </Stack>
  );
};
