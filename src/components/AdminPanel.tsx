import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Save, Trash2, Shield, Code } from 'lucide-react';

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'analytics' | 'html' | 'events'>('analytics');
  
  // Analytics tab
  const [googleTagId, setGoogleTagId] = useState('');
  const [currentTag, setCurrentTag] = useState('');
  
  // HTML tab
  const [customHtml, setCustomHtml] = useState('');
  const [currentHtml, setCurrentHtml] = useState('');
  
  // Events tab
  const [eventSnippet, setEventSnippet] = useState('');
  const [currentEventSnippet, setCurrentEventSnippet] = useState('');
  
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Updated password
  const ADMIN_PASSWORD = '88410205';

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

    // Load current HTML from localStorage
    const savedHtml = localStorage.getItem('customHtmlTag');
    if (savedHtml) {
      setCurrentHtml(savedHtml);
      setCustomHtml(savedHtml);
    }

    // Load current Event Snippet from localStorage
    const savedEventSnippet = localStorage.getItem('googleEventSnippet');
    if (savedEventSnippet) {
      setCurrentEventSnippet(savedEventSnippet);
      setEventSnippet(savedEventSnippet);
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
    
    // Remove existing Google Analytics scripts
    const existingScript = document.querySelector('script[src*="googletagmanager.com"]');
    if (existingScript) {
      existingScript.remove();
    }
    const existingConfig = document.querySelectorAll('script:not([src])');
    existingConfig.forEach(script => {
      if (script.textContent?.includes('gtag')) {
        script.remove();
      }
    });

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
    const existingConfig = document.querySelectorAll('script:not([src])');
    existingConfig.forEach(script => {
      if (script.textContent?.includes('gtag')) {
        script.remove();
      }
    });

    setTimeout(() => {
      setIsLoading(false);
      setMessage('Google Analytics removido com sucesso!');
    }, 1000);
  };

  const handleSaveHtml = () => {
    if (!customHtml.trim()) {
      setMessage('Por favor, insira um código HTML válido');
      return;
    }

    setIsLoading(true);
    
    // Save to localStorage
    localStorage.setItem('customHtmlTag', customHtml.trim());
    setCurrentHtml(customHtml.trim());
    
    // Remove existing custom HTML
    const existingCustom = document.querySelector('#custom-html-tag');
    if (existingCustom) {
      existingCustom.remove();
    }

    // Add new HTML to head
    const div = document.createElement('div');
    div.id = 'custom-html-tag';
    div.innerHTML = customHtml.trim();
    
    // Move all script and style elements to head
    const scripts = div.querySelectorAll('script');
    const styles = div.querySelectorAll('style');
    
    scripts.forEach(script => {
      const newScript = document.createElement('script');
      if (script.src) {
        newScript.src = script.src;
      }
      if (script.textContent) {
        newScript.textContent = script.textContent;
      }
      // Copy all attributes
      Array.from(script.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value);
      });
      document.head.appendChild(newScript);
    });

    styles.forEach(style => {
      const newStyle = document.createElement('style');
      newStyle.textContent = style.textContent;
      document.head.appendChild(newStyle);
    });

    setTimeout(() => {
      setIsLoading(false);
      setMessage('Código HTML personalizado adicionado com sucesso!');
    }, 1000);
  };

  const handleRemoveHtml = () => {
    setIsLoading(true);
    
    // Remove from localStorage
    localStorage.removeItem('customHtmlTag');
    setCurrentHtml('');
    setCustomHtml('');
    
    // Remove from document head
    const existingCustom = document.querySelector('#custom-html-tag');
    if (existingCustom) {
      existingCustom.remove();
    }

    setTimeout(() => {
      setIsLoading(false);
      setMessage('Código HTML personalizado removido com sucesso!');
    }, 1000);
  };

  const handleSaveEventSnippet = () => {
    if (!eventSnippet.trim()) {
      setMessage('Por favor, insira um código de evento válido');
      return;
    }

    setIsLoading(true);
    
    // Save to localStorage
    localStorage.setItem('googleEventSnippet', eventSnippet.trim());
    setCurrentEventSnippet(eventSnippet.trim());
    
    // Remove existing event snippet
    const existingEventSnippet = document.querySelector('#google-event-snippet');
    if (existingEventSnippet) {
      existingEventSnippet.remove();
    }

    // Add new event snippet to head
    const script = document.createElement('script');
    script.id = 'google-event-snippet';
    script.textContent = eventSnippet.trim();
    document.head.appendChild(script);

    setTimeout(() => {
      setIsLoading(false);
      setMessage('Snippet de evento do Google adicionado com sucesso!');
    }, 1000);
  };

  const handleRemoveEventSnippet = () => {
    setIsLoading(true);
    
    // Remove from localStorage
    localStorage.removeItem('googleEventSnippet');
    setCurrentEventSnippet('');
    setEventSnippet('');
    
    // Remove from document head
    const existingEventSnippet = document.querySelector('#google-event-snippet');
    if (existingEventSnippet) {
      existingEventSnippet.remove();
    }

    setTimeout(() => {
      setIsLoading(false);
      setMessage('Snippet de evento do Google removido com sucesso!');
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
                autoComplete="off"
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
      <div className="bg-white rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-dark">Painel Administrativo</h2>
          <p className="text-gray-600 mt-2">Gerencie códigos de rastreamento e HTML personalizado</p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3 mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === 'analytics'
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Shield size={20} />
            Google Analytics
          </button>
          <button
            onClick={() => setActiveTab('html')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === 'html'
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Code size={20} />
            HTML Personalizado
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === 'events'
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Shield size={20} />
            Eventos Google
          </button>
        </div>

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
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

            {currentTag && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Código Google Analytics Ativo
                </label>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap break-all">
                    {currentTag}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        {/* HTML Tab */}
        {activeTab === 'html' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Código HTML Personalizado
              </label>
              <textarea
                value={customHtml}
                onChange={(e) => setCustomHtml(e.target.value)}
                placeholder="Cole aqui qualquer código HTML (scripts, meta tags, etc.)"
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-mono text-sm"
              />
              <p className="text-sm text-gray-500 mt-1">
                Aceita qualquer código HTML: scripts do Google, Facebook Pixel, meta tags, etc.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSaveHtml}
                disabled={isLoading}
                className="flex-1 bg-accent hover:bg-green-600 text-white py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Save size={20} />
                {isLoading ? 'Salvando...' : 'Salvar e Ativar'}
              </button>
              <button
                onClick={handleRemoveHtml}
                disabled={isLoading}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Trash2 size={20} />
                {isLoading ? 'Removendo...' : 'Remover HTML'}
              </button>
            </div>

            {currentHtml && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Código HTML Ativo
                </label>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap break-all">
                    {currentHtml}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Snippet de Evento do Google
              </label>
              <textarea
                value={eventSnippet}
                onChange={(e) => setEventSnippet(e.target.value)}
                placeholder="Cole aqui o código do snippet de evento do Google (ex: gtag('event', 'conversion', {...}))"
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-mono text-sm"
              />
              <p className="text-sm text-gray-500 mt-1">
                Cole o código completo do snippet de evento do Google Ads ou Analytics
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSaveEventSnippet}
                disabled={isLoading}
                className="flex-1 bg-accent hover:bg-green-600 text-white py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Save size={20} />
                {isLoading ? 'Salvando...' : 'Salvar e Ativar'}
              </button>
              <button
                onClick={handleRemoveEventSnippet}
                disabled={isLoading}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Trash2 size={20} />
                {isLoading ? 'Removendo...' : 'Remover Snippet'}
              </button>
            </div>

            {currentEventSnippet && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Snippet de Evento Ativo
                </label>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap break-all">
                    {currentEventSnippet}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        {message && (
          <div className={`mt-6 p-4 rounded-lg text-center font-medium ${
            message.includes('sucesso') 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {message}
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;