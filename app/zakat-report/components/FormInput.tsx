interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export default function FormInput({
  label,
  error,
  helperText,
  className = '',
  ...props
}: FormInputProps) {
  return (
    <div className='flex flex-col gap-2'>
      <label className='text-sm font-medium text-gray-300'>{label}</label>
      <input
        {...props}
        className={`w-full bg-gray-800 border rounded px-4 py-2 text-white focus:outline-none transition-colors ${
          error
            ? 'border-red-500 focus:border-red-600'
            : 'border-gray-700 focus:border-cyan-400'
        } ${className}`}
      />
      {error && <p className='text-xs text-red-400'>{error}</p>}
      {helperText && !error && <p className='text-xs text-gray-400'>{helperText}</p>}
    </div>
  );
}
