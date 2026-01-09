'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { Background, FloatingClouds, Header, Footer, AboutModal, GlobalStyles } from '@/lib/components'

export default function SharePage() {
  const params = useParams()
  const [copied, setCopied] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  
  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/d/${params.id}`
    : ''

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = shareUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Pigeon Post',
          text: 'You have a delivery waiting! 🐦',
          url: shareUrl,
        })
      } catch (err) {
        if (err.name !== 'AbortError') {
          handleCopy()
        }
      }
    } else {
      handleCopy()
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-pixel">
      <GlobalStyles />
      <Background />
      <FloatingClouds />
      <Header onAboutClick={() => setShowAbout(true)} />
      <Footer />

      {/* Title */}
      <div className="absolute top-16 left-0 right-0 z-20 text-center">
        <h1 
          className="text-3xl md:text-4xl text-white font-bold"
          style={{ textShadow: "3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000" }}
        >
          pigeon post
        </h1>
      </div>

      {/* Share Card */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
        <div 
          className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl text-center"
          style={{ animation: "revealPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}
        >
          <div className="text-4xl mb-3">🐦</div>
          <h2 className="text-xl font-bold mb-2">Ready to fly!</h2>
          <p className="text-gray-600 text-sm mb-5">
            Share this link with your friend to deliver their gift.
          </p>

          {/* Link display */}
          <div className="bg-gray-100 rounded-xl p-3 mb-4 break-all text-sm text-gray-700">
            {shareUrl}
          </div>

          {/* Share buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              className="flex-1 py-2.5 bg-gray-200 hover:bg-gray-300 rounded-xl font-medium transition-all active:scale-95"
            >
              {copied ? "Copied! ✓" : "Copy link"}
            </button>
            <button
              onClick={handleShare}
              className="flex-1 py-2.5 bg-orange-400 hover:bg-orange-300 text-white rounded-xl font-medium transition-all active:scale-95 shadow-md"
            >
              Share
            </button>
          </div>

          {/* Send another */}
          <a 
            href="/"
            className="inline-block mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Send another
          </a>
        </div>
      </div>

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
    </div>
  )
}
