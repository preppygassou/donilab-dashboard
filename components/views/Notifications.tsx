import { useState } from 'react';
import { useNotifications, useCreateNotification, useUpdateNotification, useDeleteNotification } from '../../hooks/useNotifications';
import Modal from '../Modal';
import NotificationForm from '../NotificationForm';
import DeleteConfirmation from '../DeleteConfirmation';
import LoadingSpinner from '../LoadingSpinner';
import ErrorAlert from '../ErrorAlert';
import EmptyState from '../EmptyState';
import DataTable from '../DataTable';
import { formatDate } from '../../utils/formatters';

export default function Notifications() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingNotification, setEditingNotification] = useState<any>(null);
  const [deletingNotification, setDeletingNotification] = useState<any>(null);

  const { data: notifications, isLoading, error } = useNotifications();
  const createNotification = useCreateNotification();
  const updateNotification = useUpdateNotification();
  const deleteNotification = useDeleteNotification();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load notifications" />;

  const columns = [
    { key: 'notification', header: 'Message' },
    {
      key: 'user',
      header: 'User',
      render: (value: any) => value?.name,
    },
    {
      key: 'site',
      header: 'Site',
      render: (value: any) => value?.name?.en,
    },
    {
      key: 'hub',
      header: 'Hub',
      render: (value: any) => value?.title?.en,
    },
    {
      key: 'createdAt',
      header: 'Created At',
      render: (value: string) => formatDate(value),
    },
  ];

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Notifications</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all notifications sent to users.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Add notification
          </button>
        </div>
      </div>

      {notifications?.length === 0 ? (
        <EmptyState
          title="No notifications"
          description="Get started by creating a new notification."
          buttonText="Add notification"
          onClick={() => setIsCreateModalOpen(true)}
        />
      ) : (
        <DataTable
          columns={columns}
          data={notifications}
          onEdit={setEditingNotification}
          onDelete={setDeletingNotification}
        />
      )}

      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Notification"
      >
        <NotificationForm
          onSubmit={async (data) => {
            await createNotification.mutateAsync(data);
            setIsCreateModalOpen(false);
          }}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        open={!!editingNotification}
        onClose={() => setEditingNotification(null)}
        title="Edit Notification"
      >
        <NotificationForm
          initialData={editingNotification}
          onSubmit={async (data) => {
            await updateNotification.mutateAsync({ id: editingNotification.id, ...data });
            setEditingNotification(null);
          }}
          onCancel={() => setEditingNotification(null)}
        />
      </Modal>

      <DeleteConfirmation
        open={!!deletingNotification}
        onClose={() => setDeletingNotification(null)}
        onConfirm={async () => {
          await deleteNotification.mutateAsync(deletingNotification.id);
          setDeletingNotification(null);
        }}
        title="Delete Notification"
        message="Are you sure you want to delete this notification? This action cannot be undone."
      />
    </div>
  );
}