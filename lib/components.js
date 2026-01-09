'use client'

import { useState, useEffect } from 'react'
import { PIGEON_FRAMES, SCROLL } from './assets'

// ===== PIXEL CLOUD SVG =====
export const PixelCloud = ({ size = 1, opacity = 0.6 }) => (
  <svg 
    viewBox="0 0 48 20" 
    style={{ 
      width: `${48 * size}px`, 
      height: `${20 * size}px`,
      imageRendering: 'pixelated',
      opacity
    }}
  >
    <rect x="12" y="0" width="4" height="4" fill="white"/>
    <rect x="16" y="0" width="4" height="4" fill="white"/>
    <rect x="20" y="0" width="4" height="4" fill="white"/>
    <rect x="8" y="4" width="4" height="4" fill="white"/>
    <rect x="12" y="4" width="4" height="4" fill="white"/>
    <rect x="16" y="4" width="4" height="4" fill="white"/>
    <rect x="20" y="4" width="4" height="4" fill="white"/>
    <rect x="24" y="4" width="4" height="4" fill="white"/>
    <rect x="28" y="4" width="4" height="4" fill="white"/>
    <rect x="4" y="8" width="4" height="4" fill="white"/>
    <rect x="8" y="8" width="4" height="4" fill="white"/>
    <rect x="12" y="8" width="4" height="4" fill="white"/>
    <rect x="16" y="8" width="4" height="4" fill="white"/>
    <rect x="20" y="8" width="4" height="4" fill="white"/>
    <rect x="24" y="8" width="4" height="4" fill="white"/>
    <rect x="28" y="8" width="4" height="4" fill="white"/>
    <rect x="32" y="8" width="4" height="4" fill="white"/>
    <rect x="36" y="8" width="4" height="4" fill="white"/>
    <rect x="0" y="12" width="4" height="4" fill="white"/>
    <rect x="4" y="12" width="4" height="4" fill="white"/>
    <rect x="8" y="12" width="4" height="4" fill="white"/>
    <rect x="12" y="12" width="4" height="4" fill="white"/>
    <rect x="16" y="12" width="4" height="4" fill="white"/>
    <rect x="20" y="12" width="4" height="4" fill="white"/>
    <rect x="24" y="12" width="4" height="4" fill="white"/>
    <rect x="28" y="12" width="4" height="4" fill="white"/>
    <rect x="32" y="12" width="4" height="4" fill="white"/>
    <rect x="36" y="12" width="4" height="4" fill="white"/>
    <rect x="40" y="12" width="4" height="4" fill="white"/>
    <rect x="44" y="12" width="4" height="4" fill="white"/>
    <rect x="4" y="16" width="4" height="4" fill="white"/>
    <rect x="8" y="16" width="4" height="4" fill="white"/>
    <rect x="12" y="16" width="4" height="4" fill="white"/>
    <rect x="16" y="16" width="4" height="4" fill="white"/>
    <rect x="20" y="16" width="4" height="4" fill="white"/>
    <rect x="24" y="16" width="4" height="4" fill="white"/>
    <rect x="28" y="16" width="4" height="4" fill="white"/>
    <rect x="32" y="16" width="4" height="4" fill="white"/>
    <rect x="36" y="16" width="4" height="4" fill="white"/>
    <rect x="40" y="16" width="4" height="4" fill="white"/>
  </svg>
)

// ===== FLOATING CLOUDS =====
export const FloatingClouds = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
      <div className="absolute" style={{ top: '6%', animation: 'floatCloud1 60s linear infinite' }}>
        <PixelCloud size={2.5} opacity={0.5} />
      </div>
      <div className="absolute" style={{ top: '14%', animation: 'floatCloud2 45s linear infinite', animationDelay: '-20s' }}>
        <PixelCloud size={1.8} opacity={0.4} />
      </div>
      <div className="absolute" style={{ top: '10%', animation: 'floatCloud3 35s linear infinite', animationDelay: '-10s' }}>
        <PixelCloud size={1.2} opacity={0.35} />
      </div>
      <div className="absolute" style={{ top: '18%', animation: 'floatCloud1 50s linear infinite', animationDelay: '-30s' }}>
        <PixelCloud size={1} opacity={0.3} />
      </div>
    </div>
  )
}

