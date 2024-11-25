"use client"
import { useState } from 'react';

import { useHubs, useCreateHub, useUpdateHub, useDeleteHub } from '../../hooks/useHubs';
import { useSites } from '../../hooks/useSites';
import Modal from '../Modal';
import HubForm from '../HubForm';
import DeleteConfirmation from '../DeleteConfirmation';
import LoadingSpinner from '../LoadingSpinner';
import ErrorAlert from '../ErrorAlert';
import EmptyState from '../EmptyState';
import DataTable from '../DataTable';

export default function Hubs() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingHub, setEditingHub] = useState<any>(null);
  const [deletingHub, setDeletingHub] = useState<any>(null);

  const { data: hubs, isLoading: hubsLoading, error: hubsError } = useHubs();
  const { data: sites, isLoading: sitesLoading } = useSites();
  const createHub = useCreateHub();
  const updateHub = useUpdateHub();
  const deleteHub = useDeleteHub();

  if (hubsLoading || sitesLoading) return <LoadingSpinner />;
  if (hubsError) return <ErrorAlert message="Failed to load hubs" />;

  const columns = [
    { key: 'title', header: 'Title', render: (value: any) => value.en },
    { key: 'email', header: 'Email' },
    { key: 'city', header: 'City' },
    { key: 'status', header: 'Status' },
    {
      key: 'site',
      header: 'Site',
      render: (value: any) => value?.name?.en,
    },
  ];

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Hubs</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all hubs including their title, email, and location.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Add hub
          </button>
        </div>
      </div>

      {hubs?.length === 0 ? (
        <EmptyState
          title="No hubs"
          description="Get started by creating a new hub."
          buttonText="Add hub"
          onClick={() => setIsCreateModalOpen(true)}
        />
      ) : (
        <DataTable
          columns={columns}
          data={hubs}
          onEdit={setEditingHub}
          onDelete={setDeletingHub}
        />
      )}

      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Hub"
      >
        <HubForm
          sites={sites || []}
          onSubmit={async (data) => {
            await createHub.mutateAsync(data);
            setIsCreateModalOpen(false);
          }}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        open={!!editingHub}
        onClose={() => setEditingHub(null)}
        title="Edit Hub"
      >
        <HubForm
          initialData={editingHub}
          sites={sites || []}
          onSubmit={async (data) => {
            await updateHub.mutateAsync({ id: editingHub.id, ...data });
            setEditingHub(null);
          }}
          onCancel={() => setEditingHub(null)}
        />
      </Modal>

      <DeleteConfirmation
        open={!!deletingHub}
        onClose={() => setDeletingHub(null)}
        onConfirm={async () => {
          await deleteHub.mutateAsync(deletingHub.id);
          setDeletingHub(null);
        }}
        title="Delete Hub"
        message="Are you sure you want to delete this hub? This action cannot be undone."
      />
    </div>
  );
}