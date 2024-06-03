import clsx from 'clsx';

function TimeStampLayer({ date }: { date: string }) {
  return (
    <span
      className={clsx(
        'italic',
        'font-digital-clock',
        'absolute',
        'p-1',
        'tracking-widest',
        'text-orange-200',
        'bottom-2',
        'right-2',
        'bg-none',
        'text-opacity-90',
        'w-3/5',
        'text-sm',
        'sm:text-sm',
        'md:text-base',
        'text-right',
        'line-clamp-1',
      )}
      style={{
        textShadow: clsx(
          '0 0 2px rgba(253, 106, 1, 1),',
          '0 0 4px rgba(128, 55, 0, 0.7),',
          '0 0 5px rgba(64, 27, 0, 0.5),',
          '0 0 8px rgba(0, 0, 0, 0.8)',
        ),
      }}
    >
      {date}
    </span>
  );
}

export default TimeStampLayer;
