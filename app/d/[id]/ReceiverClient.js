'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ITEM_SPRITES } from '@/lib/assets'

// About Modal Component
function AboutModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl animate-[modalPop_0.3s_ease-out]">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">About Pigeon Post</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>
        <div className="space-y-3 text-gray-600">
          <p>Send delightful little surprises to friends with carrier pigeons! 🕊️</p>
          <p>Each item you send flies across the internet via an animated pigeon that delivers it right to their screen.</p>
          <p className="text-sm text-gray-400 pt-2">Made by <a href="https://www.raghvikabra.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-500 underline">Raghvi</a></p>
        </div>
      </div>
    </div>
  )
}

// My Pigeons Wall Component - Full page view like Figma
function MyPigeonsWall({ onClose, pigeons }) {
  return (
    <div className="fixed inset-0 z-50 bg-[#87CEEB] overflow-y-auto">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="relative max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
            style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '14px' }}
          >
            ← Back
          </button>
        </div>

        {/* Title */}
        <h1 
          className="text-center mb-10 text-gray-800"
          style={{ 
            fontFamily: '"Press Start 2P", monospace', 
            fontSize: '40px',
            lineHeight: '1.4'
          }}
        >
          my pigeon post
        </h1>

        {/* Grid */}
        {pigeons.length === 0 ? (
          <p className="text-gray-500 text-center py-8" style={{ fontSize: '20px' }}>No pigeons received yet!</p>
        ) : (
          <div className="grid grid-cols-3 gap-4 mb-32">
            {pigeons.map((pigeon, index) => (
              <div 
                key={index}
                className="bg-gray-200 p-6 flex flex-col items-center justify-center aspect-square"
                style={{ borderRadius: '24px' }}
              >
                <img 
                  src={ITEM_SPRITES[pigeon.itemId]}
                  alt={pigeon.itemName}
                  className="w-20 h-20 object-contain mb-4"
                  style={{ imageRendering: "pixelated" }}
                />
                <p 
                  className="font-bold text-gray-800 text-center mb-2"
                  style={{ fontSize: '20px' }}
                >
                  {pigeon.itemName}
                </p>
                {pigeon.senderName && (
                  <p 
                    className="text-gray-500 text-center"
                    style={{ fontSize: '16px' }}
                  >
                    from {pigeon.senderName}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ReceiverClient({ deliveryId }) {
  const [delivery, setDelivery] = useState(null)
  const [animationState, setAnimationState] = useState('idle')
  const [showAbout, setShowAbout] = useState(false)
  const [showMyPigeons, setShowMyPigeons] = useState(false)
  const [myPigeons, setMyPigeons] = useState([])
  const mailboxRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (deliveryId && delivery) {
      setAnimationState('flying')
    }
  }, [deliveryId, delivery])

  useEffect(() => {
    // Load pigeons from localStorage
    const stored = localStorage.getItem('myPigeons')
    if (stored) {
      setMyPigeons(JSON.parse(stored))
    }
  }, [])

  const handleAnimationEnd = (e) => {
    if (e.propertyName === 'left' && animationState === 'flying') {
      setAnimationState('dropping')
      setTimeout(() => {
        setAnimationState('dropped')
        if (mailboxRef.current) {
          mailboxRef.current.classList.add('animate-[mailboxWobble_0.6s_ease-in-out]')
          setTimeout(() => {
            if (mailboxRef.current) {
              mailboxRef.current.classList.add('animate-[mailboxPulse_1s_ease-in-out_infinite]')
            }
          }, 600)
        }
      }, 800)
    }
  }

  const handleMailboxClick = () => {
    if (animationState === 'dropped' && delivery) {
      setAnimationState('revealed')
      
      // Save to localStorage
      const newPigeon = {
        itemId: delivery.item.id,
        itemName: delivery.item.name,
        senderName: delivery.senderName,
        receivedAt: new Date().toISOString()
      }
      
      const stored = localStorage.getItem('myPigeons')
      const pigeons = stored ? JSON.parse(stored) : []
      pigeons.unshift(newPigeon)
      localStorage.setItem('myPigeons', JSON.stringify(pigeons))
      setMyPigeons(pigeons)

      // Trigger confetti
      createConfetti()
    }
  }

  const createConfetti = () => {
    const colors = ['#FF6B9D', '#FEC84D', '#4ECDC4', '#95E1D3', '#FF8C94', '#C7CEEA']
    const confettiContainer = document.createElement('div')
    confettiContainer.style.position = 'fixed'
    confettiContainer.style.top = '0'
    confettiContainer.style.left = '0'
    confettiContainer.style.width = '100%'
    confettiContainer.style.height = '100%'
    confettiContainer.style.pointerEvents = 'none'
    confettiContainer.style.zIndex = '9999'
    document.body.appendChild(confettiContainer)

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div')
      confetti.style.position = 'absolute'
      confetti.style.left = Math.random() * 100 + '%'
      confetti.style.top = '-10px'
      confetti.style.width = '10px'
      confetti.style.height = '10px'
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.animation = `confettiFall ${2 + Math.random() * 2}s ease-out forwards`
      confetti.style.animationDelay = Math.random() * 0.5 + 's'
      confettiContainer.appendChild(confetti)
    }

    setTimeout(() => {
      document.body.removeChild(confettiContainer)
    }, 4000)
  }

  return (
    <div className="relative w-full min-h-screen bg-[#87CEEB] overflow-hidden">
      {/* Background image */}
      <img 
        src="/background.png" 
        alt="Sky background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Floating clouds */}
      <div className="absolute top-[15%] w-32 h-16 opacity-60" style={{ animation: 'floatCloud1 35s linear infinite' }}>
        <svg viewBox="0 0 128 64" className="w-full h-full">
          <ellipse cx="32" cy="32" rx="32" ry="20" fill="white"/>
          <ellipse cx="64" cy="28" rx="36" ry="24" fill="white"/>
          <ellipse cx="96" cy="32" rx="28" ry="18" fill="white"/>
        </svg>
      </div>
      <div className="absolute top-[40%] w-28 h-14 opacity-50" style={{ animation: 'floatCloud2 45s linear infinite', animationDelay: '-10s' }}>
        <svg viewBox="0 0 112 56" className="w-full h-full">
          <ellipse cx="28" cy="28" rx="28" ry="16" fill="white"/>
          <ellipse cx="56" cy="24" rx="32" ry="20" fill="white"/>
          <ellipse cx="84" cy="28" rx="24" ry="14" fill="white"/>
        </svg>
      </div>
      <div className="absolute top-[65%] w-24 h-12 opacity-40" style={{ animation: 'floatCloud3 40s linear infinite', animationDelay: '-20s' }}>
        <svg viewBox="0 0 96 48" className="w-full h-full">
          <ellipse cx="24" cy="24" rx="24" ry="14" fill="white"/>
          <ellipse cx="48" cy="20" rx="28" ry="18" fill="white"/>
          <ellipse cx="72" cy="24" rx="20" ry="12" fill="white"/>
        </svg>
      </div>

      {/* About button - top left */}
      <button
        onClick={() => setShowAbout(true)}
        className="absolute top-6 left-6 z-20 text-gray-600 hover:text-gray-800 transition-colors"
        style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '14px' }}
      >
        ?
      </button>

      {/* Flying pigeon with scroll - LARGER SIZE */}
      {(animationState === 'flying' || animationState === 'dropping') && delivery && (
        <div
          ref={scrollRef}
          className={`absolute transition-all ${
            animationState === 'flying' ? 'duration-[3000ms] left-1/2' : 'duration-[800ms] left-1/2'
          }`}
          style={{ 
            top: animationState === 'flying' ? '35%' : '58%',
            transform: 'translateX(-50%)',
            opacity: animationState === 'dropped' ? 0 : 1,
            zIndex: 30
          }}
          onTransitionEnd={handleAnimationEnd}
        >
          {/* Pigeon - BIGGER */}
          <div className="relative">
            <div style={{ fontSize: '120px' }} className="animate-bounce">🕊️</div>
            
            {/* Scroll attached to pigeon's feet */}
            <div className="absolute left-1/2 transform -translate-x-1/2" style={{ bottom: '-30px' }}>
              <svg width="40" height="60" viewBox="0 0 40 60" style={{ imageRendering: 'pixelated' }}>
                {/* Scroll tube */}
                <rect x="8" y="10" width="24" height="45" fill="#F4E4C1" stroke="#8B7355" strokeWidth="2"/>
                {/* Top cap */}
                <ellipse cx="20" cy="10" rx="12" ry="4" fill="#D4C4A1"/>
                {/* Bottom cap */}
                <ellipse cx="20" cy="55" rx="12" ry="4" fill="#D4C4A1"/>
                {/* Ribbon */}
                <rect x="18" y="15" width="4" height="35" fill="#C41E3A"/>
                {/* Wax seal */}
                <circle cx="20" cy="30" r="6" fill="#8B0000"/>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Mailbox - properly positioned on ground, smaller size */}
      <div 
        ref={mailboxRef}
        className={`absolute left-1/2 transform -translate-x-1/2 ${
          animationState === 'dropped' ? 'cursor-pointer' : 'cursor-default'
        }`}
        style={{ bottom: "calc(24% - 88px)", width: '140px', height: '140px', zIndex: 20 }}
        onClick={handleMailboxClick}
      >
        <img 
          src={animationState === 'revealed' ? '/mailbox-open.svg' : '/mailbox-closed.svg'}
          alt="Mailbox"
          className="w-full h-full object-contain"
          style={{ imageRendering: 'pixelated', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))' }}
        />
      </div>

      {/* Reveal card */}
      {animationState === 'revealed' && delivery && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 animate-[fadeIn_0.3s_ease-out] px-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-[revealPop_0.4s_cubic-bezier(0.34,1.56,0.64,1)]">
            <div className="text-center space-y-6">
              <div className="inline-block animate-[itemFloat_2s_ease-in-out_infinite]">
                <img 
                  src={ITEM_SPRITES[delivery.item.id]}
                  alt={delivery.item.name}
                  className="w-32 h-32 mx-auto object-contain"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
              
              <div className="space-y-3">
                <h2 
                  className="font-bold text-gray-800"
                  style={{ fontSize: '40px', lineHeight: '1.2' }}
                >
                  {delivery.item.name}
                </h2>
                <p 
                  className="text-gray-500"
                  style={{ fontSize: '20px' }}
                >
                  from {delivery.senderName}
                </p>
                {delivery.message && (
                  <p 
                    className="text-gray-600 italic border-l-4 border-orange-300 pl-4 py-2 text-left"
                    style={{ fontSize: '18px' }}
                  >
                    "{delivery.message}"
                  </p>
                )}
              </div>

              <div className="space-y-3 pt-6">
                <a 
                  href={delivery.senderName ? `/?to=${encodeURIComponent(delivery.senderName)}` : "/"}
                  className="block w-full py-2.5 bg-orange-400 hover:bg-orange-300 text-white font-medium rounded-xl text-center transition-all shadow-md"
                  style={{ fontSize: '18px' }}
                >
                  Send something back
                </a>
                
                {myPigeons.length > 0 && (
                  <button
                    onClick={() => {
                      setAnimationState('idle')
                      setShowMyPigeons(true)
                    }}
                    className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium rounded-xl text-center transition-all"
                    style={{ fontSize: '18px' }}
                  >
                    My Pigeons ({myPigeons.length})
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About Modal */}
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
      
      {/* My Pigeons Wall */}
      {showMyPigeons && <MyPigeonsWall onClose={() => setShowMyPigeons(false)} pigeons={myPigeons} />}

      <style jsx global>{`
        @keyframes floatCloud1 { 0% { left: -200px; } 100% { left: 100vw; } }
        @keyframes floatCloud2 { 0% { left: -150px; } 100% { left: 100vw; } }
        @keyframes floatCloud3 { 0% { left: -100px; } 100% { left: 100vw; } }
        @keyframes dropScroll { 0% { top: 38%; opacity: 1; } 100% { top: 58%; opacity: 0; } }
        @keyframes mailboxWobble { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-3deg); } 75% { transform: rotate(3deg); } }
        @keyframes mailboxPulse { 0%, 100% { transform: scale(1); filter: brightness(1); } 50% { transform: scale(1.02); filter: brightness(1.1); } }
        @keyframes revealPop { 0% { opacity: 0; transform: scale(0.8); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes itemFloat { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
        @keyframes confettiFall { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
        @keyframes modalPop { 0% { opacity: 0; transform: scale(0.9); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
      `}</style>
    </div>
  )
}