// ===== CONFETTI =====
export const Confetti = ({ active }) => {
  const [particles, setParticles] = useState([])
  
  useEffect(() => {
    if (active) {
      const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#FFE66D', '#FF8B94', '#A8E6CF', '#DDA0DD', '#87CEEB']
      const newParticles = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.3,
        duration: 2.5 + Math.random() * 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 8 + Math.random() * 8,
        rotation: Math.random() * 360
      }))
      setParticles(newParticles)
      const timer = setTimeout(() => setParticles([]), 4500)
      return () => clearTimeout(timer)
    }
  }, [active])
  
  if (!active || particles.length === 0) return null
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: '-20px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            imageRendering: 'pixelated',
            animation: `confettiFall ${p.duration}s ease-out ${p.delay}s forwards`
          }}
        />
      ))}
    </div>
  )
}

// ===== PIGEON =====
export const Pigeon = ({ frame, carrying }) => {
  const frameMap = { 0: 'up', 1: 'down', 2: 'glide' }
  const currentFrame = frameMap[frame] || 'glide'
  
  return (
    <div className="relative w-full h-full">
      <img 
        src={PIGEON_FRAMES[currentFrame]}
        alt="Pigeon"
        className="w-full h-full object-contain"
        style={{ imageRendering: 'pixelated' }}
      />
      {carrying && (
        <img 
          src={SCROLL}
          alt="Scroll"
          className="absolute"
          style={{
            width: '100px',
            height: 'auto',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%) rotate(-15deg)',
            imageRendering: 'pixelated'
          }}
        />
      )}
    </div>
  )
}

// ===== HEADER =====
export const Header = ({ onAboutClick }) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-40 flex justify-between items-center px-4 py-3">
      <h1 className="text-xl text-white font-bold" style={{ textShadow: '2px 2px 0 #000' }}>
        Pigeon Post
      </h1>
      <button 
        onClick={onAboutClick}
        className="text-white text-sm hover:opacity-80 transition-opacity"
        style={{ textShadow: '1px 1px 0 #000' }}
      >
        About
      </button>
    </header>
  )
}

// ===== FOOTER =====
export const Footer = () => {
  return (
    <footer className="absolute bottom-0 left-0 right-0 z-40 py-2 text-center">
      <a 
        href="https://raghvi.co" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-white/70 text-xs hover:text-white transition-colors"
        style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.5)' }}
      >
        Made with love by Raghvi
      </a>
    </footer>
  )
}

// ===== ABOUT MODAL =====
export const AboutModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div 
        className="relative bg-white rounded-2xl p-6 max-w-sm w-full max-h-[80vh] overflow-y-auto"
        style={{ animation: 'modalPop 0.2s ease-out' }}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✕
        </button>
        
        <h2 className="text-xl font-bold mb-4">About Pigeon Post</h2>
        
        <p className="text-gray-600 text-sm mb-4">
          Send tiny pixel gifts to your friends via carrier pigeon. A small, delightful ritual.
        </p>
        
        <div className="border-t pt-4">
          <h3 className="font-bold text-sm mb-2">Credits</h3>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>Illustrations & Design — Raghvi</li>
          </ul>
        </div>
        
        <div className="border-t mt-4 pt-4">
          <p className="text-xs text-gray-400 text-center">
            Tip: Add to Home Screen for the best experience ✨
          </p>
        </div>
      </div>
    </div>
  )
}

// ===== GLOBAL STYLES =====
export const GlobalStyles = () => (
  <style>{`
    @keyframes floatCloud1 {
      0% { left: -200px; }
      100% { left: 100vw; }
    }
    @keyframes floatCloud2 {
      0% { left: -150px; }
      100% { left: 100vw; }
    }
    @keyframes floatCloud3 {
      0% { left: -100px; }
      100% { left: 100vw; }
    }
    @keyframes selectedPulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(251, 146, 60, 0.4); }
      50% { box-shadow: 0 0 0 6px rgba(251, 146, 60, 0); }
    }
    @keyframes dropScroll {
      0% { top: 38%; opacity: 1; }
      100% { top: 55%; opacity: 0; }
    }
    @keyframes mailboxWobble {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(-3deg); }
      75% { transform: rotate(3deg); }
    }
    @keyframes mailboxPulse {
      0%, 100% { transform: scale(1); filter: brightness(1); }
      50% { transform: scale(1.02); filter: brightness(1.1); }
    }
    @keyframes revealPop {
      0% { opacity: 0; transform: scale(0.8); }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes itemFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes modalPop {
      0% { opacity: 0; transform: scale(0.9); }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes confettiFall {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; }
      100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
    }
  `}</style>
)
