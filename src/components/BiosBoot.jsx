import React, { useEffect, useState } from 'react';

const BiosBoot = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [showCursor, setShowCursor] = useState(true);

  const bootSequence = [
    "MARCOS GABRYEL BIOS V4.91 (C) 1998-2026",
    "CPU: AMD RYZEN 9 5900X @ 3.70GHz",
    "MEMORY TEST: 65536MB OK",
    "SYSTEM DETECTED: BRAND PORTFOLIO DESKTOP",
    "----------------------------------------",
    "LOADING GITHUB API CONSOLE...",
    "TARGET USERNAME: 'thesirkiller'... CONNECTED",
    "FETCHING PROJECTS SUMMARY...",
    "VAPORWAVE GRID ENGINE... ACTIVE",
    "CRT PHOSPHOR FILTER... INITIALIZED",
    "SOUND DRIVER: SOUND BLASTER 16... EMULATED",
    "THREE.JS WEBGL SHADER CACHE... OPTIMIZED",
    "----------------------------------------",
    "BOOT SUCCESSFUL. LOADING DESKTOP...",
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < bootSequence.length) {
        setLines((prev) => [...prev, bootSequence[index]]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 800); // Wait 800ms before auto redirecting to desktop
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (lines.length >= bootSequence.length) {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [lines]);

  const handleScreenClick = () => {
    if (lines.length >= bootSequence.length) {
      onComplete();
    }
  };

  return (
    <div className="bios-screen" onClick={handleScreenClick}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
        {lines.map((line, idx) => (
          <div key={idx} style={{ marginBottom: '8px', color: '#00ff00', fontSmooth: 'never' }}>
            {line.startsWith("BOOT SUCCESSFUL") ? (
              <span style={{ color: '#00f0ff', fontWeight: 'bold' }}>{line}</span>
            ) : line.includes("ACTIVE") || line.includes("OK") || line.includes("CONNECTED") ? (
              <span>
                {line.substring(0, line.indexOf("ACTIVE") !== -1 ? line.indexOf("ACTIVE") : line.indexOf("OK") !== -1 ? line.indexOf("OK") : line.indexOf("CONNECTED"))}
                <span style={{ color: '#ff007f' }}>
                  {line.includes("ACTIVE") ? "ACTIVE" : line.includes("OK") ? "OK" : "CONNECTED"}
                </span>
              </span>
            ) : (
              line
            )}
          </div>
        ))}
        {lines.length >= bootSequence.length && (
          <div style={{ marginTop: '20px' }}>
            <span className="bios-cursor"></span>
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onComplete();
          }}
          className="bevel-button"
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            background: '#ff007f',
            color: '#fff',
            borderColor: '#ff80bf #800040 #800040 #ff80bf',
            fontWeight: 'bold',
            padding: '5px 15px',
          }}
        >
          SKIP BOOT
        </button>
      </div>
    </div>
  );
};

export default BiosBoot;
