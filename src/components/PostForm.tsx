import { useState } from 'react';
import TextInput from './TextInput';
import ImageUpload from './ImageUpload';
import Textarea from './Textarea';
import Select from './Select';
import CustomSelect from './CustomSelect';
import { useCurrentUser } from '@/hooks/use-current-user';

interface Props {
  initialData?: any;
  categories?: any[];
  tags?: any[];
  siteId:string;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const generateSlug = (title: string) => {
  const randomId = Math.random().toString(36).substr(2, 9);
  return `${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')}-${randomId}`;
};

export default function PostForm({ initialData, categories = [], tags = [],siteId, onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState({ 
    en: initialData?.title?.en || '', 
    fr: initialData?.title?.fr || '' 
  });
 
  const [content, setContent] = useState({ 
    en: initialData?.content?.en || '', 
    fr: initialData?.content?.fr || '' 
  });
  const [excerpt, setExcerpt] = useState({ 
    en: initialData?.excerpt?.en || '', 
    fr: initialData?.excerpt?.fr || '' 
  });
  const [featuredMedia, setFeaturedMedia] = useState({ 
    url:{
    en: initialData?.featured_media?.url?.en  || '', 
    fr: initialData?.featured_media?.url?.fr  || '' 
  }
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialData?.categories?.map((c: any) => ({ value: c.id, label: c.name.en })) || []
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    initialData?.tags?.map((t: any) => ({ value: t.id, label: t.name.en })) || []
  );
  const [status, setStatus] = useState(initialData?.status || 'draft');
 
  const user = useCurrentUser();


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      siteId,
      title,
      slug: !initialData?.slug || initialData?.title?.en !== title.en || initialData?.title?.fr !== title.fr
      ? {
        en: generateSlug(title.en),
        fr: generateSlug(title.fr),
        }
      : initialData.slug,
      content,
      excerpt,
      featured_media: featuredMedia,
      categories: selectedCategories
      .map((c: any) => c.value),
      tags:selectedTags
      .map((t: any) => t.value),
      status,
      authorId: user?.id || "571ac7c2-efeb-4c53-b1f8-37c0033963c5",
    };
    onSubmit(data);
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

      <div className="grid grid-cols-2 gap-4">
        <Textarea
          label="Content (English)"
          value={content.en}
          onChange={(value) => setContent({ ...content, en: value })}
          required
          rows={8}
        />
        <Textarea
          label="Content (French)"
          value={content.fr}
          onChange={(value) => setContent({ ...content, fr: value })}
          required
          rows={8}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Textarea
          label="Excerpt (English)"
          value={excerpt.en}
          onChange={(value) => setExcerpt({ ...excerpt, en: value })}
          rows={3}
        />
        <Textarea
          label="Excerpt (French)"
          value={excerpt.fr}
          onChange={(value) => setExcerpt({ ...excerpt, fr: value })}
          rows={3}
        />
      </div>

      <ImageUpload
      siteId={siteId}
        label="Featured Media"
        onChange={setFeaturedMedia}
        preview={initialData?.featured_media}
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

      <CustomSelect
        label="Tags"
        value={selectedTags}
        onChange={(value) => setSelectedTags(Array.isArray(value) ? value : [value])}
        options={tags.map((tag) => ({
          value: tag.id,
          label: tag.name.en,
        }))}
        multiple
      />

      <Select
        label="Status"
        value={status}
        onChange={setStatus}
        options={[
          { value: 'draft', label: 'Draft' },
          { value: 'publish', label: 'Publish' },
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