"use client"
import { useCreateProgram, useDeleteProgram, usePrograms, useUpdateProgram } from '../../../hooks/usePrograms';
import DataTable from '../../DataTable';
import LoadingSpinner from '../../LoadingSpinner';
import ErrorAlert from '../../ErrorAlert';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { usePartners } from '@/hooks/usePartners';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import ProgramForm from '@/components/ProgramForm';
import Modal from '@/components/Modal';
import EmptyState from '@/components/EmptyState';
import { useHub, useHubs } from '@/hooks/useHubs';
import { useProgramTypes } from '@/hooks/useProgramTypes';
import Link from 'next/link';
import { useZones } from '@/hooks/useZones';

interface Props {
  hubId?: string;
}

export default function Programs({/*  hubId */ }: Props) {
  const { data: programs, isLoading, error } = usePrograms();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<any>(null);
  const [deletingProgram, setDeletingProgram] = useState<any>(null);
  const params = useParams<{ hubId: string; }>()

  const { data: hubs, isLoading: hubsLoading } = useHubs();
  const { data: zones, isLoading: zonesLoading } = useZones();

  const filteredPrograms = programs?.filter(program => program.hubId === params.hubId);
  const { data: partners, isLoading: partnersLoading } = usePartners();
  const { data: programtypes, isLoading: programtypesLoading } = useProgramTypes();
  const createProgram = useCreateProgram();
  const updateProgram = useUpdateProgram();
  const deleteProgram = useDeleteProgram();
  const { data: hub, isLoading:hubLoading } = useHub(params.hubId);

  if (isLoading||hubLoading||hubsLoading||partnersLoading||programtypesLoading||zonesLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load programs" />;

  const columns = [
    { key: 'title', header: 'Title', render: (value: any, program: any) => (
      <Link
        href={`/hub/${params.hubId}/programs/${program.id}`}
        className="text-green-600 hover:text-green-900"
      >
        {value.en}
      </Link>
    ),},
    { key: 'ProgramType', header: 'ProgramType',render: (value: any) => value.name.en },
    {
      key: 'logo',
      header: 'Logo',
      render: (value: any) => value && (
        <img src={value.url} alt="Logo" className="h-8 w-8 rounded-full" />
      ),
    },
  ];

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Programs</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all programs including their title, type, and logo.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Add program
          </button>
        </div>
      </div>

      {programs?.length === 0 ? (
        <EmptyState
          title="No programs"
          description="Get started by creating a new program."
          buttonText="Add program"
          onClick={() => setIsCreateModalOpen(true)}
        />
      ) : (
        <DataTable
          columns={columns}
          data={filteredPrograms}
          onEdit={setEditingProgram}
          onDelete={setDeletingProgram}
        />
      )}

      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Program"
      >
        <ProgramForm
        zones={zones}
         hubs={hubs}
         partners={partners}
         programtypes={programtypes}
         siteId={hub.siteId}
          onSubmit={async (data) => {
            await createProgram.mutateAsync(data);
            setIsCreateModalOpen(false);
          }}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        open={!!editingProgram}
        onClose={() => setEditingProgram(null)}
        title="Edit Program"
      >
        <ProgramForm
        zones={zones}
         hubs={hubs}
         partners={partners}
         programtypes={programtypes}
         siteId={hub.siteId}
          initialData={editingProgram}
          onSubmit={async (data) => {
            await updateProgram.mutateAsync({ id: editingProgram.id, ...data });
            setEditingProgram(null);
          }}
          onCancel={() => setEditingProgram(null)}
        />
      </Modal>

      <DeleteConfirmation
        open={!!deletingProgram}
        onClose={() => setDeletingProgram(null)}
        onConfirm={async () => {
          await deleteProgram.mutateAsync(deletingProgram.id);
          setDeletingProgram(null);
        }}
        title="Delete Program"
        message="Are you sure you want to delete this program? This action cannot be undone."
      />
    </div>
  );
}