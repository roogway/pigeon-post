'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { BACKGROUND, ITEM_SPRITES } from '@/lib/assets'

// About Modal
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

// My Messages Wall - with 12px font and p-4 padding
function MyMessagesWall({ onClose, messages }) {
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

        {/* Title - 40pt */}
        <h1 
          className="text-center mb-10 text-gray-800"
          style={{ 
            fontFamily: '"Press Start 2P", monospace', 
            fontSize: '40px',
            lineHeight: '1.4'
          }}
        >
          my messages
        </h1>

        {/* Grid - with 12px font and p-4 padding */}
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center py-8" style={{ fontSize: '20px' }}>No messages sent yet!</p>
        ) : (
          <div className="grid grid-cols-3 gap-4 mb-32">
            {messages.map((msg, index) => (
              <div 
                key={index}
                className="bg-gray-200 p-4 flex flex-col aspect-square"
                style={{ borderRadius: '24px' }}
              >
                <p 
                  className="text-gray-800 mb-1"
                  style={{ fontSize: '12px' }}
                >
                  For: {msg.recipientName}
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
                  <p className="text-gray-800" style={{ fontSize: '12px' }}>
                    Message:
                  </p>
                  <p 
                    className="text-gray-800 leading-tight line-clamp-2"
                    style={{ fontSize: '12px' }}
                  >
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
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const savedSenderName = localStorage.getItem('pigeonpost_sender_name')
    if (savedSenderName) {
      setSenderName(savedSenderName)
      setSenderNameSaved(true)
    }
    
    const saved = localStorage.getItem('pigeonpost_sent')
    if (saved) {
      try {
        setMyMessages(JSON.parse(saved))
      } catch (e) {
        setMyMessages([])
      }
    }
    
    const toParam = searchParams.get('to')
    if (toParam) {
      setRecipientName(toParam)
    }
  }, [searchParams])

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
          itemId: selectedItem,
          itemName: selectedItem,
          recipientName: recipientName.trim(),
          senderName: senderName.trim() || null,
          note: note.trim() || null,
        }),
      })
      
      const data = await response.json()
      
      if (data.id) {
        const link = `${window.location.origin}/d/${data.id}`
        setShareLink(link)
        
        const newMessage = {
          itemId: selectedItem,
          itemName: selectedItem,
          recipientName: recipientName.trim(),
          note: note.trim(),
          sentAt: new Date().toISOString()
        }
        
        const saved = localStorage.getItem('pigeonpost_sent')
        const messages = saved ? JSON.parse(saved) : []
        messages.unshift(newMessage)
        localStorage.setItem('pigeonpost_sent', JSON.stringify(messages))
        setMyMessages(messages)
      }
    } catch (err) {
      console.error('Error creating delivery:', err)
      alert('Something went wrong. Please try again!')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Pigeon Post',
        text: `You have a pigeon post! 🕊️`,
        url: shareLink,
      })
    }
  }

  const resetForm = () => {
    setSelectedItem(null)
    setRecipientName("")
    setNote("")
    setShareLink(null)
    setCopied(false)
  }

  return (
    <div className="min-h-screen bg-[#87CEEB] relative overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${BACKGROUND})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          imageRendering: "pixelated"
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <header className="px-6 py-4 flex items-center justify-between">
          <h1 
            className="text-gray-800 font-bold"
            style={{ fontFamily: '"Pixelify Sans", sans-serif', fontSize: '20px' }}
          >
            Pigeon Post
          </h1>
          <div className="flex items-center gap-6">
            {myMessages.length > 0 && (
              <button
                onClick={() => setShowMyMessages(true)}
                className="text-gray-600 hover:text-gray-800 transition-colors font-medium"
                style={{ fontFamily: '"Pixelify Sans", sans-serif', fontSize: '16px' }}
              >
                My Messages
              </button>
            )}
            <button
              onClick={() => setShowAbout(true)}
              className="text-gray-600 hover:text-gray-800 transition-colors font-medium"
              style={{ fontFamily: '"Pixelify Sans", sans-serif', fontSize: '16px' }}
              >
              About
            </button>
          </div>
        </header>

        {/* Main content */}
        <div className="max-w-md mx-auto px-6 py-8">
          {!shareLink ? (
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Send a pigeon post
              </h2>

              {/* Item selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Pick an item:
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {Object.keys(ITEM_SPRITES).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSelectedItem(key)}
                      className={`p-3 rounded-xl transition-all ${
                        selectedItem === key
                          ? 'bg-orange-200 ring-2 ring-orange-400 scale-105'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <img 
                        src={ITEM_SPRITES[key]}
                        alt={key}
                        className="w-full h-full object-contain"
                        style={{ imageRendering: 'pixelated' }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Your name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your name {!senderNameSaved && <span className="text-gray-400 text-xs">(you only need to write this once)</span>}
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={handleSenderNameChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none"
                />
              </div>

              {/* For */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  For:
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Recipient's name"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none"
                />
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message (optional):
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a note..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none resize-none"
                />
              </div>

              <button
                onClick={handleSend}
                disabled={!selectedItem || !recipientName.trim() || isLoading}
                className="w-full py-3 bg-orange-400 hover:bg-orange-300 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-md"
              >
                {isLoading ? 'Sending...' : 'Send pigeon 🕊️'}
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🕊️</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Your pigeon is ready!
                </h2>
                <p className="text-gray-600">
                  Share this link with {recipientName}
                </p>
              </div>

              <div className="bg-gray-100 p-4 rounded-xl mb-4 break-all text-sm text-gray-700">
                {shareLink}
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleCopy}
                  className="w-full py-3 bg-orange-400 hover:bg-orange-300 text-white font-bold rounded-xl transition-all shadow-md"
                >
                  {copied ? 'Copied! ✓' : 'Copy link'}
                </button>

                {typeof navigator !== 'undefined' && navigator.share && (
                  <button
                    onClick={handleNativeShare}
                    className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-xl transition-all"
                  >
                    Share via...
                  </button>
                )}

                <button
                  onClick={resetForm}
                  className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium rounded-xl transition-all"
                >
                  Send another
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-10 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-600">
        <a 
          href="https://buymeacoffee.com/raghvikabra" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-gray-800 transition-colors"
          style={{ fontFamily: '"Pixelify Sans", sans-serif' }}
        >
          This pigeon runs on coffee ☕
        </a>
        <a 
          href="https://www.raghvikabra.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-gray-800 transition-colors"
          style={{ fontFamily: '"Pixelify Sans", sans-serif' }}
        >
          Made by Raghvi 🛸
        </a>
      </footer>

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
      {showMyMessages && <MyMessagesWall onClose={() => setShowMyMessages(false)} messages={myMessages} />}

      <style jsx global>{`
        @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes modalPop { 0% { opacity: 0; transform: scale(0.9); } 100% { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#87CEEB]" />}>
      <HomeContent />
    </Suspense>
  )
}
