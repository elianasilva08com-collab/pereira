import React from 'react';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Process from './components/Process';
import Contact from './components/Contact';
import Location from './components/Location';
import Policy from './components/Policy';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadSavedTags = () => {
      // Carrega Google Analytics/Ads tag
      const savedTagId = localStorage.getItem('googleTagId');
      if (savedTagId && !document.querySelector(`script[src*="${savedTagId}"]`)) {
        console.log('Carregando Google Tag:', savedTagId);
        
        // Script do Google Tag Manager
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${savedTagId}`;
        script1.setAttribute('data-gtag', 'src');
        document.head.appendChild(script1);

        // Configuração do gtag
        const script2 = document.createElement('script');
        script2.setAttribute('data-gtag', 'config');
        script2.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${savedTagId}');
        `;
        document.head.appendChild(script2);

        script1.onload = () => {
          console.log('Google Tag carregado com sucesso:', savedTagId);
        };
      }

      // Carrega HTML personalizado
      const savedHtml = localStorage.getItem('customHtmlTag');
      if (savedHtml && !document.querySelector('#custom-html-injection')) {
        console.log('Carregando HTML personalizado');
        
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
      }

      // Carrega snippet de eventos
      const savedEventSnippet = localStorage.getItem('googleEventSnippet');
      if (savedEventSnippet && !document.querySelector('#google-event-snippet')) {
        console.log('Carregando snippet de eventos');
        
        const script = document.createElement('script');
        script.id = 'google-event-snippet';
        script.innerHTML = savedEventSnippet;
        document.head.appendChild(script);
      }

      setIsLoaded(true);
    };

    // Carrega as tags após um pequeno delay para garantir que o DOM esteja pronto
    const timer = setTimeout(loadSavedTags, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
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
    </div>
  );
}

export default App;