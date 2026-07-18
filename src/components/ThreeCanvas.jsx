import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

// Grid component that moves to create the illusion of travel
const MovingGrid = () => {
  const gridRef = useRef();

  useFrame((state, delta) => {
    if (gridRef.current) {
      // Speed of grid movement
      gridRef.current.position.z += delta * 1.5;
      // Loop the position to make it seamless
      if (gridRef.current.position.z >= 2) {
        gridRef.current.position.z = 0;
      }
    }
  });

  return (
    <group ref={gridRef}>
      <gridHelper 
        args={[80, 40, '#ff007f', '#00f0ff']} 
        position={[0, -2, 0]} 
      />
      <gridHelper 
        args={[80, 40, '#ff007f', '#00f0ff']} 
        position={[0, -2, -80]} 
      />
    </group>
  );
};

// Floating retro shapes
const FloatingShape = ({ position, type, color }) => {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.4 + position[0];
      meshRef.current.rotation.y = t * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(t + position[0]) * 0.4;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      {type === 'torus' ? (
        <torusGeometry args={[0.8, 0.3, 8, 24]} />
      ) : type === 'octahedron' ? (
        <octahedronGeometry args={[0.9]} />
      ) : (
        <coneGeometry args={[0.8, 1.5, 4]} />
      )}
      <meshBasicMaterial color={color} wireframe />
    </mesh>
  );
};

const ThreeCanvas = ({ isMobile }) => {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const detectWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    };
    setWebglSupported(detectWebGL());
  }, []);

  // If WebGL is not supported, or it's a mobile viewport, fall back to pure CSS background
  if (isMobile || !webglSupported) {
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
        {/* Simple CSS Vaporwave Grid for mobile */}
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
            opacity: 0.3,
          }}
        />
      </div>
    );
  }

  return (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none', // Allow clicking desktop icons through the canvas background
      }}
    >
      {/* Synthwave Sun Background (CSS Element behind WebGL Canvas) */}
      <div 
        style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'linear-gradient(to bottom, #ff007f 0%, #ff80bf 30%, #00f0ff 90%, transparent 100%)',
          boxShadow: '0 0 40px #ff007f',
          maskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 50%, black 55%, black 65%, transparent 65%, black 70%, black 77%, transparent 77%, black 81%, black 86%, transparent 86%, black 89%, black 93%, transparent 93%, black 95%, black 97%, transparent 97%, black 99%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 50%, black 55%, black 65%, transparent 65%, black 70%, black 77%, transparent 77%, black 81%, black 86%, transparent 86%, black 89%, black 93%, transparent 93%, black 95%, black 97%, transparent 97%, black 99%, black 100%)',
          opacity: 0.8,
        }}
      />

      <Canvas
        camera={{ position: [0, 2, 8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
          <MovingGrid />
          <FloatingShape position={[-4, 3, -5]} type="torus" color="#00f0ff" />
          <FloatingShape position={[4, 2, -6]} type="octahedron" color="#ff007f" />
          <FloatingShape position={[-3, 0.5, -2]} type="cone" color="#ff007f" />
          <FloatingShape position={[3.5, 0, -3]} type="torus" color="#00f0ff" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;
