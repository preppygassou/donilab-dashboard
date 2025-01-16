import { useState } from 'react';
import TextInput from './TextInput';
import Textarea from './Textarea';
import Select from './Select';

interface Props {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function CommentForm({ initialData, onSubmit, onCancel }: Props) {
  const [content, setContent] = useState(initialData?.content?.en || '');
  const [authorName, setAuthorName] = useState(initialData?.author_name || '');
  const [authorEmail, setAuthorEmail] = useState(initialData?.author_email || '');
  const [authorUrl, setAuthorUrl] = useState(initialData?.author_url || '');
  const [status, setStatus] = useState(initialData?.status || 'approved');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      content: { en: content },
      author_name: authorName,
      author_email: authorEmail,
      author_url: authorUrl,
      status,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Textarea
        label="Content"
        value={content}
        onChange={setContent}
        required
        rows={4}
      />
      <TextInput
        label="Author Name"
        value={authorName}
        onChange={setAuthorName}
        required
      />
      <TextInput
        label="Author Email"
        type="email"
        value={authorEmail}
        onChange={setAuthorEmail}
        required
      />
      <TextInput
        label="Author Website"
        type="url"
        value={authorUrl}
        onChange={setAuthorUrl}
        placeholder="https://example.com"
      />
      <Select
        label="Status"
        value={status}
        onChange={setStatus}
        options={[
          { value: 'approved', label: 'Approved' },
          { value: 'pending', label: 'Pending' },
          { value: 'spam', label: 'Spam' },
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