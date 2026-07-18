import React, { useState, useRef, useEffect } from 'react';

const Window = ({
  id,
  title,
  isOpen,
  onClose,
  onMinimize,
  isActive,
  onFocus,
  children,
  defaultPosition = { x: 50, y: 50 },
  defaultSize = { width: 500, height: 400 },
  isMobile = false,
}) => {
  const [position, setPosition] = useState(defaultPosition);
  const [size, setSize] = useState(defaultSize);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const windowRef = useRef(null);

  // Focus window on mouse down anywhere in the window
  const handleMouseDown = () => {
    onFocus(id);
  };

  // Dragging logic
  const handleTitleMouseDown = (e) => {
    if (isMaximized || isMobile) return;
    onFocus(id);
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      // Calculate new position
      let newX = e.clientX - dragStart.current.x;
      let newY = e.clientY - dragStart.current.y;

      // Keep window within reasonable bounds of screen
      const minVisible = 50;
      if (newY < 0) newY = 0; // Don't let title bar go above viewport
      if (newY > window.innerHeight - 80) newY = window.innerHeight - 80;
      if (newX < -size.width + minVisible) newX = -size.width + minVisible;
      if (newX > window.innerWidth - minVisible) newX = window.innerWidth - minVisible;

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, size]);

  const toggleMaximize = () => {
    if (isMobile) return;
    setIsMaximized(!isMaximized);
  };

  if (!isOpen) return null;

  // Window styling depending on states (Active, Maximized, Mobile)
  const windowStyle = {
    position: 'absolute',
    left: isMobile || isMaximized ? 0 : `${position.x}px`,
    top: isMobile || isMaximized ? 0 : `${position.y}px`,
    width: isMobile || isMaximized ? '100vw' : `${size.width}px`,
    height: isMobile || isMaximized ? 'calc(100vh - 40px)' : `${size.height}px`, // 40px taskbar
    zIndex: isActive ? 100 : 50,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    pointerEvents: 'auto',
    transition: isDragging ? 'none' : 'width 0.15s, height 0.15s, left 0.15s, top 0.15s',
  };

  return (
    <div 
      ref={windowRef}
      className="bevel-out" 
      style={windowStyle}
      onMouseDown={handleMouseDown}
    >
      {/* Title Bar */}
      <div 
        onMouseDown={handleTitleMouseDown}
        onDoubleClick={toggleMaximize}
        style={{
          height: '24px',
          background: isActive 
            ? 'linear-gradient(90deg, #ff007f 0%, #00f0ff 100%)' 
            : '#808080',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '2px 4px',
          cursor: isMaximized || isMobile ? 'default' : 'move',
          color: isActive ? '#ffffff' : '#dfdfdf',
          fontWeight: 'bold',
          fontSize: '13px',
          fontFamily: 'var(--font-mono)',
          textShadow: isActive ? '1px 1px 0px rgba(0,0,0,0.5)' : 'none',
        }}
      >
        {/* Title & Icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ fontSize: '14px' }}>📟</span>
          <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            {title}
          </span>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '3px' }}>
          {/* Minimize Button */}
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize(id); }}
            className="bevel-button"
            style={{
              width: '16px',
              height: '16px',
              padding: 0,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              fontWeight: 'bold',
              lineHeight: '12px',
              background: '#c0c0c0',
            }}
          >
            <span style={{ position: 'relative', bottom: '2px', fontSize: '9px' }}>_</span>
          </button>
          
          {/* Maximize Button */}
          {!isMobile && (
            <button 
              onClick={(e) => { e.stopPropagation(); toggleMaximize(); }}
              className="bevel-button"
              style={{
                width: '16px',
                height: '16px',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                lineHeight: '10px',
                background: '#c0c0c0',
                fontSize: '10px',
              }}
            >
              {isMaximized ? '🗗' : '🗖'}
            </button>
          )}

          {/* Close Button */}
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(id); }}
            className="bevel-button"
            style={{
              width: '16px',
              height: '16px',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              lineHeight: '14px',
              background: '#ff007f',
              color: '#ffffff',
              borderColor: '#ff80bf #800040 #800040 #ff80bf',
            }}
          >
            <span style={{ fontSize: '10px' }}>✕</span>
          </button>
        </div>
      </div>

      {/* Client Window Body */}
      <div 
        className="retro-scroll"
        style={{
          flex: 1,
          padding: '12px',
          background: '#ffffff',
          color: '#000000',
          overflowY: 'auto',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'inset 1.5px 1.5px 0px #808080, inset -1.5px -1.5px 0px #ffffff',
          margin: '2px',
        }}
      >
        {children}
      </div>

      {/* Optional Status Bar */}
      <div 
        style={{
          height: '20px',
          background: '#c0c0c0',
          borderTop: '2px solid #ffffff',
          display: 'flex',
          alignItems: 'center',
          padding: '0 4px',
          fontSize: '11px',
          color: '#404040',
          fontFamily: 'var(--font-mono)',
          justifyContent: 'space-between',
        }}
      >
        <div>System Status: Ready</div>
        <div style={{ borderLeft: '1px solid #808080', paddingLeft: '8px' }}>
          thesirkiller.sys
        </div>
      </div>
    </div>
  );
};

export default Window;
