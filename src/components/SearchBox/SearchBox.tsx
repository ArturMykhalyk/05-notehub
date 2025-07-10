import { useDebouncedCallback } from 'use-debounce';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  onSearchUpdate(query: string): void;
  onPageUpdate(page: number): void;
}

export function SearchBox({ onSearchUpdate, onPageUpdate }: SearchBoxProps) {
  const updateSearchQuery = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearchUpdate(e.target.value);
      onPageUpdate(1);
    },
    500
  );
  return (
    <input
      className={css.input}
      onChange={updateSearchQuery}
      type="text"
      placeholder="Search notes"
    />
  );
}
