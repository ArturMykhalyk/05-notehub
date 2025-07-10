import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { NoteList } from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import { SearchBox } from '../SearchBox/SearchBox';
import css from './App.module.css';
import { useState } from 'react';
import { deleteNote, fetchNotes } from '../../services/noteService';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

import { ErrorMessageEmpty } from '../ErrorMessageEmpty/ErrorMessageEmpty';

import { Modal } from '../Modal/Modal';

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

  const queryClient = useQueryClient();

  const mutationDelete = useMutation({
    mutationFn: (id: number) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleClickDelete = (id: number) => {
    mutationDelete.mutate(id);
  };
  const handleCreateNote = () => {
    setIsOpenModal(true);
  };
  const handleCloseModal = () => setIsOpenModal(false);
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearchUpdate={setQuery} onPageUpdate={setCurrentPage} />
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
      {isSuccess && data?.notes.length === 0 && <ErrorMessageEmpty />}
      {isSuccess && data.notes.length > 0 && (
        <NoteList notes={data.notes} onClickDelete={handleClickDelete} />
      )}
      {isOpenModal && <Modal onClose={handleCloseModal} />}
    </div>
  );
}

export default App;
