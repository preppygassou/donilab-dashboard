import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api'

export function useProgramTypes() {
  return useQuery({
    queryKey: ['program-types'],
    queryFn: async () => {
      const { data } = await api.get('/program-types');
      return data;
    },
  });
}

export function useProgramType(id: number) {
  return useQuery({
    queryKey: ['program-types', id],
    queryFn: async () => {
      const { data } = await api.get(`/program-types/${id}`);
      return data;
    },
  });
}

export function useCreateProgramType() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (programTypeData: any) => {
      const { data } = await api.post('/program-types', programTypeData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['program-types'] });
    },
  });
}

export function useUpdateProgramType() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...programTypeData }: any) => {
      const { data } = await api.put(`/program-types/${id}`, programTypeData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['program-types'] });
    },
  });
}

export function useDeleteProgramType() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/program-types/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['program-types'] });
    },
  });
}