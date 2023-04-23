/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type IComment } from '../types/api-types';

export const usePostComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (comment: Omit<IComment, 'id'>) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments`,
        {
          method: 'POST',
          body: JSON.stringify(comment),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      );
      return response.json() as Promise<IComment>;
    },
    //optimistic client-side update
    onMutate: async (newComment) => {
      await queryClient.cancelQueries({
        queryKey: ['comments', newComment.postId.toString()],
      });

      // Snapshot the previous value
      const previousComments = queryClient.getQueryData([
        'comments',
        newComment.postId.toString(),
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData(
        ['comments', newComment.postId.toString()],
        (oldComments: any) => [...oldComments, newComment],
      );

      // Return a context object with the snapshot value
      return { previousComments };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newComment, context) => {
      queryClient.setQueryData(
        ['comments', newComment.postId.toString()],
        context?.previousComments,
      );
      console.error('Error posting comment', err);
    },
    // Always refetch after error or success:
    onSettled: () => {
      //commenting this out for demo because we are not using a real back-end that accepts new comments
      // queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};
