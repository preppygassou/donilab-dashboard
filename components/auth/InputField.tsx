interface InputFieldProps {
  id: string;
  type: string;
  placeholder: string;
  error?: string;
}

export const InputField = ({ id, type, placeholder, error, ...rest }: InputFieldProps & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="space-y-2">
    <label htmlFor={id} className="sr-only">
      {placeholder}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      autoComplete={id}
      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      placeholder={placeholder}
      {...rest}
    />
    {/* {error && <p className="text-sm text-red-600">{error}</p>} */}
  </div>
);
