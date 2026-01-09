'use client'

import { useState } from 'react'
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
            <li>Design and concept by Raghvi</li>
            <li>Illustrations from Adobe Stock</li>
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
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        
        <h2 className="text-xl font-bold mb-2 text-center">🐦 Ready to send!</h2>
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

export default function Home() {
  const [selectedItem, setSelectedItem] = useState(null)
  const [recipientName, setRecipientName] = useState("")
  const [note, setNote] = useState("")
  const [showAbout, setShowAbout] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [shareLink, setShareLink] = useState(null)

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
        <h1 className="text-xl text-white font-bold" style={{ textShadow: "2px 2px 0 #000" }}>
          Pigeon Post
        </h1>
        <button 
          onClick={() => setShowAbout(true)}
          className="text-white text-sm hover:opacity-80 transition-opacity"
          style={{ textShadow: "1px 1px 0 #000" }}
        >
          About
        </button>
      </header>
      
      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-40 py-2 text-center">
        <span 
          className="text-white/70 text-xs"
          style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.5)" }}
        >
          Made by Roogway 👾
        </span>
      </footer>

      {/* Main Card */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-5 w-full max-w-sm shadow-2xl">
          {/* Card Title */}
          <h2 
            className="text-xl font-bold text-center mb-4 text-gray-800"
          >
            Send a little something
          </h2>
          
          {/* Recipient */}
          <div className="mb-4">
            <label className="block text-sm text-gray-500 mb-1">For</label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Friend's name"
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-orange-300 focus:outline-none transition-colors"
            />
          </div>

          {/* Item Grid */}
          <div className="mb-4">
            <div className="grid grid-cols-5 gap-2">
              {ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`aspect-square rounded-xl p-1.5 transition-all duration-150 ${
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
            
            <p className="text-center text-sm text-gray-500 mt-3 h-5 font-medium">
              {selectedItem ? selectedItem.name : ""}
            </p>
          </div>

          {/* Note */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">Add a note (optional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="..."
              rows={2}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-orange-300 focus:outline-none resize-none text-sm transition-colors"
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

      <style jsx global>{`
        @keyframes floatCloud1 { 0% { left: -200px; } 100% { left: 100vw; } }
        @keyframes floatCloud2 { 0% { left: -150px; } 100% { left: 100vw; } }
        @keyframes floatCloud3 { 0% { left: -100px; } 100% { left: 100vw; } }
        @keyframes modalPop { 0% { opacity: 0; transform: scale(0.9); } 100% { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  )
}
