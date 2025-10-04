import React from 'react';
import { Truck, Wrench, Trash2, Construction } from 'lucide-react';

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
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="bg-primary text-white p-8 text-center">
                  <Icon size={48} className="mx-auto" />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-primary mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
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