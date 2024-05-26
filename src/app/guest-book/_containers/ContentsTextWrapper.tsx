'use client';

import TextArea from '@/components/TextArea';
import { ChangeEvent, ChangeEventHandler, useCallback, useState } from 'react';

export default function ContentsTextWrapper() {
  const [value, setValue] = useState('');
  const [charLimitOver, setCharLimitOver] = useState(false);

  const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const inputValue = e.target.value;
      setValue(inputValue);
      setCharLimitOver(inputValue.length >= 50);
    },
    [],
  );

  return (
    <div className='flex flex-col w-full gap-1'>
      {charLimitOver && (
        <label className='pl-1 text-sm text-red-500'>
          방명록은 최대 50자까지 작성할 수 있습니다.
        </label>
      )}
      <TextArea
        placeholder='한 줄 기록을 작성해주세요 (50자 제한)'
        variant={charLimitOver ? 'error' : 'primary'}
        value={value}
        onChange={handleChange}
        maxLength={50}
      />
    </div>
  );
}
