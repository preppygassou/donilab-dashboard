"use client"
import { usePosts } from '../../../hooks/usePosts';
import DataTable from '../../DataTable';
import LoadingSpinner from '../../LoadingSpinner';
import ErrorAlert from '../../ErrorAlert';
import { formatDate } from '../../../utils/formatters';

interface Props {
  siteId: string;
}

export default function Posts({ siteId }: Props) {
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load posts" />;

  const filteredPosts = posts?.filter(post => post.siteId === siteId);

  const columns = [
    { key: 'title', header: 'Title', render: (value: any) => value.en },
    {
      key: 'author',
      header: 'Author',
      render: (value: any) => value?.name,
    },
    { key: 'status', header: 'Status' },
    {
      key: 'createdAt',
      header: 'Created',
      render: (value: string) => formatDate(value),
    },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={filteredPosts}
      />
    </div>
  );
}