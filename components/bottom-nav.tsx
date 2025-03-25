"use client"

import { Home, User, Plus, Camera, PenSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useRef, useEffect } from "react"

interface BottomNavProps {
  activeTab: "feed" | "profile"
  setActiveTab: (tab: "feed" | "profile") => void
  onPlusClick: (action?: "camera" | "post") => void
}

export default function BottomNav({ activeTab, setActiveTab, onPlusClick }: BottomNavProps) {
  const [showPopup, setShowPopup] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowPopup(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleActionClick = (action: "camera" | "post") => {
    setShowPopup(false)
    onPlusClick(action)
  }

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center">
      <div className="bg-white border-2 border-[#99BC85] rounded-full shadow-lg px-6 py-2 flex items-center justify-between gap-4 max-w-xs mx-auto relative">
        <button
          onClick={() => setActiveTab("feed")}
          className={cn(
            "flex flex-col items-center justify-center w-16 h-12 rounded-full transition-all",
            activeTab === "feed" 
              ? "bg-[#E4EFE7] text-[#585451] scale-110" 
              : "text-[#585451] hover:bg-[#E4EFE7] hover:text-[#99BC85]"
          )}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-0.5 font-medium">Feed</span>
        </button>

        <div className="relative" ref={popupRef}>
          <button
            onClick={() => setShowPopup(!showPopup)}
            className="flex items-center justify-center w-16 h-16 rounded-full bg-[#99BC85] text-white shadow-lg border-4 border-white hover:bg-[#7a9669] transition-all"
          >
            <Plus className="h-7 w-7" />
          </button>

          {showPopup && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col gap-2 min-w-[160px]">
              <button
                onClick={() => handleActionClick("camera")}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border-2 border-[#99BC85] text-[#585451] hover:bg-[#E4EFE7] transition-all w-full"
              >
                <Camera className="h-5 w-5" />
                <span className="text-sm font-medium">Scan Item</span>
              </button>
              <button
                onClick={() => handleActionClick("post")}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border-2 border-[#99BC85] text-[#585451] hover:bg-[#E4EFE7] transition-all w-full"
              >
                <PenSquare className="h-5 w-5" />
                <span className="text-sm font-medium">Create Project</span>
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => setActiveTab("profile")}
          className={cn(
            "flex flex-col items-center justify-center w-16 h-12 rounded-full transition-all",
            activeTab === "profile" 
              ? "bg-[#E4EFE7] text-[#585451] scale-110" 
              : "text-[#585451] hover:bg-[#E4EFE7] hover:text-[#99BC85]"
          )}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-0.5 font-medium">Profile</span>
        </button>
      </div>
    </div>
  )
}

