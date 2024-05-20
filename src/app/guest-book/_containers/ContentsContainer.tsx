import { mergeClassNames } from '@/libs/utils';

function ContentsContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={mergeClassNames(
        'flex flex-col items-start justify-center w-full h-full gap-4 overflow-y-hidden',
      )}
    >
      {children}
    </div>
  );
}

export default ContentsContainer;
