import { mergeClassNames } from '@/libs/utils';

function ContentsImageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={mergeClassNames(
        'relative w-[100%] h-[50%] flex justify-center rounded-xl shadow-[inset_2px_2px_2px_0px_rgba(0,0,0,0.4)]',
      )}
    >
      {children}
    </div>
  );
}

export default ContentsImageWrapper;
