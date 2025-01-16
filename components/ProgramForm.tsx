import { useState } from 'react';
import TextInput from './TextInput';
import Select from './Select';
import Textarea from './Textarea';
import ImageUpload from './ImageUpload';
import CustomSelect from './CustomSelect';
import { generateSlug } from '../utils/formatters';

interface Props {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  hubs?: any[];
  siteId:string;
  partners?: any[];
  programtypes?: any[];
  zones?: any[];
  editions?: any[];
}

export default function ProgramForm({ initialData, hubs=[],partners=[],zones=[],programtypes=[],editions=[], siteId,onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState({ 
    en: initialData?.title?.en || '', 
    fr: initialData?.title?.fr || '' 
  });
 
  const [duration, setDuration] = useState({ 
    en: initialData?.duration?.en || '', 
    fr: initialData?.duration?.fr || '' 
  });
 
  const [programTypeId, setProgramTypeId] = useState(initialData?.programTypeId || '');
  const [status, setStatus] = useState(initialData?.status || '');
  const [description, setDescription] = useState({ 
    en: initialData?.description?.en || '', 
    fr: initialData?.description?.fr || '' 
  });

  const [hubId, setHubId] = useState(initialData?.hubId || '');
  const [logo, setLogo] = useState({ 
    url:{
    en: initialData?.logo?.url?.en  || '', 
    fr: initialData?.logo?.url?.fr  || '' 
  }
  });
  
  const [selectedPartners, setSelectedPartners] = useState<string[]>(
    initialData?.partners?.map((p: any) => ({ value: p.id, label: p.name.en })) || []
  );
  const [selectedZones, setSelectedZones] = useState<string[]>(
    initialData?.zones?.map((z: any) => ({ value: z.id, label: z.name.en })) || []
  );

  const [selectedEditions, setSelectedEditions] = useState<string[]>(
    initialData?.editions?.map((z: any) => ({ value: z.id, label: z.name.en })) || []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      duration,
      slug: !initialData?.slug || initialData?.title?.en !== title.en || initialData?.title?.fr !== title.fr
      ? {
        en: generateSlug(title.en),
        fr: generateSlug(title.fr),
        }
      : initialData.slug,
      siteId:initialData?.siteId || siteId ,
      programTypeId,
      description,
      logo,
      hubId,
      status,
      partners: selectedPartners.map((p: any) => p.value),
      zones: selectedZones.map((z: any) => z.value),
      editions: selectedEditions.map((z: any) => z.value)
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
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label="Duration (English)"
          value={duration.en}
          onChange={(value) => setDuration({ ...duration, en: value })}
          required
        />
        <TextInput
          label="Duration (French)"
          value={duration.fr}
          onChange={(value) => setDuration({ ...duration, fr: value })}
          required
        />
      </div>
      <Select
        label="Type"
        value={programTypeId}
        onChange={setProgramTypeId}
        options={programtypes.map((type) => ({
          value: type.id,
          label: type.name.en,
        }))}
        required
      />
      <Select
        label="Select status"
        value={status}
        onChange={setStatus}
        options={[
          {
            label:'FINISHED',
            value:'FINISHED'
          },
          {
            label:'IN PROGRESS',
            value:'IN PROGRESS'
          },
          {
            label:'OPEN',
            value:'OPEN'
          },
          {
            label:'REOPEN',
            value:'REOPEN'
          },
          {
            label:'CLOSE',
            value:'CLOSE'
          },
          ]
        }
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
     <CustomSelect
        label="Editions"
        value={selectedEditions}
        onChange={(value) => setSelectedEditions(value)}
        options={editions.map((edition) => ({
          value: edition.id,
          label: edition.name.en,
        }))}
        multiple
      />
     <CustomSelect
        label="Zones"
        value={selectedZones}
        onChange={(value) => setSelectedZones(value)}
        options={zones.map((zone) => ({
          value: zone.id,
          label: zone.name.en,
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