import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, ArrowLeft, CheckCircle } from 'lucide-react';

const ContatoPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    cep: '',
    address: '',
    number: '',
    service: '',
    message: '',
  });
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');
    setFormData(prev => ({ ...prev, cep: e.target.value }));

    if (cep.length === 8) {
      setIsLoadingCep(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            address: `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`,
          }));
        } else {
          setFormData(prev => ({ ...prev, address: '' }));
          alert('CEP não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        alert('Erro ao buscar CEP');
      } finally {
        setIsLoadingCep(false);
      }
    } else {
      setFormData(prev => ({ ...prev, address: '' }));
    }
  };

  const formatCep = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `🚛 *SOLICITAÇÃO DE ORÇAMENTO - CACAMBAS PEREIRA*

*📋 DADOS DO CLIENTE:*
• Nome: ${formData.name}
• Telefone: ${formData.phone}
• E-mail: ${formData.email}

*📍 ENDEREÇO:*
• CEP: ${formData.cep}
• Endereço: ${formData.address}
• Número: ${formData.number}

*🛠️ SERVIÇO SOLICITADO:*
• ${formData.service}

*💬 OBSERVAÇÕES:*
${formData.message || 'Nenhuma observação adicional'}

Aguardo retorno com o orçamento. Obrigado!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=551148637094&text=${encodedMessage}&type=phone_number&app_absent=0`;
    
    window.open(whatsappUrl, '_blank');
  };

  const goBack = () => {
    window.history.back();
  };

  const services = [
    'Transporte de Cargas',
    'Locação de Equipamentos',
    'Coleta de Entulhos',
    'Terraplanagem',
    'Aluguel de Caçambas',
    'Outros'
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefone',
      content: '(11) 4863-7094',
      action: () => window.open('tel:+551148637094'),
    },
    {
      icon: Mail,
      title: 'E-mail',
      content: 'contato@cacambaspereira.com.br',
      action: () => window.open('mailto:contato@cacambaspereira.com.br'),
    },
    {
      icon: MapPin,
      title: 'Localização',
      content: 'São Paulo - SP',
      action: () => {},
    },
    {
      icon: Clock,
      title: 'Atendimento',
      content: 'Seg-Sex: 8h-18h | Sáb: 8h-12h',
      action: () => {},
    },
  ];

  const benefits = [
    'Orçamento gratuito e sem compromisso',
    'Atendimento personalizado',
    'Resposta em até 2 horas',
    'Equipamentos modernos e seguros',
    'Mais de 14 anos de experiência',
    'Cobertura em toda São Paulo'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-primary hover:text-secondary transition-colors duration-300"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Voltar</span>
            </button>
            <div className="text-2xl font-bold text-primary">
              Cacambas <span className="text-secondary">Pereira</span>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6">
            Solicite seu <span className="text-secondary">Orçamento</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Preencha o formulário abaixo e receba um orçamento personalizado para seus projetos. 
            Atendemos toda a região de São Paulo com qualidade e agilidade.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info & Benefits */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div 
                    key={index} 
                    onClick={info.action}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border-l-4 border-primary"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-secondary transition-colors duration-300">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-dark group-hover:text-primary transition-colors duration-300">
                          {info.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{info.content}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-br from-primary to-blue-800 text-white p-8 rounded-xl shadow-xl">
              <h3 className="text-xl font-bold mb-6 text-center">Por que escolher a Cacambas Pereira?</h3>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle size={18} className="text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-xl shadow-xl">
              <h2 className="text-2xl font-bold text-dark mb-8 text-center">
                Formulário de Orçamento
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="(11) 99999-9999"
                      value={formatPhone(formData.phone)}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      CEP *
                    </label>
                    <input
                      type="text"
                      name="cep"
                      placeholder="00000-000"
                      value={formatCep(formData.cep)}
                      onChange={handleCepChange}
                      maxLength={9}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Endereço
                    </label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Preenchido automaticamente"
                      value={formData.address}
                      onChange={handleInputChange}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Número *
                    </label>
                    <input
                      type="text"
                      name="number"
                      placeholder="123"
                      value={formData.number}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Serviço Desejado *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    >
                      <option value="">Selecione um serviço</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Observações Adicionais
                  </label>
                  <textarea
                    name="message"
                    placeholder="Descreva detalhes do seu projeto, quantidade necessária, prazo, etc."
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoadingCep}
                  className="w-full bg-gradient-to-r from-secondary to-orange-600 hover:from-orange-600 hover:to-secondary text-white py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
                    </svg>
                    {isLoadingCep ? 'Buscando CEP...' : 'Enviar Orçamento via WhatsApp'}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-primary to-blue-800 text-white p-8 rounded-xl text-center">
          <h3 className="text-2xl font-bold mb-4">Precisa de Atendimento Imediato?</h3>
          <p className="text-lg mb-6 opacity-90">
            Ligue agora e fale diretamente com nossa equipe especializada
          </p>
          <a
            href="tel:+551148637094"
            className="bg-secondary hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl inline-flex items-center gap-2"
          >
            <Phone size={20} />
            (11) 4863-7094
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContatoPage;