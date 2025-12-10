import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    cep: '',
    address: '',
    number: '',
  });
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    
    const message = `Olá! Gostaria de solicitar um orçamento para os serviços da Cacambas Pereira.

*Dados do Cliente:*
Nome: ${formData.name}
Telefone: ${formData.phone}
CEP: ${formData.cep}
Endereço: ${formData.address}
Número: ${formData.number}

Aguardo retorno. Obrigado!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=5511922031170&text=${encodedMessage}&type=phone_number&app_absent=0`;
    
    window.open(whatsappUrl, '_blank');
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefones',
      content: ['(11) 5192-6487'],
    },
    {
      icon: Mail,
      title: 'E-mail',
      content: ['contato@cacambaspereira.com.br'],
    },
    {
      icon: MapPin,
      title: 'Endereço',
      content: ['Rua Da Paz, 1234 - Chácara Santo Antônio', 'São Paulo - SP, CEP: 04713-001'],
    },
    {
      icon: Clock,
      title: 'Horário de Atendimento',
      content: ['Segunda a Sexta: 8h às 18h', 'Sábado: 8h às 12h'],
    },
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">Entre em Contato</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-dark mb-2">{info.title}</h3>
                    {info.content.map((item, idx) => (
                      <p key={idx} className="text-gray-600">{item}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-gray-50 p-8 rounded-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder="Seu Nome"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Seu Telefone"
                value={formatPhone(formData.phone)}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
              <input
                type="text"
                name="cep"
                placeholder="CEP"
                value={formatCep(formData.cep)}
                onChange={handleCepChange}
                maxLength={9}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
              <input
                type="text"
                name="address"
                placeholder="Endereço (preenchido automaticamente)"
                value={formData.address}
                onChange={handleInputChange}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 outline-none transition-all"
              />
              <input
                type="text"
                name="number"
                placeholder="Número"
                value={formData.number}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
              <button
                type="submit"
                disabled={isLoadingCep}
                className="w-full bg-secondary hover:bg-orange-600 text-white py-3 rounded-lg font-bold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                <span className="relative z-10">
                {isLoadingCep ? 'Buscando CEP...' : 'Enviar para WhatsApp'}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;