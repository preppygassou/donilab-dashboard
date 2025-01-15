import { useState } from 'react';
import TextInput from './TextInput';
import ImageUpload from './ImageUpload';
import Textarea from './Textarea';

interface Props {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function SiteForm({ initialData, onSubmit, onCancel }: Props) {
  const [name, setName] = useState({
    en: initialData?.name?.en || '',
    fr: initialData?.name?.fr || ''
  });
  const [description, setDescription] = useState({
    en: initialData?.description?.en || '',
    fr: initialData?.description?.fr || ''
  });
  const [slogan, setSlogan] = useState({
    en: initialData?.slogan?.en || '',
    fr: initialData?.slogan?.fr || ''
  });
  const [id, setId] = useState(initialData?.id || '');
  const [logo, setLogo] = useState<File | null>(initialData?.logo?.url || null);
  const [featured_media, setFeatured_media] = useState<File | null>(initialData?.featured_media?.url || null);
  const [email, setEmail] = useState(initialData?.email || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [address, setAddress] = useState(initialData?.address || '');
  const [city, setCity] = useState(initialData?.city || '');
  const [state, setState] = useState(initialData?.state || '');
  const [country, setCountry] = useState(initialData?.country || '');
  const [zipCode, setZipCode] = useState(initialData?.zipCode || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      name,
      description,
      slogan,
      logo: logo ? { url: logo } : null,
      featured_media: featured_media ? { url: featured_media } : null,
      id,
      zipCode,
      postalCode: zipCode,
      email,
      phone,
      address,
      city,
      state,
      country,
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ImageUpload
      siteId={id}
        label="Cover"
        onChange={setFeatured_media}
        multilingual={false}
        preview={featured_media}
      />

      <div className="grid grid-cols-2 gap-4">
        <ImageUpload
        siteId={id}
          label="Logo"
          onChange={setLogo}
          multilingual={false}
          preview={logo}
        />

      </div>


      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label="Site id"
          value={id}
          onChange={setId}
          required
        />
      </div>
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
          required
        />
        <Textarea
          label="Description (French)"
          value={description.fr}
          onChange={(value) => setDescription({ ...description, fr: value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label="Slogan (English)"
          value={slogan.en}
          onChange={(value) => setSlogan({ ...slogan, en: value })}
          required
        />
        <TextInput
          label="Slogan (French)"
          value={slogan.fr}
          onChange={(value) => setSlogan({ ...slogan, fr: value })}
          required
        />
      </div>


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
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label="Address"
          value={address}
          onChange={setAddress}
          required
        />
        <TextInput
          label="zipCode"
          value={zipCode}
          onChange={setZipCode}
          required
        />
      </div>
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