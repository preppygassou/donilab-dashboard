import { useState } from 'react';
import TextInput from './TextInput';
import ImageUpload from './ImageUpload';

interface Props {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  siteId:string;
}

export default function ReportForm({ initialData,siteId, onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState({ 
    en: initialData?.title?.en || '', 
    fr: initialData?.title?.fr || '' 
  });
 
  const [featuredMedia, setFeaturedMedia] = useState({ 
    url:{
      en: initialData?.featured_media?.url?.en  || '', 
      fr: initialData?.featured_media?.url?.fr  || '' 
    }
  });
  const [year, setYear] = useState(initialData?.year || '');
  const [url, setUrl] = useState(initialData?.url || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      siteId,
      title,
      featured_media: featuredMedia,
      year: year,
      url: url
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <ImageUpload
        label="Featured Media"
        onChange={setFeaturedMedia}
        preview={initialData?.featured_media}
      />
      <TextInput
        label="Year"
        value={year}
        onChange={setYear}
        required
      />
      <TextInput
        label="URL"
        type="url"
        value={url}
        onChange={setUrl}
        placeholder="https://example.com/report.pdf"
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