import React from 'react';
import { Truck, Wrench, Trash2, Construction } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const services = [
    {
      icon: Truck,
      title: 'Transporte de Cargas',
      description: 'Realizamos o transporte de cargas de diversos tipos e tamanhos com segurança e pontualidade. Nossa frota está preparada para atender suas necessidades.',
    },
    {
      icon: Wrench,
      title: 'Locação de Equipamentos',
      description: 'Oferecemos locação de equipamentos para construção civil, indústria e eventos. Equipamentos modernos e em perfeito estado de conservação.',
    },
    {
      icon: Trash2,
      title: 'Coleta de Entulhos',
      description: 'Serviço especializado em coleta e destinação correta de entulhos da construção civil, seguindo todas as normas ambientais vigentes.',
    },
    {
      icon: Construction,
      title: 'Terraplanagem',
      description: 'Aluguel de equipamentos para terraplanagem: retroescavadeiras, bobcats e caminhões. Equipamentos modernos para movimentação de terra e obras.',
    },
  ];

  return (
    <section id="services" className="py-20 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">Nossos Serviços</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl group"
              >
                <div className="bg-primary text-white p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <Icon size={48} className="mx-auto relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-primary mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                  <button
                    onClick={() => {
                      window.open('https://api.whatsapp.com/send/?phone=551148637094&text=Ol%C3%A1%21+Gostaria+de+solicitar+um+or%C3%A7amento+para+os+servi%C3%A7os+da+Pereira+Cacambas.&type=phone_number&app_absent=0', '_blank');
                    }}
                    className="bg-primary hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    <span className="relative z-10">
                    Solicitar Orçamento
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;