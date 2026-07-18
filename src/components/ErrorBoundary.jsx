import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Vaporwave Canvas Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback to static 2D CSS grid background if WebGL / Drei / Three.js crashes
      return (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, #120136 0%, #0b021d 100%)',
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
          <div 
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '50%',
              backgroundImage: 'linear-gradient(#ff007f 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              transform: 'perspective(200px) rotateX(60deg)',
              transformOrigin: 'top center',
              opacity: 0.35,
            }}
          />
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
