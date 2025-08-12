import AsyncStorage from '@react-native-async-storage/async-storage';

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

const NOTES_KEY = 'notes';

export async function getNotes(): Promise<Note[]> {
  const data = await AsyncStorage.getItem(NOTES_KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveNotes(notes: Note[]) {
  await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

export async function addNote(note: Note) {
  const notes = await getNotes();
  notes.push(note);
  await saveNotes(notes);
}

export async function deleteNote(id: string) {
  const notes = await getNotes();
  const filtered = notes.filter(n => n.id !== id);
  await saveNotes(filtered);
}

export const getNoteById = async (id: string): Promise<Note | undefined> => {
  const notes = await getNotes();
  return notes.find(n => n.id === id);
};