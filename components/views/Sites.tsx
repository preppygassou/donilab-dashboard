"use client"
import { useState } from 'react';
import Link from 'next/link';
import { useSites, useCreateSite, useUpdateSite, useDeleteSite } from '../../hooks/useSites';
import Modal from '../Modal';
import SiteForm from '../SiteForm';
import DeleteConfirmation from '../DeleteConfirmation';
import LoadingSpinner from '../LoadingSpinner';
import ErrorAlert from '../ErrorAlert';
import EmptyState from '../EmptyState';
import DataTable from '../DataTable';
import Badge from '../Badge';

export default function Sites() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingSite, setEditingSite] = useState<any>(null);
  const [deletingSite, setDeletingSite] = useState<any>(null);

  const { data: sites, isLoading, error } = useSites();
  const createSite = useCreateSite();
  const updateSite = useUpdateSite();
  const deleteSite = useDeleteSite();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load sites" />;

  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (value: any, site: any) => (
        <Link
          href={`/site/${site.id}`}
          className="text-green-600 hover:text-green-900"
        >
          {value.en}
        </Link>
      ),
    },
    { key: 'email', header: 'Email' },
    { key: 'city', header: 'City' },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <Badge color={value === 'ACTIVE' ? 'green' : 'red'}>
          {value}
        </Badge>
      ),
    },
  ];

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Sites</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all sites including their name, email, and location.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
            Add site
            </button>
        </div>
      </div>

      {sites?.length === 0 ? (
        <EmptyState
          title="No sites"
          description="Get started by creating a new site."
          buttonText="Add site"
          onClick={() => setIsCreateModalOpen(true)}
        />
      ) : (
        <DataTable
          columns={columns}
          data={sites}
          onEdit={setEditingSite}
          onDelete={setDeletingSite}
        />
      )}

      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Site"
      >
        <SiteForm
          onSubmit={async (data) => {
            await createSite.mutateAsync(data);
            setIsCreateModalOpen(false);
          }}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        open={!!editingSite}
        onClose={() => setEditingSite(null)}
        title="Edit Site"
      >
        <SiteForm
          initialData={editingSite}
          onSubmit={async (data) => {
            await updateSite.mutateAsync({ id: editingSite.id, ...data });
            setEditingSite(null);
          }}
          onCancel={() => setEditingSite(null)}
        />
      </Modal>

      <DeleteConfirmation
        open={!!deletingSite}
        onClose={() => setDeletingSite(null)}
        onConfirm={async () => {
          await deleteSite.mutateAsync(deletingSite.id);
          setDeletingSite(null);
        }}
        title="Delete Site"
        message="Are you sure you want to delete this site? This action cannot be undone."
      />
    </div>
  );
}