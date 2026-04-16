interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className='mb-6'>
      <h2 className='text-2xl font-bold text-cyan-400'>{title}</h2>
      {subtitle && <p className='text-gray-400 text-sm mt-1'>{subtitle}</p>}
    </div>
  );
}
