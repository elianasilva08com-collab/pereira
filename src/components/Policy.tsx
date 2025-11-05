import React from 'react';

const Policy: React.FC = () => {
  const policyData = [
    {
      title: 'Política de Qualidade',
      content: [
        'Comprometemo-nos a oferecer serviços de transporte, locação e coleta de entulhos com qualidade, segurança e responsabilidade ambiental, superando as expectativas dos nossos clientes.',
        '',
        'Nossa política de qualidade baseia-se nos seguintes princípios:',
        '• Atendimento personalizado e eficiente',
        '• Cumprimento de prazos acordados',
        '• Manutenção preventiva de equipamentos',
        '• Destinação ambientalmente correta de resíduos',
        '• Melhoria contínua de processos',
      ],
    },
    {
      title: 'Política Ambiental',
      content: [
        'Reconhecemos nossa responsabilidade com o meio ambiente e nos comprometemos a:',
        '',
        '• Realizar a coleta e destinação adequada de entulhos da construção civil',
        '• Promover a conscientização ambiental entre colaboradores e clientes',
        '• Adotar práticas que minimizem o impacto ambiental de nossas operações',
        '• Cumprir a legislação ambiental aplicável',
      ],
    },
    {
      title: 'Termos e Condições',
      content: [
        'Os serviços são prestados mediante contrato que estabelece direitos e obrigações de ambas as partes.',
        '',
        'O pagamento deve ser realizado conforme acordado no contrato de prestação de serviços.',
        '',
        'Em caso de cancelamento, aplicam-se as condições estabelecidas no contrato.',
      ],
    },
  ];

  return (
    <section id="policy" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">Política da Empresa</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded"></div>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {policyData.map((section, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-primary mb-6 pb-4 border-b border-gray-200">
                {section.title}
              </h3>
              <div className="space-y-3">
                {section.content.map((item, idx) => (
                  <p key={idx} className={`${item === '' ? 'h-2' : 'text-gray-700 leading-relaxed'}`}>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Policy;