import { useState } from 'react';
import TextInput from './TextInput';
import Textarea from './Textarea';
import Select from './Select';

interface Props {
  initialData?: any;
  tags?: any[];
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function TagForm({ initialData,tags=[], onSubmit, onCancel }: Props) {
  const [name, setName] = useState({ 
    en: initialData?.name?.en || '', 
    fr: initialData?.name?.fr || '' 
  });
  const [parent, setParent] = useState(initialData?.parent || null);
  const [description, setDescription] = useState({ 
    en: initialData?.description?.en || '', 
    fr: initialData?.description?.fr || '' 
  });
  const [slug, setSlug] = useState({ 
    en: initialData?.slug?.en || '', 
    fr: initialData?.slug?.fr || '' 
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      parent,
      description,
      slug
    });
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

      <div className="grid grid-cols-2 gap-4">
        <Textarea
          label="Description (English)"
          value={description.en}
          onChange={(value) => setDescription({ ...description, en: value })}
        />
        <Textarea
          label="Description (French)"
          value={description.fr}
          onChange={(value) => setDescription({ ...description, fr: value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label="Slug (English)"
          value={slug.en}
          onChange={(value) => setSlug({ ...slug, en: value })}
        />
        <TextInput
          label="Slug (French)"
          value={slug.fr}
          onChange={(value) => setSlug({ ...slug, fr: value })}
        />
      </div>
      <Select
        label="Parent"
        value={parent}
        onChange={setParent}
        options={tags.map((parent) => ({
          value: parent.id,
          label: parent.name.en,
        }))}
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