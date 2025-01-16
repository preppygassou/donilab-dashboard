import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api'

export function useInvitations() {
  return useQuery({
    queryKey: ['invitations'],
    queryFn: async () => {
      const { data } = await api.get('/invitations');
      return data;
    },
  });
}

export function useInvitation(id: string) {
  return useQuery({
    queryKey: ['invitations', id],
    queryFn: async () => {
      const { data } = await api.get(`/invitations/${id}`);
      return data;
    },
  });
}

export function useCreateInvitation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (invitationData: any) => {
      const { data } = await api.post('/invitations', invitationData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
    },
  });
}

export function useUpdateInvitation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...invitationData }: any) => {
      const { data } = await api.put(`/invitations/${id}`, invitationData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
    },
  });
}

export function useDeleteInvitation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/invitations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
    },
  });
}