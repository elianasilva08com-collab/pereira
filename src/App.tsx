import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Process from './components/Process';
import Contact from './components/Contact';
import Location from './components/Location';
import Policy from './components/Policy';
import { Footer } from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import ContatoPage from './pages/Contato';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadSavedTags = () => {
      console.log('🚀 Carregando tags salvas...');
      
      // Carrega Google Tag
      const savedTagId = localStorage.getItem('googleTagId');
      if (savedTagId) {
        console.log('📊 Carregando Google Tag:', savedTagId);
        
        // Remove tags existentes
        const existingScripts = document.querySelectorAll('script[data-google-tag]');
        existingScripts.forEach(script => script.remove());
        
        // Adiciona nova tag
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${savedTagId}`;
        script1.setAttribute('data-google-tag', 'gtag-src');
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.setAttribute('data-google-tag', 'gtag-config');
        script2.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${savedTagId}');
          console.log('✅ Google Tag configurado automaticamente:', '${savedTagId}');
        `;
        document.head.appendChild(script2);

        script1.onload = () => {
          console.log('✅ Google Tag carregado automaticamente:', savedTagId);
        };
      } else {
        console.log('ℹ️ Nenhuma Google Tag salva encontrada');
      }

      // Carrega HTML personalizado
      const savedHtml = localStorage.getItem('customHtmlTag');
      if (savedHtml) {
        console.log('🎨 Carregando HTML personalizado');
        
        // Remove HTML existente
        const existingCustom = document.querySelector('#custom-html-injection');
        if (existingCustom) {
          existingCustom.remove();
        }
        
        const container = document.createElement('div');
        container.id = 'custom-html-injection';
        container.innerHTML = savedHtml;
        
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
        });

        // Move styles para o head
        const styles = container.querySelectorAll('style');
        styles.forEach(style => {
          const newStyle = document.createElement('style');
          newStyle.innerHTML = style.innerHTML;
          document.head.appendChild(newStyle);
        });
      } else {
        console.log('ℹ️ Nenhum HTML personalizado salvo encontrado');
      }

      // Carrega snippet de eventos
      const savedEventSnippet = localStorage.getItem('googleEventSnippet');
      if (savedEventSnippet) {
        console.log('🎯 Carregando snippet de eventos');
        
        // Remove snippet existente
        const existingSnippet = document.querySelector('#google-event-snippet');
        if (existingSnippet) {
          existingSnippet.remove();
        }
        
        const script = document.createElement('script');
        script.id = 'google-event-snippet';
        script.innerHTML = savedEventSnippet;
        document.head.appendChild(script);
      } else {
        console.log('ℹ️ Nenhum snippet de evento salvo encontrado');
      }

      setIsLoaded(true);
      console.log('✅ Carregamento de tags concluído');
    };

    // Carrega as tags imediatamente
    loadSavedTags();
    
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/contato" element={<ContatoPage />} />
          <Route path="/" element={
            <>
              <Header />
              <WhatsAppFloat />
              <main>
                <Hero />
                <Services />
                <About />
                <Process />
                <Contact />
                <Location />
                <Policy />
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;