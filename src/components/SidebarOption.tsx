import { useState } from 'react';
import TextInput from './TextInput';
import Select from './Select';

interface Props {
  initialData?: any;
  type: 'site' | 'hub';
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function SidebarOption({ initialData, type, onSubmit, onCancel }: Props) {
  const [name, setName] = useState(initialData?.name || '');
  const [link, setLink] = useState(initialData?.link || '');
  const [icon, setIcon] = useState(initialData?.icon || 'INFO');
  const [status, setStatus] = useState(initialData?.status || 'ACTIVE');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      link,
      icon,
      status,
      [`${type}Id`]: initialData?.[`${type}Id`],
    });
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
        label="Link"
        value={link}
        onChange={setLink}
        required
      />
      <Select
        label="Icon"
        value={icon}
        onChange={setIcon}
        options={[
          { value: 'INFO', label: 'Info' },
          { value: 'SETTINGS', label: 'Settings' },
          { value: 'HOME', label: 'Home' },
          // Add more icon options as needed
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