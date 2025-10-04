import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Save, Trash2, Shield } from 'lucide-react';

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [googleTagId, setGoogleTagId] = useState('');
  const [currentTag, setCurrentTag] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Password for admin access (in production, this should be more secure)
  const ADMIN_PASSWORD = 'pereira2024';

  useEffect(() => {
    // Load current Google tag from localStorage
    const savedTag = localStorage.getItem('googleAnalyticsTag');
    if (savedTag) {
      setCurrentTag(savedTag);
      // Extract ID from saved tag
      const match = savedTag.match(/id=([^"&]+)/);
      if (match) {
        setGoogleTagId(match[1]);
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setMessage('');
    } else {
      setMessage('Senha incorreta!');
    }
  };

  const generateGoogleTag = (tagId: string) => {
    return `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${tagId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${tagId}');
</script>`;
  };

  const handleSaveTag = () => {
    if (!googleTagId.trim()) {
      setMessage('Por favor, insira um ID válido do Google Analytics');
      return;
    }

    setIsLoading(true);
    const newTag = generateGoogleTag(googleTagId.trim());
    
    // Save to localStorage
    localStorage.setItem('googleAnalyticsTag', newTag);
    setCurrentTag(newTag);
    
    // Add tag to document head
    const existingScript = document.querySelector('script[src*="googletagmanager.com"]');
    if (existingScript) {
      existingScript.remove();
      const existingConfig = document.querySelector('script:not([src])');
      if (existingConfig && existingConfig.textContent?.includes('gtag')) {
        existingConfig.remove();
      }
    }

    // Add new tag
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${googleTagId.trim()}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${googleTagId.trim()}');
    `;
    document.head.appendChild(script2);

    setTimeout(() => {
      setIsLoading(false);
      setMessage('Google Analytics configurado com sucesso!');
    }, 1000);
  };

  const handleRemoveTag = () => {
    setIsLoading(true);
    
    // Remove from localStorage
    localStorage.removeItem('googleAnalyticsTag');
    setCurrentTag('');
    setGoogleTagId('');
    
    // Remove from document head
    const existingScript = document.querySelector('script[src*="googletagmanager.com"]');
    if (existingScript) {
      existingScript.remove();
    }
    const existingConfig = document.querySelector('script:not([src])');
    if (existingConfig && existingConfig.textContent?.includes('gtag')) {
      existingConfig.remove();
    }

    setTimeout(() => {
      setIsLoading(false);
      setMessage('Google Analytics removido com sucesso!');
    }, 1000);
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-dark">Painel Administrativo</h2>
            <p className="text-gray-600 mt-2">Digite a senha para acessar</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha de administrador"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {message && (
              <p className="text-red-500 text-sm text-center">{message}</p>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-primary hover:bg-blue-800 text-white py-3 rounded-lg font-bold transition-all duration-300"
              >
                Entrar
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-bold transition-all duration-300"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-dark">Gerenciar Google Analytics</h2>
          <p className="text-gray-600 mt-2">Configure rapidamente os códigos de rastreamento</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              ID do Google Analytics / Google Ads
            </label>
            <input
              type="text"
              value={googleTagId}
              onChange={(e) => setGoogleTagId(e.target.value)}
              placeholder="Ex: AW-17510960317 ou GA-XXXXXXXXX"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
            <p className="text-sm text-gray-500 mt-1">
              Cole aqui o ID do seu Google Analytics ou Google Ads
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSaveTag}
              disabled={isLoading}
              className="flex-1 bg-accent hover:bg-green-600 text-white py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save size={20} />
              {isLoading ? 'Salvando...' : 'Salvar e Ativar'}
            </button>
            <button
              onClick={handleRemoveTag}
              disabled={isLoading}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Trash2 size={20} />
              {isLoading ? 'Removendo...' : 'Remover Tag'}
            </button>
          </div>

          {message && (
            <div className={`p-4 rounded-lg text-center font-medium ${
              message.includes('sucesso') 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {message}
            </div>
          )}

          {currentTag && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Código Atual Ativo
              </label>
              <div className="bg-gray-100 p-4 rounded-lg">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap break-all">
                  {currentTag}
                </pre>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;