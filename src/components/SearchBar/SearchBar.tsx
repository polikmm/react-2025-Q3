import { type ChangeEvent } from 'react';
import { InputField } from '../InputField/InputField';
import type { SearchBarProps } from '../../types/SearchBarProps';
import { Button } from '../Button/Button';

export function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
  return (
    <>
      <InputField
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.value)
        }
        placeholder="ditto"
      />
      <Button className="search" onClick={onSearch} text="search" />
    </>
  );
}
