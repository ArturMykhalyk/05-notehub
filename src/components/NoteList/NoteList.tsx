import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Note } from '../../types/note';
import css from './NoteList.module.css';
import { deleteNote } from '../../services/noteService';
import toast from 'react-hot-toast';

interface NoteListProps {
  notes: Note[];
}

export function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutationDelete = useMutation({
    mutationFn: (id: number) => deleteNote(id),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success(`Note "${data.title}" deleted.`);
    },
    onError: () => {
      toast.error(`Failed to delete note.`);
    },
  });

  const handleClickDelete = (id: number) => {
    mutationDelete.mutate(id);
  };

  return (
    <ul className={css.list}>
      {notes.map(({ title, tag, id, content }) => (
        <li key={id} className={css.listItem}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <button
              className={css.button}
              onClick={() => {
                handleClickDelete(id);
              }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
