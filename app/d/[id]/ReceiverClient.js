'use client'

import { useState, useEffect, useCallback } from 'react'
import { 
  BACKGROUND, MAILBOX_CLOSED, MAILBOX_OPEN, SCROLL, 
  PIGEON_FRAMES, ITEM_SPRITES 
} from '@/lib/assets'

// Pixel Cloud SVG
const PixelCloud = ({ size = 1, opacity = 0.6 }) => (
  <svg 
    viewBox="0 0 48 20" 
    style={{ 
      width: `${48 * size}px`, 
      height: `${20 * size}px`,
      imageRendering: "pixelated",
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

const FloatingClouds = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
    <div className="absolute" style={{ top: "6%", animation: "floatCloud1 60s linear infinite" }}>
      <PixelCloud size={2.5} opacity={0.5} />
    </div>
    <div className="absolute" style={{ top: "14%", animation: "floatCloud2 45s linear infinite", animationDelay: "-20s" }}>
      <PixelCloud size={1.8} opacity={0.4} />
    </div>
    <div className="absolute" style={{ top: "10%", animation: "floatCloud3 35s linear infinite", animationDelay: "-10s" }}>
      <PixelCloud size={1.2} opacity={0.35} />
    </div>
  </div>
)

const Confetti = ({ active }) => {
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
            top: "-20px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            animation: `confettiFall ${p.duration}s ease-out ${p.delay}s forwards`
          }}
        />
      ))}
    </div>
  )
}

const Pigeon = ({ frame, carrying }) => {
  const frameMap = { 0: 'up', 1: 'down', 2: 'glide' }
  const currentFrame = frameMap[frame] || 'glide'
  
  return (
    <div className="relative w-full h-full">
      <img 
        src={PIGEON_FRAMES[currentFrame]}
        alt="Pigeon"
        className="w-full h-full object-contain"
        style={{ imageRendering: "pixelated" }}
      />
      {carrying && (
        <img 
          src={SCROLL}
          alt="Scroll"
          className="absolute"
          style={{
            width: "100px",
            height: "auto",
            bottom: "-10px",
            left: "50%",
            transform: "translateX(-50%) rotate(-15deg)",
            imageRendering: "pixelated"
          }}
        />
      )}
    </div>
  )
}

