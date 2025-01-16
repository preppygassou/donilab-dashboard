import { useState } from 'react';
import { useBookings, useCreateBooking, useUpdateBooking, useDeleteBooking } from '../../hooks/useBookings';
import Modal from '../Modal';
import BookingForm from '../BookingForm';
import DeleteConfirmation from '../DeleteConfirmation';
import LoadingSpinner from '../LoadingSpinner';
import ErrorAlert from '../ErrorAlert';
import EmptyState from '../EmptyState';
import DataTable from '../DataTable';
import { formatDate, formatCurrency } from '../../utils/formatters';

export default function Bookings() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<any>(null);
  const [deletingBooking, setDeletingBooking] = useState<any>(null);

  const { data: bookings, isLoading, error } = useBookings();
  const createBooking = useCreateBooking();
  const updateBooking = useUpdateBooking();
  const deleteBooking = useDeleteBooking();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load bookings" />;

  const columns = [
    {
      key: 'event',
      header: 'Event',
      render: (value: any) => value?.title?.en,
    },
    {
      key: 'user',
      header: 'User',
      render: (value: any) => value?.name,
    },
    {
      key: 'totalAmount',
      header: 'Amount',
      render: (value: string) => formatCurrency(value),
    },
    {
      key: 'createdAt',
      header: 'Booking Date',
      render: (value: string) => formatDate(value),
    },
  ];

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Bookings</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all event bookings including the event, user, and amount.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Add booking
          </button>
        </div>
      </div>

      {bookings?.length === 0 ? (
        <EmptyState
          title="No bookings"
          description="Get started by creating a new booking."
          buttonText="Add booking"
          onClick={() => setIsCreateModalOpen(true)}
        />
      ) : (
        <DataTable
          columns={columns}
          data={bookings}
          onEdit={setEditingBooking}
          onDelete={setDeletingBooking}
        />
      )}

      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Booking"
      >
        <BookingForm
          onSubmit={async (data) => {
            await createBooking.mutateAsync(data);
            setIsCreateModalOpen(false);
          }}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        open={!!editingBooking}
        onClose={() => setEditingBooking(null)}
        title="Edit Booking"
      >
        <BookingForm
          initialData={editingBooking}
          onSubmit={async (data) => {
            await updateBooking.mutateAsync({ id: editingBooking.id, ...data });
            setEditingBooking(null);
          }}
          onCancel={() => setEditingBooking(null)}
        />
      </Modal>

      <DeleteConfirmation
        open={!!deletingBooking}
        onClose={() => setDeletingBooking(null)}
        onConfirm={async () => {
          await deleteBooking.mutateAsync(deletingBooking.id);
          setDeletingBooking(null);
        }}
        title="Delete Booking"
        message="Are you sure you want to delete this booking? This action cannot be undone."
      />
    </div>
  );
}