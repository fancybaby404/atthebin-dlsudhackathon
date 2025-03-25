"use client"

import { Home, User, Plus, Camera } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavProps {
  activeTab: "feed" | "profile"
  setActiveTab: (tab: "feed" | "profile") => void
  onPlusClick: () => void
}

export default function BottomNav({ activeTab, setActiveTab, onPlusClick }: BottomNavProps) {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center">
      <div className="bg-white border-2 border-[#a3e4d7] rounded-full shadow-lg px-6 py-2 flex items-center justify-between gap-4 max-w-xs mx-auto relative">
        <button
          onClick={() => setActiveTab("feed")}
          className={cn(
            "flex flex-col items-center justify-center w-16 h-12 rounded-full transition-all",
            activeTab === "feed" ? "bg-[#d1f5ea] text-[#2e8b57] scale-110" : "text-[#5f9ea0] hover:bg-[#e6f7ff]",
          )}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-0.5 font-medium">Feed</span>
        </button>

        {/* Center action button */}
        <div className="">
          <button
            onClick={onPlusClick}
            className="flex items-center justify-center w-16 h-16 rounded-full bg-[#2e8b57] text-white shadow-lg border-4 border-white hover:bg-[#1d6b43] transition-all"
          >
            {activeTab === "inventory" ? <Camera className="h-7 w-7" /> : <Plus className="h-7 w-7" />}
          </button>
        </div>

        <button
          onClick={() => setActiveTab("profile")}
          className={cn(
            "flex flex-col items-center justify-center w-16 h-12 rounded-full transition-all",
            activeTab === "profile" ? "bg-[#d1f5ea] text-[#2e8b57] scale-110" : "text-[#5f9ea0] hover:bg-[#e6f7ff]",
          )}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-0.5 font-medium">Profile</span>
        </button>
      </div>
    </div>
  )
}

