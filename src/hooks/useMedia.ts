import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api'

export function useMedias() {
  return useQuery({
    queryKey: ['media'],
    queryFn: async () => {
      const { data } = await api.get('/media');
      return data;
    },
  });
}

export function useMedia(id: number) {
  return useQuery({
    queryKey: ['media', id],
    queryFn: async () => {
      const { data } = await api.get(`/media/${id}`);
      return data;
    },
  });
}

export function useMediaSite(siteId: string) {
  return useQuery({
    queryKey: ['media', siteId],
    queryFn: async () => {
      const { data } = await api.get(`/media/site/${siteId}`);
      return data;
    },
  });
}

export function useCreateMedia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (MediaData: FormData) => {
      const { data } = await api.post('/media', MediaData, {
        /*  */
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
    },
  });
}

export function useUpdateMedia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...MediaData }: any) => {
      const { data } = await api.put(`/media/${id}`, MediaData, {
        
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
    },
  });
}

export function useDeleteMedia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/media/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
    },
  });
}