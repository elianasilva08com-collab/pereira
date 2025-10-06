import React from 'react';
import { useEffect } from 'react';
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
  useEffect(() => {
    // Load saved Google Analytics tag on app start
    const savedTag = localStorage.getItem('googleAnalyticsTag');
    if (savedTag) {
      const match = savedTag.match(/id=([^"&]+)/);
      if (match) {
        const tagId = match[1];
        
        // Check if tag is already loaded
        if (!document.querySelector(`script[src*="${tagId}"]`)) {
          // Add Google Analytics script
          const script1 = document.createElement('script');
          script1.async = true;
          script1.src = `https://www.googletagmanager.com/gtag/js?id=${tagId}`;
          script1.setAttribute('data-google-tag', 'gtag-src');
          document.head.appendChild(script1);

          const script2 = document.createElement('script');
          script2.setAttribute('data-google-tag', 'gtag-config');
          script2.textContent = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${tagId}');
          `;
          document.head.appendChild(script2);
        }
      }
    }

    // Load saved custom HTML
    const savedHtml = localStorage.getItem('customHtmlTag');
    if (savedHtml && !document.querySelector('#custom-html-tag')) {
      const div = document.createElement('div');
      div.id = 'custom-html-tag';
      div.innerHTML = savedHtml;
      
      // Move scripts and styles to head
      const scripts = div.querySelectorAll('script');
      const styles = div.querySelectorAll('style');
      
      scripts.forEach(script => {
        const newScript = document.createElement('script');
        if (script.src) newScript.src = script.src;
        if (script.textContent) newScript.textContent = script.textContent;
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
    }

    // Load saved event snippet
    const savedEventSnippet = localStorage.getItem('googleEventSnippet');
    if (savedEventSnippet && !document.querySelector('#google-event-snippet')) {
      const script = document.createElement('script');
      script.id = 'google-event-snippet';
      script.textContent = savedEventSnippet;
      document.head.appendChild(script);
    }
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