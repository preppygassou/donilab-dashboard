import { useState } from 'react';
import TextInput from './TextInput';
import Select from './Select';

interface Props {
  type: 'site' | 'hub';
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function PermissionForm({ type, initialData, onSubmit, onCancel }: Props) {
  const [email, setEmail] = useState(initialData?.email || '');
  const [access, setAccess] = useState(initialData?.access || true);
  const [entityId, setEntityId] = useState(initialData?.[`${type}Id`] || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      email,
      access,
      [`${type}Id`]: entityId,
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
      <TextInput
        label={`${type.charAt(0).toUpperCase() + type.slice(1)} ID`}
        value={entityId}
        onChange={setEntityId}
        required
      />
      <Select
        label="Access"
        value={access.toString()}
        onChange={(value) => setAccess(value === 'true')}
        options={[
          { value: 'true', label: 'Granted' },
          { value: 'false', label: 'Denied' },
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