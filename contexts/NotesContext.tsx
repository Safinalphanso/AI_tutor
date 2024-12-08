import { createContext, useContext, useState } from 'react';

interface NotesContextType {
  addNote: (content: string) => void;
}

const NotesContext = createContext<NotesContextType | null>(null);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const addNote = (content: string) => {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const newNote = {
      id: Date.now().toString(),
      title: `Note ${notes.length + 1}`,
      content,
      timestamp: new Date(),
    };
    const updatedNotes = [...notes, newNote];
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    // Trigger storage event for other components
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <NotesContext.Provider value={{ addNote }}>
      {children}
    </NotesContext.Provider>
  );
}

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) throw new Error('useNotes must be used within NotesProvider');
  return context;
}; 