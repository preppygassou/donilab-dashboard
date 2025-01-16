import { useState } from 'react';
import TextInput from './TextInput';
import ImageUpload from './ImageUpload';
import Select from './Select';

interface Props {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  hubs?: any[];
  users?: any[];
  siteId:string;
}

export default function TeamForm({ initialData,hubs=[],users=[], siteId, onSubmit, onCancel }: Props) {
  const [name, setName] = useState(initialData?.name || '');
  const [profile, setProfile] = useState(initialData?.profile || '');
  const [poste, setPoste] = useState({
    en: initialData?.poste?.en || '', 
    fr: initialData?.poste?.fr || '' 
  });
  const [userId, setUserId] = useState(initialData?.userId || '');
  const [hubId, setHubId] = useState(initialData?.hubId || '');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      siteId:initialData?.siteId || siteId ,
      name,
      profile: profile ?profile :  { url: "" },
      poste,
      userId,
      hubId,
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
      <TextInput
        label="Name"
        value={name}
        onChange={setName}
        required
      />
      <ImageUpload
        label="Profile Picture"
        onChange={setProfile}
        preview={initialData?.profile}
        multilingual={false}
      />
     
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label="Position (English)"
          value={poste.en}
          onChange={(value) => setPoste({ ...poste, en: value })}
          required
        />
        <TextInput
          label="Position (French)"
          value={poste.fr}
          onChange={(value) => setPoste({ ...poste, fr: value })}
          required
        />
      </div>
      <Select
        label="User"
        value={userId}
        onChange={setUserId}
        options={users.map((user) => ({
          value: user.id,
          label: user.name,
        }))}
        required
      />
     {/*  <TextInput
        label="User ID"
        value={userId}
        onChange={setUserId}
        required
      /> */}
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