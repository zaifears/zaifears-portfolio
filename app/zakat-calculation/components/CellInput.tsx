'use client';

interface CellInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function CellInput({ value, onChange, placeholder, disabled }: CellInputProps) {
  return (
    <input
      type='text'
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value)}
      className={`w-full rounded-md border bg-[#1A1A28] px-3 py-2 text-sm text-[#F0F0F0] outline-none transition ${
        disabled
          ? 'cursor-not-allowed border-[#333350]/40 bg-[#1E1E2E]/70 text-[#888899]'
          : 'border-[#333350] focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/40'
      }`}
    />
  );
}
