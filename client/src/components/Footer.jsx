import React, { useEffect, useRef } from "react";
import * as THREE from "three";

import logo from "../../images/logo.png";

// Three.js Animated Background Component
const AnimatedBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.6,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create floating geometric shapes
    const shapes = [];
    const shapeGeometry = new THREE.OctahedronGeometry(0.1);
    const shapeMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.3,
      wireframe: true,
    });

    for (let i = 0; i < 15; i++) {
      const shape = new THREE.Mesh(shapeGeometry, shapeMaterial);
      shape.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 20
      );
      shape.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      shapes.push(shape);
      scene.add(shape);
    }

    // Create connecting lines
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particlesCount * 6);
    
    for (let i = 0; i < particlesCount * 6; i++) {
      linePositions[i] = (Math.random() - 0.5) * 20;
    }
    
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.1,
    });
    
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate particles
      particlesMesh.rotation.x += 0.001;
      particlesMesh.rotation.y += 0.002;

      // Rotate shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.005 + index * 0.001;
        shape.rotation.y += 0.003 + index * 0.002;
        shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
      });

      // Rotate lines
      lines.rotation.x += 0.0005;
      lines.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" />;
};

const Footer = () => (
  <div className="w-full gradient-bg-footer relative overflow-hidden">
    {/* Three.js Animated Background */}
    <AnimatedBackground />
    
    {/* Content */}
    <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
      {/* Main Content */}
      <div className="flex flex-col items-center text-center space-y-8">
        {/* Logo */}
        <div className="relative">
          <img src={logo} alt="logo" className="w-24 mx-auto" />
          {/* Glow effect around logo */}
          <div className="absolute inset-0 w-24 h-24 mx-auto bg-blue-500/20 rounded-full blur-xl animate-pulse" />
        </div>
        
        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-8">
          <a href="#" className="text-white/70 hover:text-white transition-all duration-300 text-sm hover:scale-105">
            Market
          </a>
          <a href="#" className="text-white/70 hover:text-white transition-all duration-300 text-sm hover:scale-105">
            Exchange
          </a>
          <a href="#" className="text-white/70 hover:text-white transition-all duration-300 text-sm hover:scale-105">
            Tutorials
          </a>
          <a href="#" className="text-white/70 hover:text-white transition-all duration-300 text-sm hover:scale-105">
            Wallets
          </a>
        </div>
        
        {/* Description */}
        <p className="text-white/60 text-sm max-w-md leading-relaxed">
          The best choice for buying and selling your <span className="text-editorial">crypto</span> assets
        </p>
        
        {/* Contact */}
        <p className="text-white/50 text-xs hover:text-white/70 transition-colors duration-300 cursor-pointer">
          contact@krypto.com
        </p>
      </div>
      
      {/* Bottom */}
      <div className="border-t border-white/10 mt-12 pt-6">
        <p className="text-white/40 text-xs text-center">
          © 2025 <span className="text-editorial">Krypto</span>. All rights reserved.
        </p>
      </div>
    </div>
  </div>
);

export default Footer;