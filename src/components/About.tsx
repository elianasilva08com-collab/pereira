import React from 'react';

const About: React.FC = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">Sobre Nossa Empresa</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              A <strong>Cacambas Pereira</strong> é uma empresa especializada em locações, transportes e coletas de entulhos.
            </p>
            <p className="text-lg leading-relaxed">
              Com sede em São Paulo, atendemos toda a região com profissionalismo, agilidade e comprometimento com a satisfação dos nossos clientes.
            </p>
            <p className="text-lg leading-relaxed">
              Nossa missão é oferecer soluções eficientes e seguras para as necessidades de transporte e locação, contribuindo para o desenvolvimento da região e preservação do meio ambiente através da destinação correta de resíduos.
            </p>
            <p className="text-lg leading-relaxed">
              Contamos com uma equipe qualificada e equipamentos modernos para garantir a excelência em todos os serviços prestados.
            </p>
            <button
              onClick={scrollToContact}
              className="bg-primary hover:bg-blue-800 text-white px-8 py-4 rounded-lg font-bold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Entre em Contato
            </button>
          </div>

          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img 
              src="/69E13834-3D09-46F6-AC83-088B145A110A-576w.webp" 
              alt="Caminhão da Cacambas Pereira com containers para coleta de entulhos"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;