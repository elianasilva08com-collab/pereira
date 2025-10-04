import React from 'react';

const Process: React.FC = () => {
  const steps = [
    {
      number: '1',
      title: 'Solicitação',
      description: 'Entre em contato conosco por telefone, WhatsApp ou e-mail para solicitar um orçamento.',
    },
    {
      number: '2',
      title: 'Análise',
      description: 'Nossa equipe analisa suas necessidades e elabora a melhor solução para seu caso.',
    },
    {
      number: '3',
      title: 'Orçamento',
      description: 'Enviaremos um orçamento detalhado com todos os serviços e valores.',
    },
    {
      number: '4',
      title: 'Execução',
      description: 'Após aprovação, executamos o serviço com qualidade e dentro do prazo combinado.',
    },
  ];

  return (
    <section id="process" className="py-20 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">Como Funciona</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-dark mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;