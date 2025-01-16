"use client"
import { useState } from 'react';
import { useTags, useCreateTag, useUpdateTag, useDeleteTag } from '../../hooks/useTags';
import Modal from '../Modal';
import TagForm from '../TagForm';
import DeleteConfirmation from '../DeleteConfirmation';
import LoadingSpinner from '../LoadingSpinner';
import ErrorAlert from '../ErrorAlert';
import EmptyState from '../EmptyState';
import DataTable from '../DataTable';

export default function Tags() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<any>(null);
  const [deletingTag, setDeletingTag] = useState<any>(null);

  const { data: tags, isLoading, error } = useTags();
  const createTag = useCreateTag();
  const updateTag = useUpdateTag();
  const deleteTag = useDeleteTag();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load tags" />;

  const columns = [
    { key: 'name', header: 'Name', render: (value: any) => value.en },
    { key: 'description', header: 'Description', render: (value: any) => value?.en },
    { key: 'count', header: 'Posts' },
  ];

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Tags</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all tags including their name and post count.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Add tag
          </button>
        </div>
      </div>

      {tags?.length === 0 ? (
        <EmptyState
          title="No tags"
          description="Get started by creating a new tag."
          buttonText="Add tag"
          onClick={() => setIsCreateModalOpen(true)}
        />
      ) : (
        <DataTable
          columns={columns}
          data={tags}
          onEdit={setEditingTag}
          onDelete={setDeletingTag}
        />
      )}

      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Tag"
      >
        <TagForm
        tags={tags}
          onSubmit={async (data) => {
            await createTag.mutateAsync(data);
            setIsCreateModalOpen(false);
          }}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        open={!!editingTag}
        onClose={() => setEditingTag(null)}
        title="Edit Tag"
      >
        <TagForm
        tags={tags}
          initialData={editingTag}
          onSubmit={async (data) => {
            await updateTag.mutateAsync({ id: editingTag.id, ...data });
            setEditingTag(null);
          }}
          onCancel={() => setEditingTag(null)}
        />
      </Modal>

      <DeleteConfirmation
        open={!!deletingTag}
        onClose={() => setDeletingTag(null)}
        onConfirm={async () => {
          await deleteTag.mutateAsync(deletingTag.id);
          setDeletingTag(null);
        }}
        title="Delete Tag"
        message="Are you sure you want to delete this tag? This action cannot be undone."
      />
    </div>
  );
}