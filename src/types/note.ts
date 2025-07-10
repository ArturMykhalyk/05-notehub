export interface Note {
    id: number;
    title: string;
    content: string;
    tag: NoteTag;
 }
type NoteTag = "Todo"|"Work"|"Personal"|"Meeting"|"Shopping";

export interface FormValues{
    title: string;
    content: string;
    tag: NoteTag;
}