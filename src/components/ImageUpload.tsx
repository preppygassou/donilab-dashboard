import { useRef, useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

interface Props {
  label: string;
  onChange: (files: { en?: File; fr?: File }) => void;
  error?: string;
  required?: boolean;
  preview?: {
    en?: string;
    fr?: string;
  };
  multilingual?: boolean;
}

export default function ImageUpload({ 
  label, 
  onChange, 
  error, 
  required, 
  preview,
  multilingual = true 
}: Props) {
  const fileInputRefEn = useRef<HTMLInputElement>(null);
  const fileInputRefFr = useRef<HTMLInputElement>(null);
  const [previewUrls, setPreviewUrls] = useState(preview || {});
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = (lang: 'en' | 'fr') => async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      setLoading(true);
      setUploadError(null);
      try {
        const response = await axios.post<{ filePath: string }>('https://upload.donilab.ml/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const url = `https://upload.donilab.ml${response.data.filePath}`;
        if (multilingual) {
          setPreviewUrls(prev => ({
            ...prev,
            [lang]: url
          }));
          onChange({ ...previewUrls, [lang]: url });
        } else {
          setPreviewUrls(url);
          onChange(url);
        }
      } catch (error) {
        setUploadError('Error uploading file');
        console.error('Error uploading file:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {multilingual ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">English</label>
              <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  {previewUrls.en ? (
                    <img src={previewUrls.en} alt="Preview (EN)" className="mx-auto h-32 w-32 object-cover" />
                  ) : (
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  )}
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload-en"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-green-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload-en"
                        name="featured_media_en"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleFileChange('en')}
                        ref={fileInputRefEn}
                      />
                    </label>
                  </div>
                  {loading && <p>Loading...</p>}
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">French</label>
              <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  {previewUrls.fr ? (
                    <img src={previewUrls.fr} alt="Preview (FR)" className="mx-auto h-32 w-32 object-cover" />
                  ) : (
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  )}
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload-fr"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-green-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload-fr"
                        name="featured_media_fr"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleFileChange('fr')}
                        ref={fileInputRefFr}
                      />
                    </label>
                  </div>
                  {loading && <p>Loading...</p>}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="col-span-2">
            <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                {previewUrls ? (
                  <img src={previewUrls} alt="Preview" className="mx-auto h-32 w-32 object-cover" />
                ) : (
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                )}
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-green-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="featured_media"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleFileChange('en')}
                      ref={fileInputRefEn}
                    />
                  </label>
                </div>
                {loading && <p>Loading...</p>}
              </div>
            </div>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
      {uploadError && (
        <p className="mt-2 text-sm text-red-600">{uploadError}</p>
      )}
    </div>
  );
}