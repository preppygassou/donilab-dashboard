import { useState } from 'react';
import TextInput from './TextInput';
import Select from './Select';
import Textarea from './Textarea';
import ImageUpload from './ImageUpload';
import CustomSelect from './CustomSelect';
import { generateSlug } from '@/utils/formatters';

interface Props {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  hubs?: any[];
  siteId:string;
  partners?: any[];
}

export default function ProgramForm({ initialData, hubs=[],partners=[], siteId,onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState({ 
    en: initialData?.title?.en || '', 
    fr: initialData?.title?.fr || '' 
  });
 
  const [type, setType] = useState(initialData?.type || '');
  const [description, setDescription] = useState({ 
    en: initialData?.description?.en || '', 
    fr: initialData?.description?.fr || '' 
  });

  const [hubId, setHubId] = useState(initialData?.hubId || '');
  const [logo, setLogo] = useState({ 
    en: initialData?.logo?.en || '', 
    fr: initialData?.logo?.fr || '' 
  });
  const [selectedPartners, setSelectedPartners] = useState<string[]>(
    initialData?.parnters?.map((p: any) => ({ value: p.id, label: p.name.en })) || []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      slug: !initialData?.slug || initialData?.title?.en !== title.en || initialData?.title?.fr !== title.fr
      ? {
        en: generateSlug(title.en),
        fr: generateSlug(title.fr),
        }
      : initialData.slug,
      siteId:initialData?.siteId || siteId ,
      type,
      description,
      logo,
      hubId,
      partners: selectedPartners.map((p: any) => p.value)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
       <ImageUpload
        label="Logo"
        onChange={setLogo}
        preview={initialData?.logo}
        required
      />
       <Select
        label="Hub"
        value={hubId}
        onChange={setHubId}
        options={hubs.map((hub) => ({
          value: hub.id,
          label: hub.title.en,
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
      <Select
        label="Type"
        value={type}
        onChange={setType}
        options={[
          { value: 'bydonilab', label: 'By Donilab' },
          { value: 'inpartner', label: 'In Partner' },
        ]}
        required
      />
      
      <div className="grid grid-cols-2 gap-4">
        <Textarea
          label="Description (English)"
          value={description.en}
          onChange={(value) => setDescription({ ...description, en: value })}
          required
          rows={8}
        />
        <Textarea
          label="Description (French)"
          value={description.fr}
          onChange={(value) => setDescription({ ...description, fr: value })}
          required
          rows={8}
        />
      </div>
     <CustomSelect
        label="Partners"
        value={selectedPartners}
        onChange={(value) => setSelectedPartners(value)}
        options={partners.map((parnter) => ({
          value: parnter.id,
          label: parnter.name.en,
        }))}
        multiple
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