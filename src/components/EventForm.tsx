import { useState } from 'react';
import TextInput from './TextInput';
import ImageUpload from './ImageUpload';
import Select from './Select';
import Textarea from './Textarea';
import CustomSelect from './CustomSelect';

interface Props {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  categories?: any[];
  hubs?: any[];
  siteId:string;
}

export default function EventForm({ initialData,categories=[],hubs=[], siteId,onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState({ 
    en: initialData?.title?.en || '', 
    fr: initialData?.title?.fr || '' 
  });
  const [hubId, setHubId] = useState(initialData?.hubId || '');
  const [description, setDescription] = useState({ 
    en: initialData?.description?.en || '', 
    fr: initialData?.description?.fr || '' 
  });
  const [location, setLocation] = useState(initialData?.location || '');
  const [price, setPrice] = useState(initialData?.price || '');
  const [isFree, setIsFree] = useState(initialData?.isFree || false);
  const [startDateTime, setStartDateTime] = useState(
    initialData?.startDateTime ? new Date(initialData.startDateTime).toISOString().slice(0, 16) : ''
  );
  const [endDateTime, setEndDateTime] = useState(
    initialData?.endDateTime ? new Date(initialData.endDateTime).toISOString().slice(0, 16) : ''
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialData?.categories?.map((c: any) => ({ value: c.id, label: c.name.en })) || []
  );
  const [featuredMedia, setFeaturedMedia] = useState({ 
    url:{
    en: initialData?.featured_media?.url?.en  || '', 
    fr: initialData?.featured_media?.url?.fr  || '' 
  }
  });
  const [url, setUrl] = useState(initialData?.url || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      siteId:initialData?.siteId || siteId ,
      title,
      description,
      location,
      price,
      isFree,
      startDateTime: new Date(startDateTime).toISOString(),
      endDateTime: new Date(endDateTime).toISOString(),
      hubId,
      categories: selectedCategories
      .map((c: any) => c.value),
      url,
    };
    if (featuredMedia) {
      data.featured_media = featuredMedia;
    }
    onSubmit(data);
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
      <CustomSelect
        label="Categories"
        value={selectedCategories}
        onChange={(value) => setSelectedCategories(value)}
        options={categories.map((category) => ({
          value: category.id,
          label: category.name.en,
        }))}
        multiple
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

      <TextInput
        label="Location"
        value={location}
        onChange={setLocation}
        required
      />

      <div className="flex gap-4">
        <TextInput
          label="Start Date & Time"
          type="datetime-local"
          value={startDateTime}
          onChange={setStartDateTime}
          required
        />
        <TextInput
          label="End Date & Time"
          type="datetime-local"
          value={endDateTime}
          onChange={setEndDateTime}
          required
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <TextInput
            label="Price"
            type="number"
            value={price}
            onChange={setPrice}
            disabled={isFree}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isFree"
            checked={isFree}
            onChange={(e) => setIsFree(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-indigo-600"
          />
          <label htmlFor="isFree" className="text-sm font-medium text-gray-900">
            Free Event
          </label>
        </div>
      </div>

      <ImageUpload
        label="Featured Media"
        onChange={setFeaturedMedia}
        preview={initialData?.featured_media}
      />

      <TextInput
        label="URL"
        type="url"
        value={url}
        onChange={setUrl}
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