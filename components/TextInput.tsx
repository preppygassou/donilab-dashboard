interface Props {
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export default function TextInput({
  label,
  type = 'text',
  value,
  onChange,
  error,
  required,
  disabled,
  placeholder,
}: Props) {
  return (
    <div>
      <label htmlFor={label} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-2">
        <input
          type={type}
          name={label}
          id={label}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}