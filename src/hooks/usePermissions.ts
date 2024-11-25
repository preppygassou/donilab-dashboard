import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api'

export function useSitePermissions() {
  return useQuery({
    queryKey: ['sitePermissions'],
    queryFn: async () => {
      const { data } = await api.get('/site-permissions');
      return data;
    },
  });
}

export function useHubPermissions() {
  return useQuery({
    queryKey: ['hubPermissions'],
    queryFn: async () => {
      const { data } = await api.get('/hub-permissions');
      return data;
    },
  });
}

export function useCreatePermission(type: 'site' | 'hub') {
  const queryClient = useQueryClient();
  const endpoint = type === 'site' ? 'site-permissions' : 'hub-permissions';
  const queryKey = type === 'site' ? 'sitePermissions' : 'hubPermissions';

  return useMutation({
    mutationFn: async (permissionData: any) => {
      const { data } = await api.post(`/${endpoint}`, permissionData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });
}

export function useUpdatePermission(type: 'site' | 'hub') {
  const queryClient = useQueryClient();
  const endpoint = type === 'site' ? 'site-permissions' : 'hub-permissions';
  const queryKey = type === 'site' ? 'sitePermissions' : 'hubPermissions';

  return useMutation({
    mutationFn: async ({ id, ...permissionData }: any) => {
      const { data } = await api.put(`/${endpoint}/${id}`, permissionData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });
}

export function useDeletePermission(type: 'site' | 'hub') {
  const queryClient = useQueryClient();
  const endpoint = type === 'site' ? 'site-permissions' : 'hub-permissions';
  const queryKey = type === 'site' ? 'sitePermissions' : 'hubPermissions';

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/${endpoint}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });
}