import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api'

export function useHubs() {
  return useQuery({
    queryKey: ['hubs'],
    queryFn: async () => {
      const { data } = await api.get('/hubs');
      return data;
    },
  });
}

export function useHub(id: string) {
  return useQuery({
    queryKey: ['hubs', id],
    queryFn: async () => {
      const { data } = await api.get(`/hubs/${id}`);
      return data;
    },
  });
}

export function useCreateHub() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (hubData: FormData) => {
      const { data } = await api.post('/hubs', hubData, {
        /*  */
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hubs'] });
    },
  });
}

export function useUpdateHub() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...hubData }: any) => {
      const { data } = await api.put(`/hubs/${id}`, hubData, {
        
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hubs'] });
    },
  });
}

export function useDeleteHub() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/hubs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hubs'] });
    },
  });
}