export default function ReceiverClient({ delivery }) {
  const [stage, setStage] = useState("waiting")
  const [mailboxOpen, setMailboxOpen] = useState(false)
  const [pigeonFrame, setPigeonFrame] = useState(0)
  const [pigeonPos, setPigeonPos] = useState({ x: -15, y: 15 })
  const [isCarrying, setIsCarrying] = useState(true)
  const [showDroppedScroll, setShowDroppedScroll] = useState(false)
  const [mailboxWobble, setMailboxWobble] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (["arriving", "departed"].includes(stage)) {
      const interval = setInterval(() => setPigeonFrame(f => f === 0 ? 1 : 0), 120)
      return () => clearInterval(interval)
    } else if (stage === "hovering") {
      const interval = setInterval(() => {
        setPigeonFrame(f => f === 0 ? 1 : f === 1 ? 2 : 0)
      }, 200)
      return () => clearInterval(interval)
    }
  }, [stage])

  const startAnimation = useCallback(() => {
    setMailboxOpen(false)
    setIsCarrying(true)
    setShowDroppedScroll(false)
    setMailboxWobble(false)
    setShowConfetti(false)
    setPigeonPos({ x: -15, y: 15 })
    setStage("arriving")

    setTimeout(() => setPigeonPos({ x: 50, y: 32 }), 100)
    setTimeout(() => setStage("hovering"), 1800)
    setTimeout(() => { setIsCarrying(false); setShowDroppedScroll(true) }, 2400)
    setTimeout(() => { setShowDroppedScroll(false); setMailboxWobble(true) }, 2900)
    setTimeout(() => setMailboxWobble(false), 3200)
    setTimeout(() => { setStage("departed"); setPigeonPos({ x: 115, y: 10 }) }, 3100)
    setTimeout(() => setStage("ready"), 4400)
  }, [])

  useEffect(() => {
    const timer = setTimeout(startAnimation, 600)
    return () => clearTimeout(timer)
  }, [startAnimation])

  const handleMailboxClick = () => {
    if (stage === "ready" && !mailboxOpen) {
      setMailboxOpen(true)
      setShowConfetti(true)
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${BACKGROUND})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          imageRendering: "pixelated"
        }}
      />
      
      <FloatingClouds />
      <Confetti active={showConfetti} />
      
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-40 flex justify-between items-center px-4 py-3">
        <h1 className="text-xl text-white font-bold" style={{ textShadow: "2px 2px 0 #000" }}>
          Pigeon Post
        </h1>
      </header>
      
      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-40 py-2 text-center">
        <a 
          href="https://raghvi.co" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white/70 text-xs hover:text-white transition-colors"
          style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.5)" }}
        >
          Made with love by Raghvi
        </a>
      </footer>

      {/* Status */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30">
        <div className="bg-black/70 px-5 py-2 rounded-full">
          <p className="text-white text-sm md:text-base">
            {stage === "waiting" && "..."}
            {stage === "arriving" && "A pigeon approaches"}
            {stage === "hovering" && "Special delivery"}
            {stage === "departed" && "..."}
            {stage === "ready" && !mailboxOpen && "Tap the mailbox"}
            {mailboxOpen && `For ${delivery.recipientName}`}
          </p>
        </div>
      </div>

      {/* Replay */}
      {stage === "ready" && !mailboxOpen && (
        <button
          onClick={startAnimation}
          className="absolute top-16 right-4 z-30 bg-white/80 w-9 h-9 rounded-full flex items-center justify-center hover:bg-white"
        >
          ↺
        </button>
      )}

      {/* Pigeon */}
      {!["ready", "waiting"].includes(stage) && (
        <div 
          className="absolute z-20"
          style={{ 
            width: "160px",
            height: "130px",
            left: `${pigeonPos.x}%`, 
            top: `${pigeonPos.y}%`,
            transform: "translate(-50%, -50%)",
            transition: stage === "arriving" ? "all 1.7s ease-out" : 
                       stage === "departed" ? "all 1.3s ease-in" : "all 0.2s ease-out"
          }}
        >
          <Pigeon frame={pigeonFrame} carrying={isCarrying} />
        </div>
      )}

      {/* Dropped scroll */}
      {showDroppedScroll && (
        <img 
          src={SCROLL}
          alt="Scroll"
          className="absolute"
          style={{
            width: "110px",
            left: "50%",
            transform: "translateX(-50%) rotate(-15deg)",
            imageRendering: "pixelated",
            animation: "dropScroll 0.5s ease-in forwards",
            zIndex: 15
          }}
        />
      )}

      {/* Mailbox */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{ bottom: "12%" }}>
        <div 
          onClick={handleMailboxClick}
          className={`transition-all duration-200 ${stage === "ready" && !mailboxOpen ? "cursor-pointer" : ""}`}
          style={{
            animation: mailboxWobble ? "mailboxWobble 0.3s ease-in-out" : 
                      (stage === "ready" && !mailboxOpen ? "mailboxPulse 2s ease-in-out infinite" : undefined)
          }}
        >
          <img 
            src={mailboxOpen ? MAILBOX_OPEN : MAILBOX_CLOSED}
            alt="Mailbox"
            className="object-contain object-bottom md:hidden"
            style={{ imageRendering: "pixelated", height: "240px" }}
          />
          <img 
            src={mailboxOpen ? MAILBOX_OPEN : MAILBOX_CLOSED}
            alt="Mailbox"
            className="hidden md:block object-contain object-bottom"
            style={{ imageRendering: "pixelated", height: "380px" }}
          />
        </div>
      </div>

      {/* Reveal Card */}
      {mailboxOpen && (
        <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
          <div 
            className="bg-white rounded-2xl p-5 w-full max-w-sm shadow-2xl"
            style={{ animation: "revealPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}
          >
            <div className="flex flex-col items-center mb-4">
              <div 
                className="relative w-32 h-32 mb-3 flex items-center justify-center"
                style={{ background: "radial-gradient(circle, rgba(255,200,100,0.3) 0%, transparent 70%)" }}
              >
                <img 
                  src={ITEM_SPRITES[delivery.item.id]}
                  alt={delivery.item.name}
                  className="w-28 h-28 object-contain"
                  style={{ imageRendering: "pixelated", animation: "itemFloat 2s ease-in-out infinite" }}
                />
              </div>
              <p className="text-gray-600 font-medium">{delivery.item.name}</p>
            </div>
            
            {delivery.note && (
              <div className="bg-amber-50 p-4 rounded-xl mb-4 text-center border border-amber-100">
                <p className="text-gray-700 text-sm italic">"{delivery.note}"</p>
              </div>
            )}
            
            <a 
              href="/"
              className="block w-full py-2.5 bg-orange-400 hover:bg-orange-300 text-white font-medium rounded-xl text-center transition-all shadow-md"
            >
              Send something back
            </a>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes floatCloud1 { 0% { left: -200px; } 100% { left: 100vw; } }
        @keyframes floatCloud2 { 0% { left: -150px; } 100% { left: 100vw; } }
        @keyframes floatCloud3 { 0% { left: -100px; } 100% { left: 100vw; } }
        @keyframes dropScroll { 0% { top: 38%; opacity: 1; } 100% { top: 55%; opacity: 0; } }
        @keyframes mailboxWobble { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-3deg); } 75% { transform: rotate(3deg); } }
        @keyframes mailboxPulse { 0%, 100% { transform: scale(1); filter: brightness(1); } 50% { transform: scale(1.02); filter: brightness(1.1); } }
        @keyframes revealPop { 0% { opacity: 0; transform: scale(0.8); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes itemFloat { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
        @keyframes confettiFall { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
      `}</style>
    </div>
  )
}
