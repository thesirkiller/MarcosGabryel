import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Full-Stack Development',
    budget: 'Under R$ 5,000',
    description: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const services = [
    'Full-Stack Development',
    'Landing Page Premium / Institucional',
    'Integração e E-commerce',
    'Aplicações Interativas / 3D WebGL',
    'Outro (Especificar na mensagem)',
  ];

  const budgets = [
    'Sob Consulta / Sob Demanda',
    'Até R$ 5.000',
    'R$ 5.000 a R$ 10.000',
    'R$ 10.000 a R$ 20.000',
    'Acima de R$ 20.000',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.name.trim()) {
      setError('Por favor, informe seu nome.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }
    if (!formData.description.trim()) {
      setError('Por favor, descreva brevemente seu projeto.');
      return;
    }

    setSubmitted(true);
  };

  const triggerWhatsApp = () => {
    // Prefill WhatsApp text
    const text = `Olá Marcos! Me chamo ${formData.name} (${formData.email}). Gostaria de fazer um orçamento para um projeto de ${formData.service} com orçamento estimado em ${formData.budget}. Detalhes: ${formData.description}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/5562994439086?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      service: 'Full-Stack Development',
      budget: 'Under R$ 5,000',
      description: '',
    });
    setSubmitted(false);
    setError('');
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '30px 10px' }}>
        <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎉</div>
        <h3 style={{ fontFamily: 'var(--font-mono)', color: 'var(--neon-pink)', margin: '0 0 10px 0' }}>
          Formulário Enviado!
        </h3>
        <p style={{ fontSize: '13px', lineHeight: '18px', marginBottom: '20px' }}>
          Obrigado, <strong>{formData.name}</strong>. Seus dados de contato e do projeto de{' '}
          <strong>{formData.service}</strong> foram registrados.
        </p>

        {/* WhatsApp Redirection Button */}
        <div className="bevel-out" style={{ padding: '16px', background: '#e0e0e0', marginBottom: '20px' }}>
          <p style={{ fontSize: '12px', marginBottom: '12px' }}>
            Para agilizar o atendimento e obter uma resposta imediata, envie as informações diretamente pelo WhatsApp:
          </p>
          <button 
            onClick={triggerWhatsApp}
            className="bevel-button"
            style={{
              background: '#25D366',
              color: '#ffffff',
              borderColor: '#8cecae #075e23 #075e23 #8cecae',
              fontWeight: 'bold',
              fontSize: '13px',
              padding: '6px 16px',
            }}
          >
            💬 Enviar via WhatsApp
          </button>
        </div>

        <button onClick={resetForm} className="bevel-button">
          Enviar Outra Mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h3 style={{ fontFamily: 'var(--font-mono)', margin: '0 0 4px 0', borderBottom: '1px solid #808080', paddingBottom: '6px' }}>
        Orçamento / Contato Comercial
      </h3>

      {error && (
        <div 
          className="bevel-out" 
          style={{ 
            padding: '6px 12px', 
            background: '#ffcccc', 
            color: '#cc0000', 
            fontSize: '11px',
            fontWeight: 'bold' 
          }}
        >
          ❌ Error: {error}
        </div>
      )}

      {/* Field: Name */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '11px', fontWeight: 'bold' }}>Nome / Empresa:</label>
        <input 
          type="text" 
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="bevel-in"
          style={{ padding: '4px 8px', fontSize: '12px', width: '100%' }}
          placeholder="Ex: João Silva ou Empresa XYZ"
        />
      </div>

      {/* Field: Email */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '11px', fontWeight: 'bold' }}>E-mail de Contato:</label>
        <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="bevel-in"
          style={{ padding: '4px 8px', fontSize: '12px', width: '100%' }}
          placeholder="Ex: joao@email.com"
        />
      </div>

      {/* Grid for Selector Fields */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {/* Field: Service type */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '11px', fontWeight: 'bold' }}>Serviço Desejado:</label>
          <select 
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            className="bevel-in"
            style={{ padding: '3px 6px', fontSize: '11px', height: '26px' }}
          >
            {services.map((srv, idx) => (
              <option key={idx} value={srv}>{srv}</option>
            ))}
          </select>
        </div>

        {/* Field: Budget */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '11px', fontWeight: 'bold' }}>Orçamento Estimado:</label>
          <select 
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            className="bevel-in"
            style={{ padding: '3px 6px', fontSize: '11px', height: '26px' }}
          >
            {budgets.map((bdg, idx) => (
              <option key={idx} value={bdg}>{bdg}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Field: Description */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '11px', fontWeight: 'bold' }}>Descrição do Projeto:</label>
        <textarea 
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="bevel-in"
          style={{ 
            padding: '6px 8px', 
            fontSize: '12px', 
            width: '100%', 
            height: '80px', 
            resize: 'none',
            fontFamily: 'inherit'
          }}
          placeholder="Descreva as funcionalidades e objetivos do produto..."
        />
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
        <button 
          type="button" 
          onClick={resetForm}
          className="bevel-button"
        >
          Limpar
        </button>
        <button 
          type="submit"
          className="bevel-button"
          style={{ 
            background: 'var(--neon-pink)', 
            color: '#fff', 
            borderColor: '#ff80bf #800040 #800040 #ff80bf',
            fontWeight: 'bold' 
          }}
        >
          Enviar Orçamento
        </button>
      </div>

      {/* Direct WhatsApp Callout */}
      <div 
        className="bevel-out" 
        style={{ 
          marginTop: '6px', 
          padding: '8px', 
          background: '#eaeaea', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <span style={{ fontSize: '10px', color: '#404040' }}>Deseja conversar diretamente?</span>
        <button 
          type="button"
          onClick={() => window.open('https://wa.me/5562994439086', '_blank')}
          className="bevel-button"
          style={{
            background: '#25D366',
            color: '#ffffff',
            borderColor: '#8cecae #075e23 #075e23 #8cecae',
            fontWeight: 'bold',
            fontSize: '10px',
            padding: '2px 8px',
          }}
        >
          WhatsApp Direto
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
