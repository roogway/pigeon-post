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
  if (!active) return null
  
  const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 0.5}s`,
    duration: `${2 + Math.random() * 2}s`,
    color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'][Math.floor(Math.random() * 8)]
  }))

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {pieces.map(piece => (
        <div
          key={piece.id}
          className="absolute w-3 h-3"
          style={{
            left: piece.left,
            top: '-20px',
            backgroundColor: piece.color,
            animation: `confettiFall ${piece.duration} ease-out ${piece.delay} forwards`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px'
          }}
        />
      ))}
    </div>
  )
}

function AboutModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div 
        className="relative bg-white rounded-2xl p-6 max-w-sm w-full max-h-[80vh] overflow-y-auto"
        style={{ animation: "modalPop 0.2s ease-out" }}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-lg"
        >
          ✕
        </button>
        
        <h2 className="text-2xl font-bold mb-4 font-pixel">About Pigeon Post</h2>
        
        <p className="text-gray-600 text-base mb-4">
          Send tiny pixel gifts to your friends via carrier pigeon. A small, delightful ritual.
        </p>
        
        <div className="border-t pt-4">
          <h3 className="font-bold text-base mb-2">Credits</h3>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>Design and concept by Raghvi</li>
            <li>Illustrations from Adobe Stock</li>
          </ul>
        </div>
        
        <div className="border-t mt-4 pt-4">
          <p className="text-sm text-gray-400 text-center mb-3">
            Tip: Add to Home Screen for the best experience ✨
          </p>
        </div>
        
        <div className="border-t mt-4 pt-4">
          <p className="text-base text-gray-600 text-center mb-3">
            This pigeon runs on coffee ☕
          </p>
          <a
            href="https://buymeacoffee.com/raghvikabra"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-2.5 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-medium rounded-xl text-center transition-all text-base"
          >
            Buy me a coffee
          </a>
        </div>
      </div>
    </div>
  )
}

// My Messages Wall - with square cards and 16px text
function MyMessagesWall({ onClose, messages }) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Background */}
      <div 
        className="fixed inset-0"
        style={{
          backgroundImage: `url(${BACKGROUND})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          imageRendering: "pixelated"
        }}
      />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-3">
        <button 
          onClick={onClose}
          className="text-white text-base hover:opacity-80 transition-opacity"
          style={{ textShadow: "1px 1px 0 #000" }}
        >
          ← Back
        </button>
        <h1 className="text-lg text-white font-bold font-pixel" style={{ textShadow: "2px 2px 0 #000" }}>
          my pigeon post
        </h1>
        <div className="w-12"></div>
      </header>
      
      {/* Grid Content */}
      <div className="relative z-10 pt-16 pb-8 px-3">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <p className="text-white text-lg font-pixel text-center" style={{ textShadow: "1px 1px 0 #000" }}>
              No messages yet!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {messages.map((msg, index) => (
              <div 
                key={index}
                className="bg-white p-3 flex flex-col aspect-square"
                style={{ borderRadius: "24px" }}
              >
                <p className="text-gray-800 mb-1" style={{ fontSize: "16px" }}>
                  From: {msg.senderName || "Anonymous"}
                </p>
                <div className="flex-1 flex items-center justify-center my-1">
                  <img 
                    src={ITEM_SPRITES[msg.itemId]}
                    alt={msg.itemName}
                    className="w-14 h-14 object-contain"
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>
                <div className="mt-1">
                  <p className="text-gray-800" style={{ fontSize: "16px" }}>Message:</p>
                  <p className="text-gray-800 leading-tight line-clamp-2" style={{ fontSize: "16px" }}>
                    {msg.note || "–"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
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
  const [showAbout, setShowAbout] = useState(false)
  const [showMyMessages, setShowMyMessages] = useState(false)
  const [myMessages, setMyMessages] = useState([])

  // Load saved messages from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('pigeonpost_received')
    if (saved) {
      try {
        setMyMessages(JSON.parse(saved))
      } catch (e) {
        setMyMessages([])
      }
    }
  }, [])

  // Save current delivery to localStorage when mailbox opens
  useEffect(() => {
    if (mailboxOpen && delivery) {
      const newMessage = {
        id: delivery.id,
        itemId: delivery.item.id,
        itemName: delivery.item.name,
        senderName: delivery.senderName,
        note: delivery.message,
        receivedAt: new Date().toISOString()
      }
      
      const saved = localStorage.getItem('pigeonpost_received')
      let messages = []
      try {
        messages = saved ? JSON.parse(saved) : []
      } catch (e) {
        messages = []
      }
      
      if (!messages.some(m => m.id === delivery.id)) {
        messages.unshift(newMessage)
        localStorage.setItem('pigeonpost_received', JSON.stringify(messages))
        setMyMessages(messages)
      }
    }
  }, [mailboxOpen, delivery])

  // Pigeon wing animation
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

  const getPigeonFrame = () => {
    if (Array.isArray(PIGEON_FRAMES)) {
      return PIGEON_FRAMES[pigeonFrame] || PIGEON_FRAMES[0]
    }
    const frameKeys = Object.keys(PIGEON_FRAMES)
    return PIGEON_FRAMES[frameKeys[pigeonFrame % frameKeys.length]]
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
        <a href="/" className="text-xl text-white font-bold font-pixel hover:opacity-80 transition-opacity" style={{ textShadow: "2px 2px 0 #000" }}>
          Pigeon Post
        </a>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowMyMessages(true)}
            className="text-white text-base hover:opacity-80 transition-opacity"
            style={{ textShadow: "1px 1px 0 #000" }}
          >
            My Messages
          </button>
          <button 
            onClick={() => setShowAbout(true)}
            className="text-white text-base hover:opacity-80 transition-opacity"
            style={{ textShadow: "1px 1px 0 #000" }}
          >
            About
          </button>
        </div>
      </header>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-40 pb-6 flex flex-col items-center">
        <a 
          href="https://buymeacoffee.com/raghvikabra"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-sm hover:text-white/90 transition-colors underline"
          style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.5)" }}
        >
          This pigeon runs on coffee ☕
        </a>
        <span 
          className="text-white/70 text-sm mt-1"
          style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.5)" }}
        >
          Made by <a href="https://www.raghvikabra.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Raghvi</a>
        </span>
      </footer>

      {stage === "ready" && !mailboxOpen && (
        <div 
          className="absolute top-16 left-0 right-0 z-30 flex justify-center"
          style={{ animation: "fadeIn 0.5s ease-out" }}
        >
          <div className="bg-gray-900/80 text-white px-5 py-2.5 rounded-full text-base font-medium">
            Tap the mailbox
          </div>
        </div>
      )}

      {/* Pigeon - NO FLIP, same direction, BIGGER scroll */}
      {stage !== "waiting" && stage !== "ready" && (
        <div 
          className="absolute z-20 transition-all duration-[1.5s] ease-in-out"
          style={{
            left: `${pigeonPos.x}%`,
            top: `${pigeonPos.y}%`,
            transform: "translate(-50%, -50%)"
          }}
        >
          <div className="relative">
            <img 
              src={getPigeonFrame()}
              alt="Carrier pigeon"
              style={{ 
                width: "120px", 
                height: "auto",
                imageRendering: "pixelated"
              }}
            />
            {isCarrying && (
              <img 
                src={SCROLL}
                alt="Scroll"
                className="absolute"
                style={{
                  width: "80px",
                  height: "auto",
                  bottom: "-15px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  imageRendering: "pixelated"
                }}
              />
            )}
          </div>
        </div>
      )}

      {showDroppedScroll && (
        <img 
          src={SCROLL}
          alt="Scroll"
          className="absolute"
          style={{
            width: "80px",
            left: "50%",
            transform: "translateX(-50%) rotate(-15deg)",
            imageRendering: "pixelated",
            animation: "dropScroll 0.5s ease-in forwards",
            zIndex: 15
          }}
        />
      )}

      <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{ bottom: "calc(24% - 88px)" }}>
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
            style={{ imageRendering: "pixelated", height: "200px" }}
          />
          <img 
            src={mailboxOpen ? MAILBOX_OPEN : MAILBOX_CLOSED}
            alt="Mailbox"
            className="hidden md:block object-contain object-bottom"
            style={{ imageRendering: "pixelated", height: "320px" }}
          />
        </div>
      </div>

      {mailboxOpen && (
        <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
          <div 
            className="bg-white rounded-2xl p-5 w-full max-w-sm shadow-2xl"
            style={{ animation: "revealPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}
          >
            <h3 className="text-center text-lg font-bold text-gray-800 mb-1 font-pixel">
              For {delivery.recipientName}
            </h3>
            
            {delivery.senderName && (
              <p className="text-center text-sm text-gray-500 mb-3">
                from {delivery.senderName}
              </p>
            )}
            
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
            
            {delivery.message && (
              <div className="bg-amber-50 p-4 rounded-xl mb-4 text-center border border-amber-100">
                <p className="text-gray-700 text-sm italic">"{delivery.message}"</p>
              </div>
            )}
            
            <a 
              href={delivery.senderName ? `/?to=${encodeURIComponent(delivery.senderName)}` : "/"}
              className="block w-full py-2.5 bg-orange-400 hover:bg-orange-300 text-white font-medium rounded-xl text-center transition-all shadow-md"
            >
              Send something back
            </a>
          </div>
        </div>
      )}

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
      {showMyMessages && <MyMessagesWall onClose={() => setShowMyMessages(false)} messages={myMessages} />}

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
