import { ChangeEvent } from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  onChange(event: ChangeEvent<HTMLInputElement>): void;
}

export function SearchBox({ onChange }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      onChange={onChange}
      type="text"
      placeholder="Search notes"
    />
  );
}
