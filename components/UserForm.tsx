import { useState } from 'react';
import TextInput from './TextInput';
import Select from './Select';

interface Props {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function UserForm({ initialData, onSubmit, onCancel }: Props) {
  const [name, setName] = useState(initialData?.name || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(initialData?.role || 'USER');
  const [status, setStatus] = useState(initialData?.status || 'ACTIVE');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: any = { name, email, role, status };
    if (password) {
      data.password = password;
    }
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <TextInput
        label="Name"
        value={name}
        onChange={setName}
        required
      />
      <TextInput
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        required
      />
      {!initialData && (
        <TextInput
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          required
        />
      )}
      <Select
        label="Role"
        value={role}
        onChange={setRole}
        options={[
          { value: 'USER', label: 'User' },
          { value: 'SUPER_ADMIN', label: 'SUPER ADMIN' },
          { value: 'ADMIN', label: 'Admin' },
          { value: 'EDITOR', label: 'Editor' },
          { value: 'SITE_ADMIN', label: 'Site Admin' },
          { value: 'HUB_MANAGER', label: 'Hub Manager' },
        ]}
        required
      />
      <Select
        label="Status"
        value={status}
        onChange={setStatus}
        options={[
          { value: 'ACTIVE', label: 'Active' },
          { value: 'INACTIVE', label: 'Inactive' },
        ]}
        required
      />
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}