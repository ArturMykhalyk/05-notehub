import css from './SearchBox.module.css';

export function SearchBox() {
  return <input className={css.input} type="text" placeholder="Search notes" />;
}
