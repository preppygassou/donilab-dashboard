"use client"
import { useState } from 'react';
import { useEditions, useCreateEdition, useUpdateEdition, useDeleteEdition } from '../../hooks/useEditions';
import Modal from '../Modal';
import EditionForm from '../EditionForm';
import DeleteConfirmation from '../DeleteConfirmation';
import LoadingSpinner from '../LoadingSpinner';
import ErrorAlert from '../ErrorAlert';
import EmptyState from '../EmptyState';
import DataTable from '../DataTable';

export default function Editions() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingEdition, setEditingEdition] = useState<any>(null);
  const [deletingEdition, setDeletingEdition] = useState<any>(null);

  const { data: editions, isLoading, error } = useEditions(); // Assuming you have a hook for fetching editions
  const createEdition = useCreateEdition(); // Assuming you have a hook for creating editions
  const updateEdition = useUpdateEdition(); // Assuming you have a hook for updating editions
  const deleteEdition = useDeleteEdition(); // Assuming you have a hook for deleting editions

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load editions" />;

  const columns = [
   /*  { key: 'name', header: 'Name', render: (value: any) => value.en }, */
    { key: 'name', header: 'Name', render: (value: any) => value.en}, 
  ];

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Editions</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all editions including their name .
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Add edition
          </button>
        </div>
      </div>

      {editions?.length === 0 ? (
        <EmptyState
          title="No editions"
          description="Get started by creating a new edition."
          buttonText="Add edition"
          onClick={() => setIsCreateModalOpen(true)}
        />
      ) : (
        <DataTable
          columns={columns}
          data={editions}
          onEdit={setEditingEdition}
          onDelete={setDeletingEdition}
        />
      )}

      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Edition"
      >
        <EditionForm
          onSubmit={async (data) => {
            await createEdition.mutateAsync(data);
            setIsCreateModalOpen(false);
          }}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        open={!!editingEdition}
        onClose={() => setEditingEdition(null)}
        title="Edit Edition"
      >
        <EditionForm
          initialData={editingEdition}
          onSubmit={async (data) => {
            await updateEdition.mutateAsync({ id: editingEdition.id, ...data });
            setEditingEdition(null);
          }}
          onCancel={() => setEditingEdition(null)}
        />
      </Modal>

      <DeleteConfirmation
        open={!!deletingEdition}
        onClose={() => setDeletingEdition(null)}
        onConfirm={async () => {
          await deleteEdition.mutateAsync(deletingEdition.id);
          setDeletingEdition(null);
        }}
        title="Delete Edition"
        message="Are you sure you want to delete this edition? This action cannot be undone."
      />
    </div>
  );
}