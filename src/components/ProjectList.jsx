import React, { useEffect, useState } from 'react';

// Custom inline SVG icons for retro files/folders with vaporwave tint
const FolderIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 6C2 4.89543 2.89543 4 4 4H12L15 8H28C29.1046 8 30 8.89543 30 10V26C30 27.1046 29.1046 28 28 28H4C2.89543 28 2 27.1046 2 26V6Z" fill="#ff007f" stroke="#00f0ff" strokeWidth="2" />
    <path d="M2 10H30" stroke="#00f0ff" strokeWidth="2" />
    <rect x="7" y="14" width="18" height="10" rx="1" fill="#120136" opacity="0.4" />
  </svg>
);

const FileIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 4C6 2.89543 6.89543 2 8 2H20L26 8V28C26 29.1046 25.1046 30 24 30H8C6.89543 30 6 29.1046 6 28V4Z" fill="#00f0ff" stroke="#ff007f" strokeWidth="2" />
    <path d="M20 2V8H26" stroke="#ff007f" strokeWidth="2" />
    <line x1="10" y1="13" x2="22" y2="13" stroke="#120136" strokeWidth="2" />
    <line x1="10" y1="18" x2="22" y2="18" stroke="#120136" strokeWidth="2" />
    <line x1="10" y1="23" x2="16" y2="23" stroke="#120136" strokeWidth="2" />
  </svg>
);

