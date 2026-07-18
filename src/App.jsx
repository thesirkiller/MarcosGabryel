import React, { useState, useEffect } from 'react';
import BiosBoot from './components/BiosBoot';
import ThreeCanvas from './components/ThreeCanvas';
import Window from './components/Window';
import ProjectList from './components/ProjectList';
import ContactForm from './components/ContactForm';
import Desktop from './components/Desktop';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [isBooted, setIsBooted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeWindowId, setActiveWindowId] = useState('readme');
  const [selectedProject, setSelectedProject] = useState(null);

  const [windows, setWindows] = useState({
    readme: {
      id: 'readme',
      title: 'README.TXT',
      isOpen: true,
      isMinimized: false,
      defaultPosition: { x: 20, y: 20 },
      defaultSize: { width: 420, height: 350 },
    },
    about: {
      id: 'about',
      title: 'SOBRE_MIM.TXT',
      isOpen: false,
      isMinimized: false,
      defaultPosition: { x: 60, y: 60 },
      defaultSize: { width: 480, height: 430 },
    },
    projects: {
      id: 'projects',
      title: 'MEUS_PROJETOS',
      isOpen: false,
      isMinimized: false,
      defaultPosition: { x: 100, y: 100 },
      defaultSize: { width: 550, height: 450 },
    },
    contact: {
      id: 'contact',
      title: 'ORÇAMENTO.EXE',
      isOpen: false,
      isMinimized: false,
      defaultPosition: { x: 140, y: 40 },
      defaultSize: { width: 480, height: 450 },
    },
    projectDetails: {
      id: 'projectDetails',
      title: 'DETALHES_PROJETO.TXT',
      isOpen: false,
      isMinimized: false,
      defaultPosition: { x: 200, y: 150 },
      defaultSize: { width: 420, height: 400 },
    },
  });

  // Handle mobile screen check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openWindow = (id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true, isMinimized: false },
    }));
    setActiveWindowId(id);
  };

  const closeWindow = (id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false },
    }));
    if (activeWindowId === id) {
      // Set focus to the next open window
      const openWins = Object.keys(windows).filter(
        (key) => windows[key].isOpen && key !== id && !windows[key].isMinimized
      );
      if (openWins.length > 0) {
        setActiveWindowId(openWins[openWins.length - 1]);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  const minimizeWindow = (id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }));
    if (activeWindowId === id) {
      const openWins = Object.keys(windows).filter(
        (key) => windows[key].isOpen && key !== id && !windows[key].isMinimized
      );
      if (openWins.length > 0) {
        setActiveWindowId(openWins[openWins.length - 1]);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  const focusWindow = (id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: false },
    }));
    setActiveWindowId(id);
  };

  const handleOpenProjectDetails = (repo) => {
    setSelectedProject(repo);
    setWindows((prev) => ({
      ...prev,
      projectDetails: {
        ...prev.projectDetails,
        title: `PROJETO: ${repo.name.toUpperCase()}`,
        isOpen: true,
        isMinimized: false,
      },
    }));
    setActiveWindowId('projectDetails');
  };

  if (!isBooted) {
    return <BiosBoot onComplete={() => setIsBooted(true)} />;
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* CRT Display Scanlines and Flicker */}
      <div className="crt-overlay" />

      {/* 3D WebGL Vaporwave Canvas Background */}
      <ErrorBoundary>
        <ThreeCanvas isMobile={isMobile} />
      </ErrorBoundary>

      {/* Retro Desktop Icon Manager and taskbar */}
      <Desktop
        windows={windows}
        openWindow={openWindow}
        minimizeWindow={minimizeWindow}
        closeWindow={closeWindow}
        focusWindow={focusWindow}
        activeWindowId={activeWindowId}
        onOpenProjectDetails={handleOpenProjectDetails}
      />

      {/* Welcome README.TXT Window */}
      <Window
        id="readme"
        title={windows.readme.title}
        isOpen={windows.readme.isOpen && !windows.readme.isMinimized}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        isActive={activeWindowId === 'readme'}
        onFocus={focusWindow}
        defaultPosition={windows.readme.defaultPosition}
        defaultSize={windows.readme.defaultSize}
        isMobile={isMobile}
      >
        <div style={{ fontFamily: 'var(--font-mono)', whiteSpace: 'pre-wrap', fontSize: '12px', lineHeight: '16px' }}>
          {`=========================================
      BEM-VINDO AO GABRYEL.SYS V1.0
=========================================

Este é o portfólio interativo de Marcos Gabryel, desenvolvedor Full Stack focado em entregar códigos eficientes de backend combinados com layouts visuais marcantes.

[ COMO UTILIZAR O DESKTOP ]
-----------------------------------------
- Duplo clique em SOBRE_MIM.TXT para conhecer minhas competências.
- Duplo clique em MEUS_PROJETOS para listar e abrir meus repositórios ativos.
- Duplo clique em ORÇAMENTO.EXE para solicitar um orçamento freelancer de desenvolvimento.
- Arraste, feche ou minimize as janelas utilizando os botões da barra de títulos.

[ CONTATOS ]
-----------------------------------------
WhatsApp: +55 (62) 99443-9086
E-mail: contato.marcosgabryel@outlook.com

Divirta-se explorando a estética digital do final do milênio!`}
        </div>
      </Window>

      {/* About SOBRE_MIM.TXT Window */}
      <Window
        id="about"
        title={windows.about.title}
        isOpen={windows.about.isOpen && !windows.about.isMinimized}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        isActive={activeWindowId === 'about'}
        onFocus={focusWindow}
        defaultPosition={windows.about.defaultPosition}
        defaultSize={windows.about.defaultSize}
        isMobile={isMobile}
      >
        <div style={{ fontFamily: 'var(--font-mono)', whiteSpace: 'pre-wrap', fontSize: '11px', lineHeight: '15px' }}>
          {`# MARCOS GABRYEL - DESENVOLVEDOR FULL STACK
===================================================

Sou um desenvolvedor focado em engenharia de software de ponta a ponta. Meu propósito é construir arquiteturas de backend estáveis e otimizadas e integrá-las a experiências de front-end dinâmicas e interativas.

[ HABILIDADES TÉCNICAS ]
---------------------------------------------------
* Front-End:
  - React.js, Next.js, HTML5, CSS3, JavaScript (ES6+), TypeScript
  - Criação de experiências 3D WebGL (Three.js, React Three Fiber)
  - Animações fluidas a 60 FPS (GSAP, CSS transitions)
  
* Back-End:
  - Node.js, Express, Fastify, APIs RESTful, WebSockets
  - Autenticação e Segurança (JWT, OAuth)
  - Integrações de Pagamento (Stripe, PagSeguro, Pix)
  
* Banco de Dados & Infraestrutura:
  - PostgreSQL, MySQL, SQLite
  - MongoDB, Redis (Caching / Queues)
  - Git, Docker, Deployments em Nuvem (AWS, Vercel, VPS)

[ EXPERIÊNCIA DE ATUAÇÃO ]
---------------------------------------------------
Especializado no desenvolvimento freelancer de produtos digitais customizados: portais corporativos, e-commerces automatizados e ferramentas sob demanda que escalam com o negócio do cliente.

Precisa de um sistema sob medida ou quer tirar uma ideia do papel? Preencha as informações na janela "ORÇAMENTO.EXE" ou chame diretamente no WhatsApp!`}
        </div>
      </Window>

      {/* Projects Explorer Window */}
      <Window
        id="projects"
        title={windows.projects.title}
        isOpen={windows.projects.isOpen && !windows.projects.isMinimized}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        isActive={activeWindowId === 'projects'}
        onFocus={focusWindow}
        defaultPosition={windows.projects.defaultPosition}
        defaultSize={windows.projects.defaultSize}
        isMobile={isMobile}
      >
        <ProjectList onOpenProjectWindow={handleOpenProjectDetails} />
      </Window>

      {/* Contact & Budget Form Window */}
      <Window
        id="contact"
        title={windows.contact.title}
        isOpen={windows.contact.isOpen && !windows.contact.isMinimized}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        isActive={activeWindowId === 'contact'}
        onFocus={focusWindow}
        defaultPosition={windows.contact.defaultPosition}
        defaultSize={windows.contact.defaultSize}
        isMobile={isMobile}
      >
        <ContactForm />
      </Window>

      {/* Selected Project Details Window */}
      <Window
        id="projectDetails"
        title={windows.projectDetails.title}
        isOpen={windows.projectDetails.isOpen && !windows.projectDetails.isMinimized}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        isActive={activeWindowId === 'projectDetails'}
        onFocus={focusWindow}
        defaultPosition={windows.projectDetails.defaultPosition}
        defaultSize={windows.projectDetails.defaultSize}
        isMobile={isMobile}
      >
        {selectedProject ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
            <h4 style={{ margin: '0 0 4px 0', borderBottom: '1px solid #808080', paddingBottom: '6px', fontFamily: 'var(--font-mono)' }}>
              📂 {selectedProject.name}
            </h4>

            {/* Info table */}
            <div className="bevel-in" style={{ padding: '8px', background: '#eaeaea', fontSize: '11px', lineHeight: '16px' }}>
              <div><strong>Linguagem Principal:</strong> {selectedProject.language || 'Não informada'}</div>
              <div><strong>Tamanho do Repositório:</strong> {Math.round(selectedProject.size / 102.4) / 10} MB</div>
              <div><strong>Número de Estrelas:</strong> ⭐ {selectedProject.stargazers_count}</div>
              <div><strong>Última Atualização:</strong> {new Date(selectedProject.updated_at).toLocaleDateString('pt-BR')}</div>
            </div>

            {/* Description */}
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                Descrição do Projeto:
              </label>
              <div 
                className="bevel-in" 
                style={{ 
                  padding: '8px', 
                  background: '#ffffff', 
                  fontSize: '11px', 
                  maxHeight: '100px', 
                  overflowY: 'auto',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                {selectedProject.description || 'Nenhuma descrição foi informada neste repositório do GitHub.'}
              </div>
            </div>

            {/* Retro Action Command Line for Clone */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                Linha de Comando de Clone:
              </label>
              <div 
                className="bevel-in" 
                style={{ 
                  padding: '4px 8px', 
                  background: '#000000', 
                  color: '#00ff00', 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '10px',
                  userSelect: 'text', // Allow the user to select and copy the text
                }}
              >
                git clone {selectedProject.html_url}.git
              </div>
            </div>

            {/* Access Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '4px' }}>
              <button 
                onClick={() => closeWindow('projectDetails')}
                className="bevel-button"
              >
                Fechar
              </button>
              <button 
                onClick={() => window.open(selectedProject.html_url, '_blank')}
                className="bevel-button"
                style={{ 
                  background: 'var(--neon-cyan)', 
                  color: '#000000', 
                  borderColor: '#fff #808080 #808080 #fff',
                  fontWeight: 'bold' 
                }}
              >
                Ver no GitHub 🚀
              </button>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px' }}>Nenhum projeto selecionado.</div>
        )}
      </Window>
    </div>
  );
}

export default App;
