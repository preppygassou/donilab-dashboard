import Select from 'react-select'
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
  multiple?: boolean;
  disabled?: boolean;
  isSearchable?: boolean;
}

export default function CustomSelect({
  label,
  value,
  onChange,
  options,
  error,
  required,
  multiple = false,
  isSearchable = false,
  disabled,
}: Props) {
  return (
    <div>
      <label htmlFor={label} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <Select
        id={label}
        name={label}
        value={value}
        onChange={onChange}
        options={options}
        isMulti={multiple}
        isSearchable={isSearchable}
        isDisabled={disabled}
        placeholder="Sélectionnez"
      />
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}