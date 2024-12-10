import { useState } from 'react';
import TextInput from './TextInput';
import ImageUpload from './ImageUpload';
import Select from './Select';

interface Props {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
 
}

export default function PartnerForm({ initialData, onSubmit, onCancel }: Props) {
  const [name, setName] = useState({ 
    en: initialData?.name?.en || '', 
    fr: initialData?.name?.fr || '' 
  });
 
  const [logo, setLogo] = useState({ 
    url:{
    en: initialData?.logo?.url?.en  || '', 
    fr: initialData?.logo?.url?.fr  || '' 
  }
  });
  const [link, setLink] = useState(initialData?.link || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      name,
      logo,
      link,
      
    };
    if (logo) {
      formData.logo = logo;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
     
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label="Name (English)"
          value={name.en}
          onChange={(value) => setName({ ...name, en: value })}
          required
        />
        <TextInput
          label="Name (French)"
          value={name.fr}
          onChange={(value) => setName({ ...name, fr: value })}
          required
        />
      </div>

      <ImageUpload
        label="Logo"
        onChange={setLogo}
        preview={initialData?.logo}
        required
      />

      <TextInput
        label="Website Link"
        type="url"
        value={link}
        onChange={setLink}
        placeholder="https://example.com"
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