"use client"
import { useState } from 'react';
import { useEvents, useCreateEvent, useUpdateEvent, useDeleteEvent } from '../../hooks/useEvents';
import Modal from '../Modal';
import EventForm from '../EventForm';
import DeleteConfirmation from '../DeleteConfirmation';
import LoadingSpinner from '../LoadingSpinner';
import ErrorAlert from '../ErrorAlert';
import EmptyState from '../EmptyState';
import DataTable from '../DataTable';
import Badge from '../Badge';
import { formatDate, formatCurrency } from '../../utils/formatters';
import { useCategories } from '@/hooks/useCategories';
import { useHubs } from '@/hooks/useHubs';
import { useParams } from 'next/navigation';

export default function Events() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [deletingEvent, setDeletingEvent] = useState<any>(null);
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: hubs, isLoading: hubsLoading } = useHubs();
  const params = useParams<{ siteId: string; }>()

  const { data: events, isLoading, error } = useEvents();
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  if (isLoading||categoriesLoading||hubsLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load events" />;

  const columns = [
    { key: 'title', header: 'Title', render: (value: any) => value.en },
    { key: 'location', header: 'Location' },
    {
      key: 'startDateTime',
      header: 'Start Date',
      render: (value: string) => formatDate(value),
    },
    {
      key: 'price',
      header: 'Price',
      render: (value: string, item: any) => item.isFree ? 'Free' : formatCurrency(value),
    },
    {
      key: 'organizer',
      header: 'Organizer',
      render: (value: any) => value?.title?.en,
    },
  ];

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Events</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all events including their title, location, and date.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Add event
          </button>
        </div>
      </div>

      {events?.length === 0 ? (
        <EmptyState
          title="No events"
          description="Get started by creating a new event."
          buttonText="Add event"
          onClick={() => setIsCreateModalOpen(true)}
        />
      ) : (
        <DataTable
          columns={columns}
          data={events}
          onEdit={setEditingEvent}
          onDelete={setDeletingEvent}
        />
      )}

      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Event"
      >
        <EventForm
        siteId={params.siteId}
        categories={categories}
        hubs={hubs}
          onSubmit={async (data) => {
            await createEvent.mutateAsync(data);
            setIsCreateModalOpen(false);
          }}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        open={!!editingEvent}
        onClose={() => setEditingEvent(null)}
        title="Edit Event"
      >
        <EventForm
        categories={categories}
        siteId={params.siteId}
        hubs={hubs}
          initialData={editingEvent}
          onSubmit={async (data) => {
            await updateEvent.mutateAsync({ id: editingEvent.id, ...data });
            setEditingEvent(null);
          }}
          onCancel={() => setEditingEvent(null)}
        />
      </Modal>

      <DeleteConfirmation
        open={!!deletingEvent}
        onClose={() => setDeletingEvent(null)}
        onConfirm={async () => {
          await deleteEvent.mutateAsync(deletingEvent.id);
          setDeletingEvent(null);
        }}
        title="Delete Event"
        message="Are you sure you want to delete this event? This action cannot be undone."
      />
    </div>
  );
}