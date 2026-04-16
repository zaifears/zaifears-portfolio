interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
}

export default function FormSelect({
  label,
  options,
  error,
  className = '',
  ...props
}: FormSelectProps) {
  return (
    <div className='flex flex-col gap-2'>
      <label className='text-sm font-medium text-gray-300'>{label}</label>
      <select
        {...props}
        className={`w-full bg-gray-800 border rounded px-4 py-2 text-white focus:outline-none transition-colors ${
          error
            ? 'border-red-500 focus:border-red-600'
            : 'border-gray-700 focus:border-cyan-400'
        } ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className='text-xs text-red-400'>{error}</p>}
    </div>
  );
}
