"use client"
import { useState } from 'react';
import { useCompanies, useCreateCompany, useUpdateCompany, useDeleteCompany } from '../../hooks/useEntreprise';
import Modal from '../Modal';
import CompanyForm from '../CompanyForm';
import DeleteConfirmation from '../DeleteConfirmation';
import LoadingSpinner from '../LoadingSpinner';
import ErrorAlert from '../ErrorAlert';
import EmptyState from '../EmptyState';
import DataTable from '../DataTable';
import { useParams } from 'next/navigation';
import { useHubs } from '../../hooks/useHubs';

export default function Companies() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<any>(null);
  const [deletingCompany, setDeletingCompany] = useState<any>(null);
  const { data: hubs, isLoading: hubsLoading } = useHubs();
  const { data: companies, isLoading, error } = useCompanies();
  const createCompany = useCreateCompany();
  const updateCompany = useUpdateCompany();
  const deleteCompany = useDeleteCompany();
  const params = useParams<{ siteId: string; }>()
  if (isLoading || hubsLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load companies" />;

  const columns = [
    { key: 'name', header: 'Name', render: (value: any) => value },
    {
      key: 'logo',
      header: 'Logo',
      render: (value: any) => (
        <img src={value.url} alt="Logo" className="h-8 w-8 rounded-full" />
      ),
    },
    {
      key: 'url',
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

  console.log("error c", error)

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Companies</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all companies including their name and logo.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Add company
          </button>
        </div>
      </div>

      {companies?.length === 0 ? (
        <EmptyState
          title="No companies"
          description="Get started by creating a new company."
          buttonText="Add company"
          onClick={() => setIsCreateModalOpen(true)}
        />
      ) : (
        <DataTable
          columns={columns}
          data={companies}
          onEdit={setEditingCompany}
          onDelete={setDeletingCompany}
        />
      )}

      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Company"
      >
        <CompanyForm
        siteId={params.siteId}
          hubs={hubs}
          onSubmit={async (data) => {
            await createCompany.mutateAsync(data);
            setIsCreateModalOpen(false);
          }}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        open={!!editingCompany}
        onClose={() => setEditingCompany(null)}
        title="Edit Company"
      >
        <CompanyForm
          siteId={params.siteId}
          hubs={hubs}
          initialData={editingCompany}
          onSubmit={async (data) => {
            await updateCompany.mutateAsync({ id: editingCompany.id, ...data });
            setEditingCompany(null);
          }}
          onCancel={() => setEditingCompany(null)}
        />
      </Modal>

      <DeleteConfirmation
        open={!!deletingCompany}
        onClose={() => setDeletingCompany(null)}
        onConfirm={async () => {
          await deleteCompany.mutateAsync(deletingCompany.id);
          setDeletingCompany(null);
        }}
        title="Delete Company"
        message="Are you sure you want to delete this company? This action cannot be undone."
      />
    </div>
  );
}