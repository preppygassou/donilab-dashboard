import { useState } from 'react';
import TextInput from './TextInput';
import ImageUpload from './ImageUpload';
import Textarea from './Textarea';
import Select from './Select';
import { URL } from 'url';

interface Props {
  initialData?: any;
  sites?: any[];
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function HubForm({ initialData, sites = [], onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState({ 
    en: initialData?.title?.en || '', 
    fr: initialData?.title?.fr || '' 
  });
  const [description, setDescription] = useState({ 
    en: initialData?.description?.en || '', 
    fr: initialData?.description?.fr || '' 
  });
  const [logo, setLogo] = useState<URL | null>(initialData?.logo?.url||null);
  const [siteId, setSiteId] = useState(initialData?.siteId || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [address, setAddress] = useState(initialData?.address || '');
  const [city, setCity] = useState(initialData?.city || '');
  const [state, setState] = useState(initialData?.state || '');
  const [country, setCountry] = useState(initialData?.country || '');
  const [status, setStatus] = useState(initialData?.status || 'ACTIVE');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      title,
      description,
      logo: logo ? { url: logo } : {url:""},
      siteId,
      email,
      phone,
      address,
      city,
      state,
      country,
      status,
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Select
        label="Site"
        value={siteId}
        onChange={setSiteId}
        options={sites.map((site) => ({
          value: site.id,
          label: site.name.en,
        }))}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label="Title (English)"
          value={title.en}
          onChange={(value) => setTitle({ ...title, en: value })}
          required
        />
        <TextInput
          label="Title (French)"
          value={title.fr}
          onChange={(value) => setTitle({ ...title, fr: value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Textarea
          label="Description (English)"
          value={description.en}
          onChange={(value) => setDescription({ ...description, en: value })}
          required
        />
        <Textarea
          label="Description (French)"
          value={description.fr}
          onChange={(value) => setDescription({ ...description, fr: value })}
          required
        />
      </div>

      <ImageUpload
        label="Logo"
        onChange={setLogo}
        multilingual={false}
        preview={logo}
      />

      <TextInput
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        required
      />

      <TextInput
        label="Phone"
        value={phone}
        onChange={setPhone}
        required
      />

      <TextInput
        label="Address"
        value={address}
        onChange={setAddress}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label="City"
          value={city}
          onChange={setCity}
          required
        />
        <TextInput
          label="State/Province"
          value={state}
          onChange={setState}
          required
        />
      </div>

      <TextInput
        label="Country"
        value={country}
        onChange={setCountry}
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