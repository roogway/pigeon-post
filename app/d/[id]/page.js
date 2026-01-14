'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { 
  BACKGROUND, ITEM_SPRITES, ITEMS 
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

function ShareModal({ link, onClose }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Pigeon Post',
          text: 'You have a pigeon delivery! 🐦',
          url: link,
        })
      } catch (err) {
        // User cancelled or error
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div 
        className="relative bg-white rounded-2xl p-6 max-w-sm w-full"
        style={{ animation: "modalPop 0.2s ease-out" }}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg"
        >
          ✕
        </button>
        
        <h2 className="text-xl font-bold mb-2 text-center font-pixel">🐦 Ready to send!</h2>
        <p className="text-gray-500 text-sm mb-4 text-center">Share this link with your friend</p>
        
        <div className="bg-gray-100 p-3 rounded-xl mb-4 break-all text-sm text-gray-700">
          {link}
        </div>
        
        <div className="space-y-2">
          <button 
            onClick={handleCopy}
            className="w-full py-2.5 bg-orange-400 hover:bg-orange-300 text-white font-medium rounded-xl transition-all"
          >
            {copied ? "Copied! ✓" : "Copy link"}
          </button>
          
          {typeof navigator !== 'undefined' && navigator.share && (
            <button 
              onClick={handleNativeShare}
              className="w-full py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-xl transition-all"
            >
              Share via...
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// My Messages Wall - full page view
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
          <div className="grid grid-cols-3 gap-2 max-w-lg mx-auto">
            {messages.map((msg, index) => (
              <div 
                key={index}
                className="bg-white rounded-sm p-2 flex flex-col"
                style={{ aspectRatio: "1" }}
              >
                <p className="text-[10px] text-gray-800 font-medium mb-1">
                  From: {msg.senderName || "Anonymous"}
                </p>
                <div className="flex-1 flex items-center justify-center">
                  <img 
                    src={ITEM_SPRITES[msg.itemId]}
                    alt={msg.itemName}
                    className="w-12 h-12 object-contain"
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>
                {msg.note && (
                  <div className="mt-1">
                    <p className="text-[8px] text-gray-500">Message:</p>
                    <p className="text-[9px] text-gray-700 leading-tight line-clamp-2">{msg.note}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Separate component that uses useSearchParams
function HomeContent() {
  const searchParams = useSearchParams()
  const [selectedItem, setSelectedItem] = useState(null)
  const [recipientName, setRecipientName] = useState("")
  const [senderName, setSenderName] = useState("")
  const [senderNameSaved, setSenderNameSaved] = useState(false)
  const [note, setNote] = useState("")
  const [showAbout, setShowAbout] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [shareLink, setShareLink] = useState(null)
  const [showMyMessages, setShowMyMessages] = useState(false)
  const [myMessages, setMyMessages] = useState([])

  // Load sender name from localStorage and check for "to" URL param
  useEffect(() => {
    const savedSenderName = localStorage.getItem('pigeonpost_sender_name')
    if (savedSenderName) {
      setSenderName(savedSenderName)
      setSenderNameSaved(true)
    }
    
    // Load saved messages
    const saved = localStorage.getItem('pigeonpost_received')
    if (saved) {
      try {
        setMyMessages(JSON.parse(saved))
      } catch (e) {
        setMyMessages([])
      }
    }
    
    // Check for ?to= param (from "Send something back")
    const toParam = searchParams.get('to')
    if (toParam) {
      setRecipientName(toParam)
    }
  }, [searchParams])

  // Save sender name to localStorage when it changes
  const handleSenderNameChange = (e) => {
    const name = e.target.value
    setSenderName(name)
    if (name.trim()) {
      localStorage.setItem('pigeonpost_sender_name', name.trim())
      setSenderNameSaved(true)
    }
  }

  const handleSend = async () => {
    if (!selectedItem || !recipientName.trim()) return
    
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId: selectedItem.id,
          itemName: selectedItem.name,
          recipientName: recipientName.trim(),
          senderName: senderName.trim() || null,
          note: note.trim() || null,
        }),
      })
      
      const data = await response.json()
      
      if (data.id) {
        const link = `${window.location.origin}/d/${data.id}`
        setShareLink(link)
      }
    } catch (err) {
      console.error('Error creating delivery:', err)
      alert('Something went wrong. Please try again!')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseShare = () => {
    setShareLink(null)
    setSelectedItem(null)
    setRecipientName("")
    setNote("")
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

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-40 flex justify-between items-center px-4 py-3">
        <h1 className="text-xl text-white font-bold font-pixel" style={{ textShadow: "2px 2px 0 #000" }}>
          Pigeon Post
        </h1>
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

      {/* Main Card - with bottom margin for footer space */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-4 pb-20">
        <div className="bg-white rounded-2xl p-4 w-full max-w-sm shadow-2xl">
          {/* Card Title */}
          <h2 className="text-lg font-bold text-center mb-3 text-gray-800 font-pixel">
            Send a little something
          </h2>
          
          {/* Your Name (Sender) */}
          <div className="mb-3">
            <label className="block text-sm text-gray-500 mb-1">
              Your name {senderNameSaved && <span className="text-gray-400 text-xs">(saved ✓)</span>}
            </label>
            <input
              type="text"
              value={senderName}
              onChange={handleSenderNameChange}
              placeholder="Your name"
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-300 focus:outline-none transition-colors text-sm"
            />
            {!senderNameSaved && (
              <p className="text-xs text-gray-400 mt-1">(you only need to write this once)</p>
            )}
          </div>
          
          {/* Recipient */}
          <div className="mb-3">
            <label className="block text-sm text-gray-500 mb-1">For</label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Friend's name"
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-300 focus:outline-none transition-colors text-sm"
            />
          </div>

          {/* Item Grid - 4x3 */}
          <div className="mb-3">
            <div className="grid grid-cols-4 gap-1.5">
              {ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`aspect-square rounded-lg p-1 transition-all duration-150 ${
                    selectedItem?.id === item.id
                      ? "bg-orange-100 ring-2 ring-orange-400 scale-110 shadow-lg"
                      : "bg-gray-50 hover:bg-gray-100 hover:scale-105"
                  }`}
                >
                  <img 
                    src={ITEM_SPRITES[item.id]} 
                    alt={item.name}
                    className="w-full h-full object-contain transition-transform hover:scale-110"
                    style={{ imageRendering: "pixelated" }}
                  />
                </button>
              ))}
            </div>
            
            <p className="text-center text-sm text-gray-500 mt-2 h-5 font-medium">
              {selectedItem ? selectedItem.name : ""}
            </p>
          </div>

          {/* Note */}
          <div className="mb-3">
            <label className="block text-sm text-gray-400 mb-1">Add a note (optional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="..."
              rows={2}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-orange-300 focus:outline-none resize-none text-sm transition-colors"
            />
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!selectedItem || !recipientName.trim() || isLoading}
            className={`w-full py-2.5 rounded-xl font-medium transition-all ${
              selectedItem && recipientName.trim() && !isLoading
                ? "bg-orange-400 hover:bg-orange-300 active:scale-95 text-white cursor-pointer shadow-md"
                : "bg-gray-100 text-gray-300 cursor-not-allowed"
            }`}
          >
            {isLoading ? "Preparing pigeon..." : "Send it off"}
          </button>
        </div>
      </div>
      
      {/* Modals */}
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
      {shareLink && <ShareModal link={shareLink} onClose={handleCloseShare} />}
      {showMyMessages && <MyMessagesWall onClose={() => setShowMyMessages(false)} messages={myMessages} />}

      <style jsx global>{`
        @keyframes floatCloud1 { 0% { left: -200px; } 100% { left: 100vw; } }
        @keyframes floatCloud2 { 0% { left: -150px; } 100% { left: 100vw; } }
        @keyframes floatCloud3 { 0% { left: -100px; } 100% { left: 100vw; } }
        @keyframes modalPop { 0% { opacity: 0; transform: scale(0.9); } 100% { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  )
}

// Main export with Suspense wrapper
export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-sky-400">
        <div className="text-white font-pixel">Loading...</div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  )
}
