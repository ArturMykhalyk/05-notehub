import axios from "axios";
import { FormValues, Note } from "../types/note";



interface NotesHttpResponse {
    notes: Note[],
    totalPages: number,
}

export const fetchNotes = async (search: string, page:number): Promise<NotesHttpResponse>=> {
    const params = {
        ...(search && { search}),
        page,
        perPage:12,
    };
     const headers = {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN }`,
      }
    const response = await axios.get<NotesHttpResponse>(
        "https://notehub-public.goit.study/api/notes",{params,headers}
    );
    return response.data;
}

export const createNote = async (note: FormValues):Promise<Note> => {
    const headers = {
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      'Content-Type': 'application/json',
    };
  
    const response = await axios.post<Note>(
      'https://notehub-public.goit.study/api/notes',
      note,
      { headers }
    );
  
    return response.data;
  };


export const deleteNote = async (id: number): Promise<Note> => {
     const headers = {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN }`,
      }
    const response = await axios.delete<Note>(
        `https://notehub-public.goit.study/api/notes/${id}`,{headers}
    );
    return response.data;
    
}