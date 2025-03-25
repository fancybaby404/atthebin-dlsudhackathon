"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { MessageSquare, X } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface Position {
  x: number
  y: number
}

export default function AIAssistantButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState<Position>({ x: 20, y: 0 })
  const constraintsRef = useRef(null)

  // Load saved position on mount
  useEffect(() => {
    const savedPosition = localStorage.getItem("aiButtonPosition")
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition))
    }
  }, [])

  // Handle drag end - save new position and snap to sides
  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false)
    
    const containerWidth = constraintsRef.current?.offsetWidth || 448
    const buttonWidth = 56 // w-14 = 3.5rem = 56px
    const padding = 20
    
    // Calculate new x position based on current drag position
    const currentX = info.point.x
    const newX = currentX < containerWidth / 2 
      ? padding  // Snap to left
      : containerWidth - buttonWidth - padding // Snap to right
    
    const newPosition = {
      x: newX,
      y: position.y // Keep the current y position
    }
    
    setPosition(newPosition)
    localStorage.setItem("aiButtonPosition", JSON.stringify(newPosition))
  }

  return (
    <div 
      ref={constraintsRef} 
      className="fixed inset-0 pointer-events-none"
      style={{ bottom: '5rem' }}
    >
      <motion.div
        drag // Allow both x and y dragging
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        animate={{
          x: position.x,
          y: position.y,
          scale: isDragging ? 1.1 : 1,
        }}
        initial={{
          x: 20,
          y: 0
        }}
        style={{
          position: "absolute",
          touchAction: "none",
        }}
        className="pointer-events-auto cursor-grab active:cursor-grabbing"
      >
        <div className="relative">
          {/* Main Button */}
          <button
            onClick={() => !isDragging && setIsOpen(!isOpen)}
            className={cn(
              "flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-lg border-2 transition-all transform",
              isOpen ? "border-[#2e8b57]" : "border-[#a3e4d7] hover:border-[#2e8b57]",
              isDragging ? "cursor-grabbing" : "cursor-grab"
            )}
          >
            <Image
              src="/mascot.png"
              alt="AI Assistant"
              width={40}
              height={40}
              className="rounded-full object-cover"
              draggable={false}
            />
          </button>

          {/* Chat Panel */}
          {isOpen && (
            <div className="absolute bottom-16 right-0 w-72 bg-white rounded-2xl shadow-xl border-2 border-[#a3e4d7]">
              <div className="p-3 border-b border-[#a3e4d7] flex items-center justify-between bg-[#d1f5ea] rounded-t-2xl">
                <div className="flex items-center gap-2">
                  <Image
                    src="/mascot.png"
                    alt="AI Assistant"
                    width={24}
                    height={24}
                    className="rounded-full"
                    draggable={false}
                  />
                  <span className="font-medium text-[#2e8b57]">EcoGuide</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#5f9ea0] hover:text-[#2e8b57]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <div className="p-4 max-h-96 overflow-y-auto">
                <div className="bg-[#e6f7ff] rounded-lg p-3">
                  <p className="text-sm text-[#2e8b57]">
                    Hi! I'm your EcoGuide. I can help you with:
                  </p>
                  <ul className="mt-2 space-y-2 text-sm text-[#5f9ea0]">
                    <li>• Identifying recyclable materials</li>
                    <li>• Tips for proper waste disposal</li>
                    <li>• Creative upcycling ideas</li>
                    <li>• Earning eco-points and rewards</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 border-t border-[#a3e4d7] bg-white rounded-b-2xl">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Ask me anything..."
                    className="flex-1 px-3 py-2 rounded-lg border border-[#a3e4d7] text-sm focus:outline-none focus:border-[#2e8b57]"
                  />
                  <button className="p-2 rounded-lg bg-[#2e8b57] text-white hover:bg-[#1d6b43]">
                    <MessageSquare className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}