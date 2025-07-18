import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { NoteList } from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import { SearchBox } from '../SearchBox/SearchBox';
import css from './App.module.css';
import { useState } from 'react';
import { fetchNotes } from '../../services/noteService';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { ErrorMessageEmpty } from '../ErrorMessageEmpty/ErrorMessageEmpty';
import { Modal } from '../Modal/Modal';
import { Toaster } from 'react-hot-toast';
import { NoteForm } from '../NoteForm/NoteForm';
import { useDebouncedCallback } from 'use-debounce';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ['notes', query, currentPage],
    queryFn: () => fetchNotes(query, currentPage),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  const handleCreateNote = () => {
    setIsOpenModal(true);
  };
  const handleCloseModal = () => setIsOpenModal(false);
  const handleChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setCurrentPage(1);
    },
    1000
  );
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleChange} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            page={currentPage}
            total={totalPages}
            onChange={setCurrentPage}
          />
        )}
        <button onClick={handleCreateNote} className={css.button}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <Toaster position="top-right" />
      {isSuccess && data?.notes.length === 0 && <ErrorMessageEmpty />}
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isOpenModal && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}

export default App;
