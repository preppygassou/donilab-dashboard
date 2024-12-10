"use client"
import { useState } from 'react';
import { useProgramTypes, useCreateProgramType, useUpdateProgramType, useDeleteProgramType } from '../../hooks/useProgramTypes';
import Modal from '../Modal';
import ProgramTypeForm from '../ProgramTypeForm';
import DeleteConfirmation from '../DeleteConfirmation';
import LoadingSpinner from '../LoadingSpinner';
import ErrorAlert from '../ErrorAlert';
import EmptyState from '../EmptyState';
import DataTable from '../DataTable';

export default function ProgramTypes() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProgramType, setEditingProgramType] = useState<any>(null);
  const [deletingProgramType, setDeletingProgramType] = useState<any>(null);

  const { data: programTypes, isLoading, error } = useProgramTypes();
  const createProgramType = useCreateProgramType();
  const updateProgramType = useUpdateProgramType();
  const deleteProgramType = useDeleteProgramType();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load program types" />;

  const columns = [
    { key: 'name', header: 'Name', render: (value: any) => value.en },
    { key: 'description', header: 'Description', render: (value: any) => value?.en },
    { key: 'count', header: 'Posts' },
  ];

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Program Types</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all program types including their name and post count.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Add program type
          </button>
        </div>
      </div>

      {programTypes?.length === 0 ? (
        <EmptyState
          title="No program types"
          description="Get started by creating a new program type."
          buttonText="Add program type"
          onClick={() => setIsCreateModalOpen(true)}
        />
      ) : (
        <DataTable
          columns={columns}
          data={programTypes}
          onEdit={setEditingProgramType}
          onDelete={setDeletingProgramType}
        />
      )}

      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Program Type"
      >
        <ProgramTypeForm
          onSubmit={async (data) => {
            await createProgramType.mutateAsync(data);
            setIsCreateModalOpen(false);
          }}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        open={!!editingProgramType}
        onClose={() => setEditingProgramType(null)}
        title="Edit Program Type"
      >
        <ProgramTypeForm
          initialData={editingProgramType}
          onSubmit={async (data) => {
            await updateProgramType.mutateAsync({ id: editingProgramType.id, ...data });
            setEditingProgramType(null);
          }}
          onCancel={() => setEditingProgramType(null)}
        />
      </Modal>

      <DeleteConfirmation
        open={!!deletingProgramType}
        onClose={() => setDeletingProgramType(null)}
        onConfirm={async () => {
          await deleteProgramType.mutateAsync(deletingProgramType.id);
          setDeletingProgramType(null);
        }}
        title="Delete Program Type"
        message="Are you sure you want to delete this program type? This action cannot be undone."
      />
    </div>
  );
}