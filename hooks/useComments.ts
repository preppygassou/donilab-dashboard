import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api'

export function useComments() {
  return useQuery({
    queryKey: ['comments'],
    queryFn: async () => {
      const { data } = await api.get('/comments');
      return data;
    },
  });
}

export function useComment(id: number) {
  return useQuery({
    queryKey: ['comments', id],
    queryFn: async () => {
      const { data } = await api.get(`/comments/${id}`);
      return data;
    },
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (commentData: any) => {
      const { data } = await api.post('/comments', commentData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
}

export function useUpdateComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...commentData }: any) => {
      const { data } = await api.put(`/comments/${id}`, commentData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/comments/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
}