import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Save, Trash2, Shield, Code, Target } from 'lucide-react';

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

  const ADMIN_PASSWORD = '88410205';

  useEffect(() => {
    // Carregar dados salvos
    const savedTagId = localStorage.getItem('googleTagId');
    if (savedTagId) {
      setGoogleTagId(savedTagId);
      setCurrentTag(savedTagId);
    }

    const savedHtml = localStorage.getItem('customHtmlTag');
    if (savedHtml) {
      setCurrentHtml(savedHtml);
      setCustomHtml(savedHtml);
    }

    const savedEventSnippet = localStorage.getItem('googleEventSnippet');
    if (savedEventSnippet) {
      setCurrentEventSnippet(savedEventSnippet);
      setEventSnippet(savedEventSnippet);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Tentativa de login com senha:', password);
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setMessage('Login realizado com sucesso!');
      console.log('Login autorizado');
    } else {
      setMessage('Senha incorreta! Tente novamente.');
      console.log('Senha incorreta');
    }
  };

  const removeExistingGoogleTags = () => {
    // Remove scripts do Google Tag Manager
    const existingScripts = document.querySelectorAll('script[src*="googletagmanager.com"], script[data-google-tag]');
    existingScripts.forEach(script => {
      console.log('Removendo script existente:', script);
      script.remove();
    });
  };

  const injectGoogleTag = (tagId: string) => {
    console.log('Injetando Google Tag:', tagId);
    
    // Remove tags existentes primeiro
    removeExistingGoogleTags();

    // Cria o script do Google Tag Manager
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${tagId}`;
    script1.setAttribute('data-google-tag', 'gtag-src');
    document.head.appendChild(script1);

    // Cria o script de configuração
    const script2 = document.createElement('script');
    script2.setAttribute('data-google-tag', 'gtag-config');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${tagId}');
      console.log('Google Tag configurado:', '${tagId}');
    `;
    document.head.appendChild(script2);

    // Confirma carregamento
    script1.onload = () => {
      console.log('✅ Google Tag carregado com sucesso:', tagId);
      
      // Dispara evento de teste
      if (window.gtag) {
        window.gtag('event', 'page_view', {
          page_title: 'Cacambas Pereira',
          page_location: window.location.href
        });
        console.log('✅ Evento de teste enviado');
      }
    };

    script1.onerror = () => {
      console.error('❌ Erro ao carregar Google Tag:', tagId);
    };
  };

  const handleSaveTag = () => {
    if (!googleTagId.trim()) {
      setMessage('❌ Por favor, insira um ID válido do Google Analytics/Ads');
      return;
    }

    setIsLoading(true);
    const tagId = googleTagId.trim();
    
    console.log('Salvando Google Tag:', tagId);
    
    // Salva no localStorage
    localStorage.setItem('googleTagId', tagId);
    setCurrentTag(tagId);
    
    // Injeta a tag imediatamente
    injectGoogleTag(tagId);
    
    setTimeout(() => {
      setIsLoading(false);
      setMessage(`✅ Google Tag ${tagId} instalado com sucesso! Verifique o console do navegador.`);
      console.log('Google Tag salvo e injetado:', tagId);
    }, 2000);
  };

  const handleRemoveTag = () => {
    setIsLoading(true);
    
    console.log('Removendo Google Tag');
    
    // Remove do localStorage
    localStorage.removeItem('googleTagId');
    setCurrentTag('');
    setGoogleTagId('');
    
    // Remove do documento
    removeExistingGoogleTags();

    setTimeout(() => {
      setIsLoading(false);
      setMessage('✅ Google Tag removido com sucesso!');
      console.log('Google Tag removido');
    }, 1000);
  };

  const handleSaveHtml = () => {
    if (!customHtml.trim()) {
      setMessage('❌ Por favor, insira um código HTML válido');
      return;
    }

    setIsLoading(true);
    
    console.log('Salvando HTML personalizado');
    
    // Salva no localStorage
    localStorage.setItem('customHtmlTag', customHtml.trim());
    setCurrentHtml(customHtml.trim());
    
    // Remove HTML customizado existente
    const existingCustom = document.querySelector('#custom-html-injection');
    if (existingCustom) {
      existingCustom.remove();
    }

    // Cria container para o HTML customizado
    const container = document.createElement('div');
    container.id = 'custom-html-injection';
    container.innerHTML = customHtml.trim();
    
    // Move scripts para o head
    const scripts = container.querySelectorAll('script');
    scripts.forEach(script => {
      const newScript = document.createElement('script');
      if (script.src) {
        newScript.src = script.src;
        newScript.async = true;
      }
      if (script.innerHTML) {
        newScript.innerHTML = script.innerHTML;
      }
      Array.from(script.attributes).forEach(attr => {
        if (attr.name !== 'src' && attr.name !== 'innerHTML') {
          newScript.setAttribute(attr.name, attr.value);
        }
      });
      document.head.appendChild(newScript);
      console.log('Script HTML personalizado adicionado:', newScript);
    });

    // Move styles para o head
    const styles = container.querySelectorAll('style');
    styles.forEach(style => {
      const newStyle = document.createElement('style');
      newStyle.innerHTML = style.innerHTML;
      document.head.appendChild(newStyle);
      console.log('Style HTML personalizado adicionado:', newStyle);
    });

    setTimeout(() => {
      setIsLoading(false);
      setMessage('✅ Código HTML personalizado instalado com sucesso!');
      console.log('HTML personalizado salvo e injetado');
    }, 1000);
  };

  const handleRemoveHtml = () => {
    setIsLoading(true);
    
    console.log('Removendo HTML personalizado');
    
    // Remove do localStorage
    localStorage.removeItem('customHtmlTag');
    setCurrentHtml('');
    setCustomHtml('');
    
    // Remove do documento
    const existingCustom = document.querySelector('#custom-html-injection');
    if (existingCustom) {
      existingCustom.remove();
    }

    setTimeout(() => {
      setIsLoading(false);
      setMessage('✅ Código HTML personalizado removido com sucesso!');
      console.log('HTML personalizado removido');
    }, 1000);
  };

  const handleSaveEventSnippet = () => {
    if (!eventSnippet.trim()) {
      setMessage('❌ Por favor, insira um código de evento válido');
      return;
    }

    setIsLoading(true);
    
    console.log('Salvando snippet de evento');
    
    // Salva no localStorage
    localStorage.setItem('googleEventSnippet', eventSnippet.trim());
    setCurrentEventSnippet(eventSnippet.trim());
    
    // Remove snippet existente
    const existingSnippet = document.querySelector('#google-event-snippet');
    if (existingSnippet) {
      existingSnippet.remove();
    }

    // Adiciona novo snippet
    const script = document.createElement('script');
    script.id = 'google-event-snippet';
    script.innerHTML = eventSnippet.trim();
    document.head.appendChild(script);
    console.log('Snippet de evento adicionado:', script);

    setTimeout(() => {
      setIsLoading(false);
      setMessage('✅ Snippet de evento do Google instalado com sucesso!');
      console.log('Snippet de evento salvo e injetado');
    }, 1000);
  };

  const handleRemoveEventSnippet = () => {
    setIsLoading(true);
    
    console.log('Removendo snippet de evento');
    
    // Remove do localStorage
    localStorage.removeItem('googleEventSnippet');
    setCurrentEventSnippet('');
    setEventSnippet('');
    
    // Remove do documento
    const existingSnippet = document.querySelector('#google-event-snippet');
    if (existingSnippet) {
      existingSnippet.remove();
    }

    setTimeout(() => {
      setIsLoading(false);
      setMessage('✅ Snippet de evento do Google removido com sucesso!');
      console.log('Snippet de evento removido');
    }, 1000);
  };

  // Tela de login
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-8 max-w-md w-full">
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
                onChange={(e) => {
                  setPassword(e.target.value);
                  console.log('Senha digitada:', e.target.value);
                }}
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
              <p className={`text-sm text-center ${message.includes('sucesso') ? 'text-green-600' : 'text-red-500'}`}>
                {message}
              </p>
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

          <div className="mt-4 text-center text-xs text-gray-500">
            Senha: 88410205
          </div>
        </div>
      </div>
    );
  }

  // Painel principal
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
            className={`py-3 px-4 rounded-md font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
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
            className={`py-3 px-4 rounded-md font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
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
            className={`py-3 px-4 rounded-md font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === 'events'
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Target size={20} />
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
                placeholder="Ex: G-XXXXXXXXXX ou AW-XXXXXXXXX"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
              <p className="text-sm text-gray-500 mt-1">
                Cole aqui o ID do seu Google Analytics (G-XXXXXXXXXX) ou Google Ads (AW-XXXXXXXXX)
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSaveTag}
                disabled={isLoading}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Save size={20} />
                {isLoading ? 'Instalando...' : 'Instalar Tag'}
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
                  ✅ Google Tag Ativa no Site
                </label>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm text-green-800 font-mono">
                    Tag ID: {currentTag}
                  </p>
                  <p className="text-xs text-green-600 mt-2">
                    Abra o Console do navegador (F12) para ver os logs de carregamento
                  </p>
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
                placeholder="Cole aqui qualquer código HTML (scripts, meta tags, Facebook Pixel, etc.)"
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
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Save size={20} />
                {isLoading ? 'Instalando...' : 'Instalar HTML'}
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
                  ✅ HTML Personalizado Ativo no Site
                </label>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg max-h-40 overflow-y-auto">
                  <pre className="text-sm text-green-800 whitespace-pre-wrap break-all">
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
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Save size={20} />
                {isLoading ? 'Instalando...' : 'Instalar Evento'}
              </button>
              <button
                onClick={handleRemoveEventSnippet}
                disabled={isLoading}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Trash2 size={20} />
                {isLoading ? 'Removendo...' : 'Remover Evento'}
              </button>
            </div>

            {currentEventSnippet && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  ✅ Snippet de Evento Ativo no Site
                </label>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg max-h-40 overflow-y-auto">
                  <pre className="text-sm text-green-800 whitespace-pre-wrap break-all">
                    {currentEventSnippet}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        {message && (
          <div className={`mt-6 p-4 rounded-lg text-center font-medium ${
            message.includes('✅') 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
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

// Adiciona declaração global para gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export default AdminPanel;