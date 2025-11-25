import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { loadSavedTags } from './utils/tagLoader';
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
    // Load tags immediately
    loadSavedTags();
    setIsLoaded(true);
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