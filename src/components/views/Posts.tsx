"use client"
import { useState } from 'react';
import { usePosts, useCreatePost, useUpdatePost, useDeletePost } from '../../hooks/usePosts';
import Modal from '../Modal';
import PostForm from '../PostForm';
import DeleteConfirmation from '../DeleteConfirmation';
import LoadingSpinner from '../LoadingSpinner';
import ErrorAlert from '../ErrorAlert';
import EmptyState from '../EmptyState';
import DataTable from '../DataTable';
import Badge from '../Badge';
import { useCategories } from '@/hooks/useCategories';
import { useTags } from '@/hooks/useTags';
import { useParams } from 'next/navigation';

export default function Posts() {
  const params = useParams<{ siteId: string; }>()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [deletingPost, setDeletingPost] = useState<any>(null);
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  //const { data: sites, isLoading: sitesLoading } = useSites();
  const { data: tags, isLoading: tagsLoading } = useTags();
  const { data: posts, isLoading, error } = usePosts();
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();
  const deletePost = useDeletePost();

  if (isLoading||categoriesLoading||tagsLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load posts" />;

  const columns = [
    { key: 'title', header: 'Title', render: (value: any) => value.en },
    { key: 'excerpt', header: 'Excerpt',render: (value: any) => value.en },
    { key: 'status', header: 'Status',render: (value: any) => (<Badge color={value === 'publish' ? 'green' : 'red'}>
      {value}
    </Badge>)},
  
  ];

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Posts</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all posts including their title, excerpt, status.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Add post
          </button>
        </div>
      </div>

      {posts?.length === 0 ? (
        <EmptyState
          title="No posts"
          description="Get started by creating a new post."
          buttonText="Add post"
          onClick={() => setIsCreateModalOpen(true)}
        />
      ) : (
        <DataTable
          columns={columns}
          data={posts}
          onEdit={setEditingPost}
          onDelete={setDeletingPost}
        />
      )}

      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Post"
      >
        <PostForm
        siteId={params.siteId}
        categories={categories}
        tags={tags}
          onSubmit={async (data) => {
            await createPost.mutateAsync(data);
            setIsCreateModalOpen(false);
          }}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        open={!!editingPost}
        onClose={() => setEditingPost(null)}
        title="Edit Post"
      >
        <PostForm
        siteId={params.siteId}
        categories={categories}
        tags={tags}
          initialData={editingPost}
          onSubmit={async (data) => {
            await updatePost.mutateAsync({ id: editingPost.id, ...data });
            setEditingPost(null);
          }}
          onCancel={() => setEditingPost(null)}
        />
      </Modal>

      <DeleteConfirmation
        open={!!deletingPost}
        onClose={() => setDeletingPost(null)}
        onConfirm={async () => {
          await deletePost.mutateAsync(deletingPost.id);
          setDeletingPost(null);
        }}
        title="Delete Post"
        message="Are you sure you want to delete this Post? This action cannot be undone."
      />
    </div>
  );
}