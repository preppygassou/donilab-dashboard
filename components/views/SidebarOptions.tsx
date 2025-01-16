import { useState } from 'react';
import { useSiteSidebarOptions, useHubSidebarOptions, useCreateSidebarOption, useUpdateSidebarOption, useDeleteSidebarOption } from '../../hooks/useSidebarOptions';
import Modal from '../Modal';
import SidebarOption from '../SidebarOption';
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

export default function SidebarOptions() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingOption, setEditingOption] = useState<any>(null);
  const [deletingOption, setDeletingOption] = useState<any>(null);

  const { data: siteOptions, isLoading: siteLoading, error: siteError } = useSiteSidebarOptions();
  const { data: hubOptions, isLoading: hubLoading, error: hubError } = useHubSidebarOptions();

  const createSiteOption = useCreateSidebarOption('site');
  const updateSiteOption = useUpdateSidebarOption('site');
  const deleteSiteOption = useDeleteSidebarOption('site');

  const createHubOption = useCreateSidebarOption('hub');
  const updateHubOption = useUpdateSidebarOption('hub');
  const deleteHubOption = useDeleteSidebarOption('hub');

  if (siteLoading || hubLoading) return <LoadingSpinner />;
  if (siteError || hubError) return <ErrorAlert message="Failed to load sidebar options" />;

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'link', header: 'Link' },
    { key: 'icon', header: 'Icon' },
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
          <h1 className="text-base font-semibold leading-6 text-gray-900">Sidebar Options</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage navigation options for sites and hubs.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Add option
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
            Site Options
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
            Hub Options
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-4">
          <Tab.Panel>
            {siteOptions?.length === 0 ? (
              <EmptyState
                title="No site options"
                description="Get started by adding a new site option."
                buttonText="Add option"
                onClick={() => setIsCreateModalOpen(true)}
              />
            ) : (
              <DataTable
                columns={columns}
                data={siteOptions}
                onEdit={setEditingOption}
                onDelete={setDeletingOption}
              />
            )}
          </Tab.Panel>
          <Tab.Panel>
            {hubOptions?.length === 0 ? (
              <EmptyState
                title="No hub options"
                description="Get started by adding a new hub option."
                buttonText="Add option"
                onClick={() => setIsCreateModalOpen(true)}
              />
            ) : (
              <DataTable
                columns={columns}
                data={hubOptions}
                onEdit={setEditingOption}
                onDelete={setDeletingOption}
              />
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title={`Create ${selectedTab === 0 ? 'Site' : 'Hub'} Option`}
      >
        <SidebarOption
          type={selectedTab === 0 ? 'site' : 'hub'}
          onSubmit={async (data) => {
            if (selectedTab === 0) {
              await createSiteOption.mutateAsync(data);
            } else {
              await createHubOption.mutateAsync(data);
            }
            setIsCreateModalOpen(false);
          }}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        open={!!editingOption}
        onClose={() => setEditingOption(null)}
        title={`Edit ${selectedTab === 0 ? 'Site' : 'Hub'} Option`}
      >
        <SidebarOption
          type={selectedTab === 0 ? 'site' : 'hub'}
          initialData={editingOption}
          onSubmit={async (data) => {
            if (selectedTab === 0) {
              await updateSiteOption.mutateAsync({ id: editingOption.id, ...data });
            } else {
              await updateHubOption.mutateAsync({ id: editingOption.id, ...data });
            }
            setEditingOption(null);
          }}
          onCancel={() => setEditingOption(null)}
        />
      </Modal>

      <DeleteConfirmation
        open={!!deletingOption}
        onClose={() => setDeletingOption(null)}
        onConfirm={async () => {
          if (selectedTab === 0) {
            await deleteSiteOption.mutateAsync(deletingOption.id);
          } else {
            await deleteHubOption.mutateAsync(deletingOption.id);
          }
          setDeletingOption(null);
        }}
        title="Delete Option"
        message="Are you sure you want to delete this sidebar option? This action cannot be undone."
      />
    </div>
  );
}