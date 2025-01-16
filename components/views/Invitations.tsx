"use client"
import { useState } from 'react';
import { useInvitations, useCreateInvitation, useUpdateInvitation, useDeleteInvitation } from '../../hooks/useInvitations';
import Modal from '../Modal';
import InvitationForm from '../InvitationForm';
import DeleteConfirmation from '../DeleteConfirmation';
import LoadingSpinner from '../LoadingSpinner';
import ErrorAlert from '../ErrorAlert';
import EmptyState from '../EmptyState';
import DataTable from '../DataTable';
import Badge from '../Badge';

export default function Invitations() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingInvitation, setEditingInvitation] = useState<any>(null);
  const [deletingInvitation, setDeletingInvitation] = useState<any>(null);

  const { data: invitations, isLoading, error } = useInvitations();
  const createInvitation = useCreateInvitation();
  const updateInvitation = useUpdateInvitation();
  const deleteInvitation = useDeleteInvitation();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load invitations" />;

  const columns = [
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => {
        const colors: Record<string, any> = {
          PENDING: 'yellow',
          ACCEPTED: 'green',
          REVOKED: 'red',
        };
        return <Badge color={colors[value]}>{value}</Badge>;
      },
    },
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
          <h1 className="text-base font-semibold leading-6 text-gray-900">Invitations</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all invitations including their status and role.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Add invitation
          </button>
        </div>
      </div>

      {invitations?.length === 0 ? (
        <EmptyState
          title="No invitations"
          description="Get started by creating a new invitation."
          buttonText="Add invitation"
          onClick={() => setIsCreateModalOpen(true)}
        />
      ) : (
        <DataTable
          columns={columns}
          data={invitations}
          onEdit={setEditingInvitation}
          onDelete={setDeletingInvitation}
        />
      )}

      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Invitation"
      >
        <InvitationForm
          onSubmit={async (data) => {
            await createInvitation.mutateAsync(data);
            setIsCreateModalOpen(false);
          }}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        open={!!editingInvitation}
        onClose={() => setEditingInvitation(null)}
        title="Edit Invitation"
      >
        <InvitationForm
          initialData={editingInvitation}
          onSubmit={async (data) => {
            await updateInvitation.mutateAsync({ id: editingInvitation.id, ...data });
            setEditingInvitation(null);
          }}
          onCancel={() => setEditingInvitation(null)}
        />
      </Modal>

      <DeleteConfirmation
        open={!!deletingInvitation}
        onClose={() => setDeletingInvitation(null)}
        onConfirm={async () => {
          await deleteInvitation.mutateAsync(deletingInvitation.id);
          setDeletingInvitation(null);
        }}
        title="Delete Invitation"
        message="Are you sure you want to delete this invitation? This action cannot be undone."
      />
    </div>
  );
}