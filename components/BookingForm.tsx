import { useState } from 'react';
import TextInput from './TextInput';
import Select from './Select';

interface Props {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function BookingForm({ initialData, onSubmit, onCancel }: Props) {
  const [eventId, setEventId] = useState(initialData?.eventId || '');
  const [userId, setUserId] = useState(initialData?.userId || '');
  const [totalAmount, setTotalAmount] = useState(initialData?.totalAmount || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      eventId,
      userId,
      totalAmount,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <TextInput
        label="Event ID"
        value={eventId}
        onChange={setEventId}
        required
      />
      <TextInput
        label="User ID"
        value={userId}
        onChange={setUserId}
        required
      />
      <TextInput
        label="Total Amount"
        type="number"
        value={totalAmount}
        onChange={setTotalAmount}
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