const ProjectList = ({ onOpenProjectWindow }) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('icons'); // 'icons' or 'details'

  // Fetch GitHub repos
  useEffect(() => {
    fetch('https://api.github.com/users/thesirkiller/repos?sort=updated&per_page=20')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Falha ao obter repositórios da API do GitHub');
        }
        return res.json();
      })
      .then((data) => {
        // Filter out forks if preferred, or keep them
        const filtered = data.filter(repo => !repo.fork);
        setRepos(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
        // Load fallback mock projects so the user doesn't see a blank screen
        setRepos([
          {
            id: 1,
            name: 'gestorcoop',
            description: 'Sistema completo de gestão para cooperativas agrícolas, focado em facilidade de uso e automação de fluxos.',
            language: 'JavaScript',
            stargazers_count: 12,
            html_url: 'https://github.com/thesirkiller/gestorcoop',
            size: 1542,
            updated_at: '2026-07-15T10:00:00Z',
          },
          {
            id: 2,
            name: 'vaporwave-os',
            description: 'Um simulador interativo de desktop Web 1.0 com céu 3D de neon e sintetizador de áudio embutido.',
            language: 'React',
            stargazers_count: 42,
            html_url: 'https://github.com/thesirkiller/vaporwave-os',
            size: 3840,
            updated_at: '2026-07-10T14:30:00Z',
          },
          {
            id: 3,
            name: 'fullstack-saas-template',
            description: 'Boilerplate completo para produtos SaaS com autenticação, pagamentos via Stripe e painel de controle administrativo.',
            language: 'TypeScript',
            stargazers_count: 28,
            html_url: 'https://github.com/thesirkiller/fullstack-saas-template',
            size: 4200,
            updated_at: '2026-07-01T08:20:00Z',
          },
          {
            id: 4,
            name: 'react-three-physics',
            description: 'Experimentos interativos com física em 3D usando react-three-fiber, cannon.js e shaders personalizados.',
            language: 'GLSL',
            stargazers_count: 18,
            html_url: 'https://github.com/thesirkiller/react-three-physics',
            size: 890,
            updated_at: '2026-06-25T17:15:00Z',
          }
        ]);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <p style={{ fontFamily: 'var(--font-mono)', marginBottom: '10px' }}>Carregando Repositórios do GitHub...</p>
        {/* Retro Progress Bar */}
        <div 
          className="bevel-in"
          style={{
            width: '250px',
            height: '22px',
            margin: '0 auto',
            background: '#e0e0e0',
            padding: '2px',
            display: 'flex',
          }}
        >
          <div 
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #ff007f 0%, #00f0ff 100%)',
              width: '65%', // Static loading state representation
              animation: 'progressAnim 2s infinite ease-in-out',
            }}
          />
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes progressAnim {
            0% { width: 5%; }
            50% { width: 85%; }
            100% { width: 100%; }
          }
        `}} />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* File Explorer Menu Bar */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid #808080',
          paddingBottom: '8px',
          marginBottom: '12px',
        }}
      >
        {/* Navigation Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
          <span style={{ color: '#808080' }}>Endereço:</span>
          <div 
            className="bevel-in"
            style={{
              padding: '2px 8px',
              width: '260px',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              backgroundColor: '#fff',
            }}
          >
            C:\GitHub\thesirkiller\repos
          </div>
        </div>

        {/* View Selection Buttons */}
        <div style={{ display: 'flex', gap: '4px' }}>
          <button 
            className="bevel-button"
            style={{ 
              fontWeight: viewMode === 'icons' ? 'bold' : 'normal',
              background: viewMode === 'icons' ? '#dfdfdf' : '#c0c0c0',
            }}
            onClick={() => setViewMode('icons')}
          >
            📊 Ícones
          </button>
          <button 
            className="bevel-button"
            style={{ 
              fontWeight: viewMode === 'details' ? 'bold' : 'normal',
              background: viewMode === 'details' ? '#dfdfdf' : '#c0c0c0',
            }}
            onClick={() => setViewMode('details')}
          >
            📝 Detalhes
          </button>
        </div>
      </div>

      {/* Main File View */}
      <div style={{ flex: 1, minHeight: '260px' }}>
        {error && (
          <div 
            className="bevel-out" 
            style={{ 
              padding: '8px', 
              background: '#ffffcc', 
              color: '#cc0000', 
              fontSize: '12px',
              marginBottom: '10px',
              border: '1px solid #ffcc00'
            }}
          >
            ⚠️ {error}. Carregando projetos do cache local.
          </div>
        )}

        {viewMode === 'icons' ? (
          /* Icons Grid View */
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
              gridGap: '16px',
              padding: '8px',
            }}
          >
            {repos.map((repo) => (
              <div
                key={repo.id}
                onDoubleClick={() => onOpenProjectWindow(repo)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '8px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  borderRadius: '2px',
                  border: '1px dotted transparent',
                }}
                onMouseEnter={(e) => e.currentTarget.style.border = '1px dotted #808080'}
                onMouseLeave={(e) => e.currentTarget.style.border = '1px dotted transparent'}
              >
                <div style={{ marginBottom: '6px' }}>
                  {repo.stargazers_count > 15 ? <FolderIcon /> : <FileIcon />}
                </div>
                <span 
                  style={{
                    fontSize: '11px',
                    wordBreak: 'break-word',
                    color: '#000000',
                    fontWeight: '500',
                    fontFamily: 'var(--font-mono)',
                    lineHeight: '12px',
                  }}
                >
                  {repo.name}
                </span>
                <span style={{ fontSize: '9px', color: '#808080', marginTop: '2px' }}>
                  {repo.language || 'Plain'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          /* Details Table View */
          <div style={{ overflowX: 'auto' }}>
            <table 
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '11px',
                textAlign: 'left',
              }}
            >
              <thead>
                <tr style={{ background: '#dfdfdf', borderBottom: '2px solid #808080' }}>
                  <th style={{ padding: '6px 8px', borderRight: '1px solid #808080' }}>Nome</th>
                  <th style={{ padding: '6px 8px', borderRight: '1px solid #808080' }}>Tipo</th>
                  <th style={{ padding: '6px 8px', borderRight: '1px solid #808080' }}>Linguagem</th>
                  <th style={{ padding: '6px 8px', borderRight: '1px solid #808080' }}>Tamanho</th>
                  <th style={{ padding: '6px 8px' }}>Estrelas</th>
                </tr>
              </thead>
              <tbody>
                {repos.map((repo) => (
                  <tr 
                    key={repo.id}
                    onDoubleClick={() => onOpenProjectWindow(repo)}
                    style={{ 
                      borderBottom: '1px solid #dfdfdf',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 240, 255, 0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '6px 8px', fontWeight: 'bold' }}>
                      📁 {repo.name}
                    </td>
                    <td style={{ padding: '6px 8px', color: '#666' }}>Reposiório GitHub</td>
                    <td style={{ padding: '6px 8px', fontFamily: 'var(--font-mono)' }}>{repo.language || 'N/A'}</td>
                    <td style={{ padding: '6px 8px' }}>{Math.round(repo.size / 102.4) / 10} MB</td>
                    <td style={{ padding: '6px 8px', color: '#ff007f', fontWeight: 'bold' }}>⭐ {repo.stargazers_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary Footer */}
      <div 
        style={{
          borderTop: '2px solid #808080',
          paddingTop: '6px',
          marginTop: '12px',
          fontSize: '11px',
          color: '#808080',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>{repos.length} objeto(s)</span>
        <span>Duplo clique para abrir informações adicionais</span>
      </div>
    </div>
  );
};

export default ProjectList;
