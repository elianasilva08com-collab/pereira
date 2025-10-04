import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import AdminPanel from './AdminPanel';

const AdminAccess: React.FC = () => {
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowAdminPanel(true)}
        className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-all duration-300 transform hover:-translate-y-1 group"
        aria-label="Painel Administrativo"
        title="Painel Administrativo"
      >
        <Settings size={20} />
      </button>

      {showAdminPanel && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}
    </>
  );
};

export default AdminAccess;