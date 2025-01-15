import { useState } from 'react';
import TextInput from './TextInput';
import ImageUpload from './ImageUpload';
import Select from './Select';
import Textarea from './Textarea';

interface Props {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  hubs?: any[];
  siteId:string;
}

export default function CompanyForm({ initialData,hubs, onSubmit, onCancel,siteId }: Props) {
  const [name, setName] = useState(initialData?.name || '');
  const [logo, setLogo] = useState(initialData?.logo?.url || '');
  const [url, setUrl] = useState(initialData?.url || '');
  const [summary, setSummary] = useState(initialData?.summary || '');
  const [hubId, setHubId] = useState(initialData?.hubId || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      siteId:initialData?.siteId || siteId ,
      name,
      logo,
      url,
      hubId,
      summary
    };
    if (logo) {
      formData.logo = logo;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
      <ImageUpload
        label="Logo"
        onChange={setLogo}
        preview={initialData?.logo}
        required
        multilingual={false}
      />
        
      </div>
      <Select
                label="Hub"
                value={hubId}
                onChange={setHubId}
                options={hubs?.map((hub) => ({
                  value: hub.id,
                  label: hub.title.en,
                }))||[]}
                /* required */
              />
      
      <TextInput
          label="Name"
          value={name}
          onChange={(value) => setName(value)}
          required
        />
     

      <Textarea
        label="Summary"
        value={summary}
        onChange={setSummary}
        placeholder="Description"
      />
      <TextInput
        label="Website Site"
        type="url"
        value={url}
        onChange={setUrl}
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