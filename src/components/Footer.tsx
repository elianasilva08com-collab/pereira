import React from 'react';
import { Facebook, Instagram, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import AdminAccess from './AdminAccess';

const Footer: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  const footerSections = [
    {
      title: 'Cacambas Pereira',
      content: 'Oferecendo soluções em locações, transportes e coletas de entulhos com qualidade e responsabilidade.',
      social: true,
    },
    {
      title: 'Links Rápidos',
      links: [
        { text: 'Início', section: 'home' },
        { text: 'Serviços', section: 'services' },
        { text: 'Sobre Nós', section: 'about' },
        { text: 'Contato', section: 'contact' },
      ],
    },
    {
      title: 'Serviços',
      links: [
        { text: 'Transporte de Cargas', section: 'services' },
        { text: 'Locação de Equipamentos', section: 'services' },
        { text: 'Coleta de Entulhos', section: 'services' },
      ],
    },
    {
      title: 'Contato',
      contactInfo: [
        { icon: Phone, text: '(11) 5192-7893' },
        { icon: Mail, text: 'contato@cacambaspereira.com.br' },
        { icon: MapPin, text: 'Rua Da Paz, 1234 - Chácara Santo Antônio, São Paulo - SP' },
      ],
    },
  ];

  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-xl font-bold text-secondary mb-6">{section.title}</h3>
              
              {section.content && (
                <div>
                  <p className="text-gray-300 leading-relaxed mb-6">{section.content}</p>
                  {section.social && (
                    <div className="flex space-x-4">
                      <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-all duration-300 transform hover:-translate-y-1">
                        <Facebook size={20} />
                      </a>
                      <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-all duration-300 transform hover:-translate-y-1">
                        <Instagram size={20} />
                      </a>
                      <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-all duration-300 transform hover:-translate-y-1">
                        <MessageCircle size={20} />
                      </a>
                      <AdminAccess />
                    </div>
                  )}
                </div>
              )}

              {section.links && (
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <button
                        onClick={() => scrollToSection(link.section)}
                        className="text-gray-300 hover:text-secondary transition-colors duration-300"
                      >
                        {link.text}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {section.contactInfo && (
                <ul className="space-y-3">
                  {section.contactInfo.map((info, infoIndex) => {
                    const Icon = info.icon;
                    return (
                      <li key={infoIndex} className="flex items-start space-x-3">
                        <Icon size={18} className="text-secondary mt-1 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{info.text}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Cacambas Pereira - Todos os direitos reservados</p>
          <p className="mt-2">CNPJ: 17.165.880/0001-59</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;