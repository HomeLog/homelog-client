import Label from '@/components/\bLabel';
import Flex from '@/components/Flex';
import Input from '@/components/Input';
import { mergeClassNames } from '@/libs/utils';
import { ChangeEvent } from 'react';

type Props = {
  id: string;
  placeholder: string;
  value: string;
  labelText?: string;
  classNameFlex?: string;
  classNameLabel?: string;
  classNameInput?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function InputWithLabel({
  id,
  placeholder,
  value,
  labelText,
  classNameFlex,
  classNameLabel,
  classNameInput,
  onChange,
}: Props) {
  return (
    <Flex className={classNameFlex}>
      {labelText && (
        <Label
          htmlFor={id}
          className={mergeClassNames('mb-2 w-full', classNameLabel)}
        >
          {labelText}
        </Label>
      )}
      <Input
        id={id}
        placeholder={placeholder}
        value={value}
        className={classNameInput}
        onChange={onChange}
      />
    </Flex>
  );
}
