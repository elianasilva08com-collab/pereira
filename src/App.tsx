import React from 'react';
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
import AdminAccess from './components/AdminAccess';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <WhatsAppFloat />
      <AdminAccess />
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