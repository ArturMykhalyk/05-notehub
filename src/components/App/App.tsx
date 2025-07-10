import Pagination from '../Pagination/Pagination';
import { SearchBox } from '../SearchBox/SearchBox';
import css from './App.module.css';

function App() {
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />
        <Pagination total={1} page={1} onChange={() => {}}></Pagination>
        <button className={css.button}>Create note +</button>
      </header>
    </div>
  );
}

export default App;
