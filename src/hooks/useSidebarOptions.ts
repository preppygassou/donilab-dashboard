import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api'

export function useSiteSidebarOptions() {
  return useQuery({
    queryKey: ['siteSidebarOptions'],
    queryFn: async () => {
      const { data } = await api.get('/site-sidebar-options');
      return data;
    },
  });
}

export function useHubSidebarOptions() {
  return useQuery({
    queryKey: ['hubSidebarOptions'],
    queryFn: async () => {
      const { data } = await api.get('/hub-sidebar-options');
      return data;
    },
  });
}

export function useCreateSidebarOption(type: 'site' | 'hub') {
  const queryClient = useQueryClient();
  const endpoint = type === 'site' ? 'site-sidebar-options' : 'hub-sidebar-options';
  const queryKey = type === 'site' ? 'siteSidebarOptions' : 'hubSidebarOptions';

  return useMutation({
    mutationFn: async (optionData: any) => {
      const { data } = await api.post(`/${endpoint}`, optionData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });
}

export function useUpdateSidebarOption(type: 'site' | 'hub') {
  const queryClient = useQueryClient();
  const endpoint = type === 'site' ? 'site-sidebar-options' : 'hub-sidebar-options';
  const queryKey = type === 'site' ? 'siteSidebarOptions' : 'hubSidebarOptions';

  return useMutation({
    mutationFn: async ({ id, ...optionData }: any) => {
      const { data } = await api.put(`/${endpoint}/${id}`, optionData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });
}

export function useDeleteSidebarOption(type: 'site' | 'hub') {
  const queryClient = useQueryClient();
  const endpoint = type === 'site' ? 'site-sidebar-options' : 'hub-sidebar-options';
  const queryKey = type === 'site' ? 'siteSidebarOptions' : 'hubSidebarOptions';

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/${endpoint}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });
}