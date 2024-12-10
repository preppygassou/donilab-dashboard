"use client"
import { useState } from 'react';
import { useZones, useCreateZone, useUpdateZone, useDeleteZone } from '../../hooks/useZones';
import Modal from '../Modal';
import ZoneForm from '../ZoneForm';
import DeleteConfirmation from '../DeleteConfirmation';
import LoadingSpinner from '../LoadingSpinner';
import ErrorAlert from '../ErrorAlert';
import EmptyState from '../EmptyState';
import DataTable from '../DataTable';

export default function Zones() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingZone, setEditingZone] = useState<any>(null);
  const [deletingZone, setDeletingZone] = useState<any>(null);

  const { data: zones, isLoading, error } = useZones(); // Assuming you have a hook for fetching zones
  const createZone = useCreateZone(); // Assuming you have a hook for creating zones
  const updateZone = useUpdateZone(); // Assuming you have a hook for updating zones
  const deleteZone = useDeleteZone(); // Assuming you have a hook for deleting zones

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load zones" />;

  const columns = [
    { key: 'name', header: 'Name', render: (value: any) => value.en },
   /*  { key: 'description', header: 'Description', render: (value: any) => value?.en },
     */
  ];

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Zones</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all zones including their name and post count.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Add zone
          </button>
        </div>
      </div>

      {zones?.length === 0 ? (
        <EmptyState
          title="No zones"
          description="Get started by creating a new zone."
          buttonText="Add zone"
          onClick={() => setIsCreateModalOpen(true)}
        />
      ) : (
        <DataTable
          columns={columns}
          data={zones}
          onEdit={setEditingZone}
          onDelete={setDeletingZone}
        />
      )}

      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Zone"
      >
        <ZoneForm
          onSubmit={async (data) => {
            await createZone.mutateAsync(data);
            setIsCreateModalOpen(false);
          }}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        open={!!editingZone}
        onClose={() => setEditingZone(null)}
        title="Edit Zone"
      >
        <ZoneForm
          initialData={editingZone}
          onSubmit={async (data) => {
            await updateZone.mutateAsync({ id: editingZone.id, ...data });
            setEditingZone(null);
          }}
          onCancel={() => setEditingZone(null)}
        />
      </Modal>

      <DeleteConfirmation
        open={!!deletingZone}
        onClose={() => setDeletingZone(null)}
        onConfirm={async () => {
          await deleteZone.mutateAsync(deletingZone.id);
          setDeletingZone(null);
        }}
        title="Delete Zone"
        message="Are you sure you want to delete this zone? This action cannot be undone."
      />
    </div>
  );
}