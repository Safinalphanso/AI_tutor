import { useState, useEffect } from 'react';
import { HiX, HiPlus, HiPencil } from 'react-icons/hi';

interface Note {
  id: string;
  title: string;
  content: string;
  timestamp: Date;
}

interface NotesProps {
  onClose: () => void;
}

export default function Notes({ onClose }: NotesProps) {
  const [notes, setNotes] = useState<Note[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('notes');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [newNote, setNewNote] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('notes');
      if (saved) {
        setNotes(JSON.parse(saved));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const startEditing = (note: Note) => {
    setEditingId(note.id);
    setEditingTitle(note.title);
  };

  const saveTitle = (id: string) => {
    const updatedNotes = notes.map(note => 
      note.id === id ? { ...note, title: editingTitle } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setEditingId(null);
  };

  const addNewNote = () => {
    if (!newNote.trim()) return;
    
    const note = {
      id: Date.now().toString(),
      title: `Note ${notes.length + 1}`,
      content: newNote,
      timestamp: new Date(),
    };
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setNewNote('');
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-gray-900/95 backdrop-blur-lg border-l border-white/10 p-6 shadow-xl overflow-y-auto z-50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Notes</h2>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          <HiX className="w-6 h-6" />
        </button>
      </div>

      <div className="mb-6">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write a new note..."
          className="w-full h-24 bg-gray-800/50 rounded-lg p-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={addNewNote}
          disabled={!newNote.trim()}
          className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Note
        </button>
      </div>

      <div className="space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-gray-800/50 rounded-lg p-4 border border-white/5 group hover:border-purple-500/30 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-2">
              {editingId === note.id ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    onBlur={() => saveTitle(note.id)}
                    onKeyDown={(e) => e.key === 'Enter' && saveTitle(note.id)}
                    className="bg-gray-700 text-white px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    autoFocus
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium text-white">{note.title}</h3>
                  <button
                    onClick={() => startEditing(note)}
                    className="text-gray-400 hover:text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <HiPencil className="w-4 h-4" />
                  </button>
                </div>
              )}
              <button
                onClick={() => deleteNote(note.id)}
                className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-300 text-sm whitespace-pre-wrap">{note.content}</p>
            <span className="text-xs text-gray-500 mt-2 block">
              {new Date(note.timestamp).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 