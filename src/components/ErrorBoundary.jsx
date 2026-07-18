import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Vaporwave Desktop Crash caught by boundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div 
          style={{ 
            backgroundColor: '#000000', 
            color: '#00ff00', 
            fontFamily: 'Courier New, monospace', 
            padding: '40px', 
            height: '100vh', 
            width: '100vw',
            boxSizing: 'border-box', 
            overflow: 'auto',
            textAlign: 'left'
          }}
        >
          <h2 style={{ color: '#ff007f', borderBottom: '2px solid #ff007f', paddingBottom: '10px' }}>
            🚨 SYSTEM_CRASH: DESKTOP RENDERING EXCEPTION
          </h2>
          <p style={{ fontSize: '14px', lineHeight: '20px' }}>
            A fatal exception was caught by GABRYEL.SYS error boundary. The system will halt to prevent memory leaks.
          </p>
          
          <div style={{ marginTop: '20px' }}>
            <span style={{ color: '#00f0ff', fontWeight: 'bold' }}>ERROR MESSAGE:</span>
            <pre 
              style={{ 
                background: '#120136', 
                color: '#ff80bf', 
                padding: '12px', 
                border: '1.5px solid #00f0ff',
                whiteSpace: 'pre-wrap',
                fontSize: '12px'
              }}
            >
              {this.state.error ? this.state.error.toString() : 'Unknown JavaScript Exception'}
            </pre>
          </div>

          <div style={{ marginTop: '20px' }}>
            <span style={{ color: '#00f0ff', fontWeight: 'bold' }}>COMPONENT STACK TRACE:</span>
            <pre 
              style={{ 
                background: '#120136', 
                color: '#fff', 
                padding: '12px', 
                border: '1.5px solid #ff007f',
                whiteSpace: 'pre-wrap',
                fontSize: '11px',
                maxHeight: '300px',
                overflowY: 'auto'
              }}
            >
              {this.state.errorInfo ? this.state.errorInfo.componentStack : 'No component stack trace captured.'}
            </pre>
          </div>

          <div style={{ marginTop: '30px' }}>
            <button 
              onClick={() => window.location.reload()}
              style={{
                background: '#ff007f',
                color: '#ffffff',
                border: '2px solid',
                borderColor: '#fff #800040 #800040 #fff',
                padding: '8px 24px',
                fontSize: '13px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              REBOOT DESKTOP
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
