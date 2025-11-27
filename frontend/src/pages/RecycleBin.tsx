import { useEffect } from 'react';
import Navbar from '../components/Layout/Navbar';
import useNoteStore from '../store/useNoteStore';

export default function RecycleBin() {
  const { filteredNotes, isLoading, toggleDeleted } = useNoteStore();

  useEffect(() => {
    toggleDeleted();
    return () => toggleDeleted();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Recycle Bin</h1>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">Recycle bin is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <div key={note._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{note.title}</h3>
                <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full text-sm">
                  {note.category}
                </span>
                <div className="text-gray-600 dark:text-gray-400 mt-3 line-clamp-3" dangerouslySetInnerHTML={{ __html: note.content }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
