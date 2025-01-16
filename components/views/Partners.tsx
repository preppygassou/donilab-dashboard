"use client"
import { useState } from 'react';
import { usePartners, useCreatePartner, useUpdatePartner, useDeletePartner } from '../../hooks/usePartners';
import Modal from '../Modal';
import PartnerForm from '../PartnerForm';
import DeleteConfirmation from '../DeleteConfirmation';
import LoadingSpinner from '../LoadingSpinner';
import ErrorAlert from '../ErrorAlert';
import EmptyState from '../EmptyState';
import DataTable from '../DataTable';

export default function Partners() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<any>(null);
  const [deletingPartner, setDeletingPartner] = useState<any>(null);

  const { data: partners, isLoading, error } = usePartners();
  const createPartner = useCreatePartner();
  const updatePartner = useUpdatePartner();
  const deletePartner = useDeletePartner();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load partners" />;

  const columns = [
    { key: 'name', header: 'Name', render: (value: any) => value.en },
    {
      key: 'logo',
      header: 'Logo',
      render: (value: any) => (
        <img src={value.url} alt="Logo" className="h-8 w-8 rounded-full" />
      ),
    },
    {
      key: 'link',
      header: 'Website',
      render: (value: string) =>
        value ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-900"
          >
            Visit website
          </a>
        ) : null,
    },
  ];

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Partners</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all partners including their name and logo.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Add partner
          </button>
        </div>
      </div>

      {partners?.length === 0 ? (
        <EmptyState
          title="No partners"
          description="Get started by creating a new partner."
          buttonText="Add partner"
          onClick={() => setIsCreateModalOpen(true)}
        />
      ) : (
        <DataTable
          columns={columns}
          data={partners}
          onEdit={setEditingPartner}
          onDelete={setDeletingPartner}
        />
      )}

      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Partner"
      >
        <PartnerForm
          onSubmit={async (data) => {
            await createPartner.mutateAsync(data);
            setIsCreateModalOpen(false);
          }}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        open={!!editingPartner}
        onClose={() => setEditingPartner(null)}
        title="Edit Partner"
      >
        <PartnerForm
          initialData={editingPartner}
          onSubmit={async (data) => {
            await updatePartner.mutateAsync({ id: editingPartner.id, ...data });
            setEditingPartner(null);
          }}
          onCancel={() => setEditingPartner(null)}
        />
      </Modal>

      <DeleteConfirmation
        open={!!deletingPartner}
        onClose={() => setDeletingPartner(null)}
        onConfirm={async () => {
          await deletePartner.mutateAsync(deletingPartner.id);
          setDeletingPartner(null);
        }}
        title="Delete Partner"
        message="Are you sure you want to delete this partner? This action cannot be undone."
      />
    </div>
  );
}