interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function Select({
  label,
  value,
  onChange,
  options,
  error,
  required,
  disabled,
}: Props) {
  return (
    <div>
      <label htmlFor={label} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={label}
        name={label}
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}