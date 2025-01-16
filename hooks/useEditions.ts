import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api'

export function useEditions() {
  return useQuery({
    queryKey: ['editions'],
    queryFn: async () => {
      const { data } = await api.get('/editions');
      return data;
    },
  });
}

export function useEdition(id: number) {
  return useQuery({
    queryKey: ['editions', id],
    queryFn: async () => {
      const { data } = await api.get(`/editions/${id}`);
      return data;
    },
  });
}

export function useCreateEdition() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (EditionData: any) => {
      const { data } = await api.post('/editions', EditionData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['editions'] });
    },
  });
}

export function useUpdateEdition() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...EditionData }: any) => {
      const { data } = await api.put(`/editions/${id}`, EditionData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['editions'] });
    },
  });
}

export function useDeleteEdition() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/editions/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['editions'] });
    },
  });
}