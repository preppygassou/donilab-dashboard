"use client"
import { useState } from 'react';
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '../../hooks/useCategories';
import Modal from '../Modal';
import CategoryForm from '../CategoryForm';
import DeleteConfirmation from '../DeleteConfirmation';
import LoadingSpinner from '../LoadingSpinner';
import ErrorAlert from '../ErrorAlert';
import EmptyState from '../EmptyState';
import DataTable from '../DataTable';

export default function Categories() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [deletingCategory, setDeletingCategory] = useState<any>(null);

  const { data: categories, isLoading, error } = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load categories" />;

  const columns = [
    { key: 'name', header: 'Name', render: (value: any) => value.en },
    { key: 'description', header: 'Description', render: (value: any) => value?.en },
    { key: 'count', header: 'Posts' },
  ];

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Categories</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all categories including their name and post count.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Add category
          </button>
        </div>
      </div>

      {categories?.length === 0 ? (
        <EmptyState
          title="No categories"
          description="Get started by creating a new category."
          buttonText="Add category"
          onClick={() => setIsCreateModalOpen(true)}
        />
      ) : (
        <DataTable
          columns={columns}
          data={categories}
          onEdit={setEditingCategory}
          onDelete={setDeletingCategory}
        />
      )}

      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Category"
      >
        <CategoryForm
        categories={categories}
          onSubmit={async (data) => {
            await createCategory.mutateAsync(data);
            setIsCreateModalOpen(false);
          }}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        open={!!editingCategory}
        onClose={() => setEditingCategory(null)}
        title="Edit Category"
      >
        <CategoryForm
        categories={categories}
          initialData={editingCategory}
          onSubmit={async (data) => {
            await updateCategory.mutateAsync({ id: editingCategory.id, ...data });
            setEditingCategory(null);
          }}
          onCancel={() => setEditingCategory(null)}
        />
      </Modal>

      <DeleteConfirmation
        open={!!deletingCategory}
        onClose={() => setDeletingCategory(null)}
        onConfirm={async () => {
          await deleteCategory.mutateAsync(deletingCategory.id);
          setDeletingCategory(null);
        }}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone."
      />
    </div>
  );
}