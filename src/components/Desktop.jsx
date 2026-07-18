import React, { useState, useEffect } from 'react';
import { MessageSquare, User, Folder, Mail } from 'lucide-react';

const GithubIcon = ({ size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Desktop = ({
  windows,
  openWindow,
  minimizeWindow,
  closeWindow,
  focusWindow,
  activeWindowId,
  onOpenProjectDetails,
}) => {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [time, setTime] = useState('');

  // Clock update effect
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close Start Menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = () => {
      if (startMenuOpen) setStartMenuOpen(false);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [startMenuOpen]);

  const toggleStartMenu = (e) => {
    e.stopPropagation();
    setStartMenuOpen(!startMenuOpen);
  };

  const handleShortcutDoubleClick = (id) => {
    openWindow(id);
  };

  const handleStartMenuItemClick = (id) => {
    openWindow(id);
    setStartMenuOpen(false);
  };

  return (
    <div 
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 5,
        pointerEvents: 'none', // Allow passing click to background canvas if needed (we set pointerEvents: auto on clickable items)
      }}
    >
      {/* Desktop Icons Area */}
      <div className="desktop-icons">
        {/* Shortcut: About Me */}
        <div 
          className="desktop-icon" 
          onDoubleClick={() => handleShortcutDoubleClick('about')}
          onTouchEnd={() => handleShortcutDoubleClick('about')}
        >
          <div style={{
            background: 'var(--vapor-gradient)',
            borderRadius: '4px',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '2px 2px 0px rgba(0,0,0,0.5)',
          }}>
            <User size={24} />
          </div>
          <span>SOBRE_MIM.TXT</span>
        </div>

        {/* Shortcut: Projects */}
        <div 
          className="desktop-icon" 
          onDoubleClick={() => handleShortcutDoubleClick('projects')}
          onTouchEnd={() => handleShortcutDoubleClick('projects')}
        >
          <div style={{
            background: 'var(--vapor-gradient)',
            borderRadius: '4px',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '2px 2px 0px rgba(0,0,0,0.5)',
          }}>
            <Folder size={24} />
          </div>
          <span>MEUS_PROJETOS</span>
        </div>

        {/* Shortcut: Contact */}
        <div 
          className="desktop-icon" 
          onDoubleClick={() => handleShortcutDoubleClick('contact')}
          onTouchEnd={() => handleShortcutDoubleClick('contact')}
        >
          <div style={{
            background: 'var(--vapor-gradient)',
            borderRadius: '4px',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '2px 2px 0px rgba(0,0,0,0.5)',
          }}>
            <Mail size={24} />
          </div>
          <span>ORÇAMENTO.EXE</span>
        </div>

        {/* Shortcut: External GitHub */}
        <div 
          className="desktop-icon" 
          onDoubleClick={() => window.open('https://github.com/thesirkiller', '_blank')}
          onTouchEnd={() => window.open('https://github.com/thesirkiller', '_blank')}
        >
          <div style={{
            background: 'rgba(0,0,0,0.8)',
            border: '2px solid var(--neon-cyan)',
            borderRadius: '4px',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--neon-cyan)',
            boxShadow: '2px 2px 0px rgba(0,0,0,0.5)',
          }}>
            <GithubIcon size={24} />
          </div>
          <span>MEU_GITHUB.LNK</span>
        </div>

        {/* Shortcut: WhatsApp Direct */}
        <div 
          className="desktop-icon" 
          onDoubleClick={() => window.open('https://wa.me/5562994439086', '_blank')}
          onTouchEnd={() => window.open('https://wa.me/5562994439086', '_blank')}
        >
          <div style={{
            background: 'rgba(0,0,0,0.8)',
            border: '2px solid var(--neon-pink)',
            borderRadius: '4px',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--neon-pink)',
            boxShadow: '2px 2px 0px rgba(0,0,0,0.5)',
          }}>
            <MessageSquare size={24} />
          </div>
          <span>WHATSAPP.LNK</span>
        </div>
      </div>

      {/* Taskbar Bottom */}
      <div 
        className="bevel-out"
        style={{
          height: '40px',
          background: '#c0c0c0',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '2px 4px',
          borderTop: '2px solid #ffffff',
          boxShadow: '0 -2px 5px rgba(0,0,0,0.2)',
          pointerEvents: 'auto',
        }}
      >
        {/* Start Button & Active Window Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '100%', flex: 1, overflow: 'hidden' }}>
          
          {/* Start Menu Trigger */}
          <button 
            onClick={toggleStartMenu}
            className="bevel-button"
            style={{
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 'bold',
              fontSize: '13px',
              fontFamily: 'var(--font-mono)',
              padding: '0 8px',
              background: startMenuOpen ? '#e0e0e0' : 'var(--window-bg)',
              boxShadow: startMenuOpen ? 'inset 2px 2px 0px #808080' : 'none',
              border: '2px solid',
              borderColor: startMenuOpen 
                ? 'var(--metallic-dark) var(--metallic-light) var(--metallic-light) var(--metallic-dark)'
                : 'var(--metallic-light) var(--metallic-dark) var(--metallic-dark) var(--metallic-light)',
            }}
          >
            <span style={{ fontSize: '15px' }}>🕹️</span>
            <span>INICIAR</span>
          </button>

          {/* Start Menu Container */}
          {startMenuOpen && (
            <div 
              className="bevel-out"
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                bottom: '40px',
                left: '4px',
                width: '180px',
                zIndex: 2000,
                display: 'flex',
                background: '#c0c0c0',
              }}
            >
              {/* Start Menu Sidebar banner */}
              <div 
                style={{
                  width: '28px',
                  background: 'var(--vapor-gradient)',
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  letterSpacing: '2px',
                  padding: '8px 0',
                  textShadow: '1px 1px 0px rgba(0,0,0,0.5)',
                }}
              >
                GABRYEL.SYS
              </div>

              {/* Start Menu List Items */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '2px 0' }}>
                <div 
                  onClick={() => handleStartMenuItemClick('about')}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', fontSize: '11px', cursor: 'pointer', color: '#000' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--vapor-gradient)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span>📝</span> <span>Sobre Mim</span>
                </div>
                <div 
                  onClick={() => handleStartMenuItemClick('projects')}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', fontSize: '11px', cursor: 'pointer', color: '#000' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--vapor-gradient)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span>📁</span> <span>Meus Projetos</span>
                </div>
                <div 
                  onClick={() => handleStartMenuItemClick('contact')}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', fontSize: '11px', cursor: 'pointer', color: '#000' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--vapor-gradient)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span>📧</span> <span>Contato</span>
                </div>

                <hr style={{ border: 'none', borderBottom: '1px solid #808080', borderTop: '1px solid #fff', margin: '4px 0' }} />

                <div 
                  onClick={() => { window.open('https://github.com/thesirkiller', '_blank'); setStartMenuOpen(false); }}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', fontSize: '11px', cursor: 'pointer', color: '#000' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--vapor-gradient)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span>🐙</span> <span>GitHub</span>
                </div>
                <div 
                  onClick={() => { window.open('https://wa.me/5562994439086', '_blank'); setStartMenuOpen(false); }}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', fontSize: '11px', cursor: 'pointer', color: '#000' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--vapor-gradient)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span>💬</span> <span>WhatsApp</span>
                </div>
              </div>
            </div>
          )}

          {/* Active Window Tabs */}
          <div style={{ display: 'flex', gap: '4px', flex: 1, overflowX: 'auto', paddingRight: '10px', height: '100%', alignItems: 'center' }} className="retro-scroll">
            {Object.keys(windows).map((winId) => {
              const win = windows[winId];
              if (!win.isOpen) return null;
              
              const isTabActive = activeWindowId === winId;

              return (
                <button
                  key={winId}
                  onClick={() => {
                    if (isTabActive) {
                      minimizeWindow(winId);
                    } else {
                      focusWindow(winId);
                    }
                  }}
                  className="bevel-button"
                  style={{
                    height: '28px',
                    width: '120px',
                    minWidth: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '0 6px',
                    fontSize: '11px',
                    textAlign: 'left',
                    fontWeight: isTabActive ? 'bold' : 'normal',
                    backgroundColor: isTabActive ? '#dfdfdf' : '#c0c0c0',
                    border: '2px solid',
                    borderColor: isTabActive
                      ? 'var(--metallic-dark) var(--metallic-light) var(--metallic-light) var(--metallic-dark)'
                      : 'var(--metallic-light) var(--metallic-dark) var(--metallic-dark) var(--metallic-light)',
                    boxShadow: isTabActive ? 'inset 1.5px 1.5px 0px #808080' : 'none',
                  }}
                >
                  <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    📟 {win.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* System Tray (Clock & Settings) */}
        <div 
          className="bevel-in"
          style={{
            height: '28px',
            padding: '0 8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#c0c0c0',
            fontSize: '11px',
            color: '#000000',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <span style={{ textShadow: 'none' }}>🔊</span>
          <span style={{ textShadow: 'none' }}>💻</span>
          <span style={{ borderLeft: '1px solid #808080', paddingLeft: '8px', textShadow: 'none' }}>
            {time}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Desktop;
