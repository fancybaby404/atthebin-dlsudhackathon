"use client"

import { Button } from "@/components/ui/button"
import { Search, Bell, Sparkles } from "lucide-react"
import FeedPost from "./feed-post"
import CreatePostDrawer from "./create-post-drawer"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

export default function FeedPage() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Get current time to display appropriate greeting
  const getCurrentGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 18) return "Good Afternoon"
    return "Good Evening"
  }

  return (
    <div className="w-full max-w-md mx-auto pb-4">
      {/* Header with greeting */}
      <div className="bg-[#d1f5ea] rounded-b-3xl shadow-md px-4 pt-8 pb-6 mb-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-[#2e8b57]">{getCurrentGreeting()},</h2>
            <p className="text-[#5f9ea0] font-medium">Jane! 👋</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white text-[#2e8b57] hover:bg-[#a3e4d7] shadow-sm"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-10 w-10 border-2 border-[#a3e4d7]">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Profile" />
              <AvatarFallback className="bg-[#66cdaa] text-white">JD</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5f9ea0]" />
          <Input
            placeholder="Search DIY projects..."
            className="pl-10 bg-white border-[#a3e4d7] rounded-xl focus-visible:ring-[#2e8b57]"
          />
        </div>
      </div>

      {/* School tag pills */}
      <div className="px-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <div className="flex items-center gap-1 bg-[#d1f5ea] text-[#2e8b57] px-3 py-1.5 rounded-full text-xs font-medium shadow-sm">
            <Sparkles className="h-3 w-3" />
            <span>All</span>
          </div>
          {["CvSU", "DLSUD", "PUP", "FEU", "UST", "ADMU"].map((school) => (
            <div
              key={school}
              className="bg-white border border-[#a3e4d7] text-[#5f9ea0] px-3 py-1.5 rounded-full text-xs whitespace-nowrap shadow-sm"
            >
              {school}
            </div>
          ))}
        </div>
      </div>

      {/* Feed posts */}
      <div className="px-4">
        <h3 className="font-semibold text-[#2e8b57] mb-3">Latest DIY Projects</h3>
        <div className="grid grid-cols-1 gap-4">
          <FeedPost
            name="Alex Johnson"
            school="CvSU"
            date="2 hours ago"
            content="Just finished my cardboard castle project! Used recycled boxes from the school cafeteria. Swipe to see the final result!"
            image="/placeholder.svg?height=200&width=300"
            likes={42}
            dislikes={3}
          />
          <FeedPost
            name="Mia Williams"
            school="DLSUD"
            date="Yesterday"
            content="Made these cute plant holders from plastic bottles! My science teacher loved them so much she asked me to make some for the classroom!"
            image="/placeholder.svg?height=200&width=300"
            likes={87}
            dislikes={5}
          />
          <FeedPost
            name="Tyler Chen"
            school="PUP"
            date="3 days ago"
            content="Check out my DIY solar-powered phone charger! Made it for our science fair and won first place!"
            image="/placeholder.svg?height=200&width=300"
            likes={124}
            dislikes={2}
          />
        </div>
      </div>

      <CreatePostDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </div>
  )
}

