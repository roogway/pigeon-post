'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { ITEM_SPRITES, MAILBOX_CLOSED, MAILBOX_OPEN, SCROLL } from '@/lib/assets'
import { Header, Footer, AboutModal, Background, FloatingClouds, Pigeon, Confetti, GlobalStyles } from '@/lib/components'

export default function DeliveryClient({ delivery }) {
  const [showAbout, setShowAbout] = useState(false)
  const [stage, setStage] = useState("waiting")
  const [mailboxOpen, setMailboxOpen] = useState(false)
  const [pigeonFrame, setPigeonFrame] = useState(0)
  const [pigeonPos, setPigeonPos] = useState({ x: -15, y: 15 })
  const [isCarrying, setIsCarrying] = useState(true)
  const [showDroppedScroll, setShowDroppedScroll] = useState(false)
  const [mailboxWobble, setMailboxWobble] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  // Wing flap
  useEffect(() => {
    if (["arriving", "departed"].includes(stage)) {
      const interval = setInterval(() => setPigeonFrame(f => f === 0 ? 1 : 0), 120)
      return () => clearInterval(interval)
    } else if (stage === "hovering") {
      const interval = setInterval(() => {
        setPigeonFrame(f => {
          if (f === 0) return 1
          if (f === 1) return 2
          return 0
        })
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
    <div className="relative min-h-screen w-full overflow-hidden font-pixel">
      <GlobalStyles />
      <Background />
      <FloatingClouds />
      <Header onAboutClick={() => setShowAbout(true)} />
      <Footer />
      <Confetti active={showConfetti} />

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
          className="absolute top-16 right-4 z-30 bg-white/80 w-9 h-9 rounded-full flex items-center justify-center text-sm hover:bg-white transition-colors"
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
                       stage === "departed" ? "all 1.3s ease-in" : 
                       "all 0.2s ease-out"
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
          className="absolute z-15"
          style={{
            width: "110px",
            left: "50%",
            transform: "translateX(-50%) rotate(-15deg)",
            imageRendering: "pixelated",
            animation: "dropScroll 0.5s ease-in forwards"
          }}
        />
      )}

      {/* Mailbox */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 z-10"
        style={{ bottom: "12%" }}
      >
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
              className="block w-full py-2.5 bg-orange-400 hover:bg-orange-300 active:scale-95 text-white font-medium rounded-xl transition-all shadow-md text-center"
            >
              Send something back
            </a>
          </div>
        </div>
      )}

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
    </div>
  )
}
