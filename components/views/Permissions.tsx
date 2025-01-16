"use client"
import { useState } from 'react';
import { useSitePermissions, useHubPermissions, useCreatePermission, useUpdatePermission, useDeletePermission } from '../../hooks/usePermissions';
import Modal from '../Modal';
import PermissionForm from '../PermissionForm';
import DeleteConfirmation from '../DeleteConfirmation';
import LoadingSpinner from '../LoadingSpinner';
import ErrorAlert from '../ErrorAlert';
import EmptyState from '../EmptyState';
import DataTable from '../DataTable';
import Badge from '../Badge';
import { Tab } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Permissions() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPermission, setEditingPermission] = useState<any>(null);
  const [deletingPermission, setDeletingPermission] = useState<any>(null);

  const { data: sitePermissions, isLoading: siteLoading, error: siteError } = useSitePermissions();
  const { data: hubPermissions, isLoading: hubLoading, error: hubError } = useHubPermissions();

  const createSitePermission = useCreatePermission('site');
  const updateSitePermission = useUpdatePermission('site');
  const deleteSitePermission = useDeletePermission('site');

  const createHubPermission = useCreatePermission('hub');
  const updateHubPermission = useUpdatePermission('hub');
  const deleteHubPermission = useDeletePermission('hub');

  if (siteLoading || hubLoading) return <LoadingSpinner />;
  if (siteError || hubError) return <ErrorAlert message="Failed to load permissions" />;

  const columns = [
    { key: 'email', header: 'Email' },
    {
      key: 'access',
      header: 'Access',
      render: (value: boolean) => (
        <Badge color={value ? 'green' : 'red'}>
          {value ? 'Granted' : 'Denied'}
        </Badge>
      ),
    },
    {
      key: selectedTab === 0 ? 'site' : 'hub',
      header: selectedTab === 0 ? 'Site' : 'Hub',
      render: (value: any) => value?.name?.en || value?.title?.en,
    },
  ];

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Permissions</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage access permissions for sites and hubs.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Add permission
          </button>
        </div>
      </div>

      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="mt-4 flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white text-blue-700 shadow'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
              )
            }
          >
            Site Permissions
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white text-blue-700 shadow'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
              )
            }
          >
            Hub Permissions
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-4">
          <Tab.Panel>
            {sitePermissions?.length === 0 ? (
              <EmptyState
                title="No site permissions"
                description="Get started by adding a new site permission."
                buttonText="Add permission"
                onClick={() => setIsCreateModalOpen(true)}
              />
            ) : (
              <DataTable
                columns={columns}
                data={sitePermissions}
                onEdit={setEditingPermission}
                onDelete={setDeletingPermission}
              />
            )}
          </Tab.Panel>
          <Tab.Panel>
            {hubPermissions?.length === 0 ? (
              <EmptyState
                title="No hub permissions"
                description="Get started by adding a new hub permission."
                buttonText="Add permission"
                onClick={() => setIsCreateModalOpen(true)}
              />
            ) : (
              <DataTable
                columns={columns}
                data={hubPermissions}
                onEdit={setEditingPermission}
                onDelete={setDeletingPermission}
              />
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title={`Create ${selectedTab === 0 ? 'Site' : 'Hub'} Permission`}
      >
        <PermissionForm
          type={selectedTab === 0 ? 'site' : 'hub'}
          onSubmit={async (data) => {
            if (selectedTab === 0) {
              await createSitePermission.mutateAsync(data);
            } else {
              await createHubPermission.mutateAsync(data);
            }
            setIsCreateModalOpen(false);
          }}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        open={!!editingPermission}
        onClose={() => setEditingPermission(null)}
        title={`Edit ${selectedTab === 0 ? 'Site' : 'Hub'} Permission`}
      >
        <PermissionForm
          type={selectedTab === 0 ? 'site' : 'hub'}
          initialData={editingPermission}
          onSubmit={async (data) => {
            if (selectedTab === 0) {
              await updateSitePermission.mutateAsync({ id: editingPermission.id, ...data });
            } else {
              await updateHubPermission.mutateAsync({ id: editingPermission.id, ...data });
            }
            setEditingPermission(null);
          }}
          onCancel={() => setEditingPermission(null)}
        />
      </Modal>

      <DeleteConfirmation
        open={!!deletingPermission}
        onClose={() => setDeletingPermission(null)}
        onConfirm={async () => {
          if (selectedTab === 0) {
            await deleteSitePermission.mutateAsync(deletingPermission.id);
          } else {
            await deleteHubPermission.mutateAsync(deletingPermission.id);
          }
          setDeletingPermission(null);
        }}
        title="Delete Permission"
        message="Are you sure you want to delete this permission? This action cannot be undone."
      />
    </div>
  );
}