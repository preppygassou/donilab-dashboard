"use client"
import { useState } from 'react';
import { useTeams, useCreateTeam, useUpdateTeam, useDeleteTeam } from '../../hooks/useTeams';
import Modal from '../Modal';
import TeamForm from '../TeamForm';
import DeleteConfirmation from '../DeleteConfirmation';
import LoadingSpinner from '../LoadingSpinner';
import ErrorAlert from '../ErrorAlert';
import EmptyState from '../EmptyState';
import DataTable from '../DataTable';
import { useParams } from 'next/navigation';
import { useHubs } from '@/hooks/useHubs';

export default function Teams() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<any>(null);
  const [deletingTeam, setDeletingTeam] = useState<any>(null);
  const { data: hubs, isLoading: hubsLoading } = useHubs();
  const params = useParams<{ siteId: string; }>()

  const { data: teams, isLoading, error } = useTeams();
  const createTeam = useCreateTeam();
  const updateTeam = useUpdateTeam();
  const deleteTeam = useDeleteTeam();

  if (isLoading||hubsLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load team members" />;

  const columns = [
    { key: 'name', header: 'Name' },
    {
      key: 'profile',
      header: 'Profile',
      render: (value: any) => value && (
        <img src={value.url} alt="Profile" className="h-8 w-8 rounded-full" />
      ),
    },
    { key: 'poste', header: 'Position', render: (value: any) => value.en },
    {
      key: 'site',
      header: 'Site/Hub',
      render: (_, item: any) => item.site?.name.en || item.hub?.title.en,
    },
  ];

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Team Members</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all team members including their name, position, and associated site or hub.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Add team member
          </button>
        </div>
      </div>

      {teams?.length === 0 ? (
        <EmptyState
          title="No team members"
          description="Get started by adding a new team member."
          buttonText="Add team member"
          onClick={() => setIsCreateModalOpen(true)}
        />
      ) : (
        <DataTable
          columns={columns}
          data={teams}
          onEdit={setEditingTeam}
          onDelete={setDeletingTeam}
        />
      )}

      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Add Team Member"
      >
        <TeamForm
        siteId={params.siteId}
        hubs={hubs}
          onSubmit={async (data) => {
            await createTeam.mutateAsync(data);
            setIsCreateModalOpen(false);
          }}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        open={!!editingTeam}
        onClose={() => setEditingTeam(null)}
        title="Edit Team Member"
      >
        <TeamForm
        siteId={params.siteId}
        hubs={hubs}
          initialData={editingTeam}
          onSubmit={async (data) => {
            await updateTeam.mutateAsync({ id: editingTeam.id, ...data });
            setEditingTeam(null);
          }}
          onCancel={() => setEditingTeam(null)}
        />
      </Modal>

      <DeleteConfirmation
        open={!!deletingTeam}
        onClose={() => setDeletingTeam(null)}
        onConfirm={async () => {
          await deleteTeam.mutateAsync(deletingTeam.id);
          setDeletingTeam(null);
        }}
        title="Delete Team Member"
        message="Are you sure you want to delete this team member? This action cannot be undone."
      />
    </div>
  );
}