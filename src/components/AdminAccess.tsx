import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import AdminPanel from './AdminPanel';

const AdminAccess: React.FC = () => {
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowAdminPanel(true)}
        className="fixed bottom-6 left-6 bg-gray-800 hover:bg-gray-900 text-white w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-40 flex items-center justify-center group"
        aria-label="Painel Administrativo"
        title="Painel Administrativo"
      >
        <Settings size={20} />
        <span className="absolute left-16 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Admin
        </span>
      </button>

      {showAdminPanel && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}
    </>
  );
};

export default AdminAccess;