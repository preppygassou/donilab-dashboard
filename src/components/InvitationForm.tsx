import { useState } from 'react';
import TextInput from './TextInput';
import Select from './Select';

interface Props {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function InvitationForm({ initialData, onSubmit, onCancel }: Props) {
  const [email, setEmail] = useState(initialData?.email || '');
  const [role, setRole] = useState(initialData?.role || 'HUB_USER');
  const [status, setStatus] = useState(initialData?.status || 'PENDING');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      email,
      role,
      status,
      siteId: initialData?.siteId,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <TextInput
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        required
      />
      <Select
        label="Role"
        value={role}
        onChange={setRole}
        options={[
          { value: 'HUB_USER', label: 'Hub User' },
          { value: 'HUB_MANAGER', label: 'Hub Manager' },
          { value: 'HUB_MODERATOR', label: 'Hub Moderator' },
          { value: 'HUB_EDITOR', label: 'Hub Editor' },
        ]}
        required
      />
      <Select
        label="Status"
        value={status}
        onChange={setStatus}
        options={[
          { value: 'PENDING', label: 'Pending' },
          { value: 'ACCEPTED', label: 'Accepted' },
          { value: 'REVOKED', label: 'Revoked' },
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