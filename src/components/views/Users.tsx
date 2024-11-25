"use client"
import { useState } from 'react';
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from '../../hooks/useUsers';
import Modal from '../Modal';
import UserForm from '../UserForm';
import DeleteConfirmation from '../DeleteConfirmation';
import LoadingSpinner from '../LoadingSpinner';
import ErrorAlert from '../ErrorAlert';
import EmptyState from '../EmptyState';
import DataTable from '../DataTable';
import Badge from '../Badge';

 const Users =() =>{
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [deletingUser, setDeletingUser] = useState<any>(null);

  const { data: users, isLoading, error } = useUsers();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load users" />;

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' },
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
          <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all users including their name, email, role, and status.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Add user
          </button>
        </div>
      </div>

      {users?.length === 0 ? (
        <EmptyState
          title="No users"
          description="Get started by creating a new user."
          buttonText="Add user"
          onClick={() => setIsCreateModalOpen(true)}
        />
      ) : (
        <DataTable
          columns={columns}
          data={users}
          onEdit={setEditingUser}
          onDelete={setDeletingUser}
        />
      )}

      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create User"
      >
        <UserForm
          onSubmit={async (data) => {
            await createUser.mutateAsync(data);
            setIsCreateModalOpen(false);
          }}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        open={!!editingUser}
        onClose={() => setEditingUser(null)}
        title="Edit User"
      >
        <UserForm
          initialData={editingUser}
          onSubmit={async (data) => {
            await updateUser.mutateAsync({ id: editingUser.id, ...data });
            setEditingUser(null);
          }}
          onCancel={() => setEditingUser(null)}
        />
      </Modal>

      <DeleteConfirmation
        open={!!deletingUser}
        onClose={() => setDeletingUser(null)}
        onConfirm={async () => {
          await deleteUser.mutateAsync(deletingUser.id);
          setDeletingUser(null);
        }}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
      />
    </div>
  );
}

export default Users