"use client"
import { useState } from 'react';
import { useReports, useCreateReport, useUpdateReport, useDeleteReport } from '../../hooks/useReports';
import Modal from '../Modal';
import ReportForm from '../ReportForm';
import DeleteConfirmation from '../DeleteConfirmation';
import LoadingSpinner from '../LoadingSpinner';
import ErrorAlert from '../ErrorAlert';
import EmptyState from '../EmptyState';
import DataTable from '../DataTable';
import { useParams } from 'next/navigation';

export default function Reports() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingReport, setEditingReport] = useState<any>(null);
  const [deletingReport, setDeletingReport] = useState<any>(null);
  const params = useParams<{ siteId: string; }>()
  const { data: reports, isLoading, error } = useReports();
  const createReport = useCreateReport();
  const updateReport = useUpdateReport();
  const deleteReport = useDeleteReport();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load reports" />;

  const columns = [
    { key: 'title', header: 'Title', render: (value: any) => value.en },
    { key: 'year', header: 'Year' },
    {
      key: 'site',
      header: 'site',
      render: (value: any) => value.name.en ,
    },
    {
      key: 'url',
      header: 'URL',
      render: (value: string) => value && (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:text-green-900"
        >
          View Report
        </a>
      ),
    },
  ];

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Reports</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all reports including their title, year, and download link.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Add report
          </button>
        </div>
      </div>

      {reports?.length === 0 ? (
        <EmptyState
          title="No reports"
          description="Get started by creating a new report."
          buttonText="Add report"
          onClick={() => setIsCreateModalOpen(true)}
        />
      ) : (
        <DataTable
          columns={columns}
          data={reports}
          onEdit={setEditingReport}
          onDelete={setDeletingReport}
        />
      )}

      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Report"
      >
        <ReportForm
        siteId={params.siteId}
          onSubmit={async (data) => {
            await createReport.mutateAsync(data);
            setIsCreateModalOpen(false);
          }}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        open={!!editingReport}
        onClose={() => setEditingReport(null)}
        title="Edit Report"
      >
        <ReportForm
        siteId={params.siteId}
          initialData={editingReport}
          onSubmit={async (data) => {
            await updateReport.mutateAsync({ id: editingReport.id, ...data });
            setEditingReport(null);
          }}
          onCancel={() => setEditingReport(null)}
        />
      </Modal>

      <DeleteConfirmation
        open={!!deletingReport}
        onClose={() => setDeletingReport(null)}
        onConfirm={async () => {
          await deleteReport.mutateAsync(deletingReport.id);
          setDeletingReport(null);
        }}
        title="Delete Report"
        message="Are you sure you want to delete this report? This action cannot be undone."
      />
    </div>
  );
}