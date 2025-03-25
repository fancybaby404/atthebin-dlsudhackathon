"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface FeedPostProps {
  name: string
  school: string
  date: string
  content: string
  image: string
  likes: number
  dislikes: number
}

export default function FeedPost({
  name,
  school,
  date,
  content,
  image,
  likes: initialLikes,
  dislikes: initialDislikes,
}: FeedPostProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [dislikes, setDislikes] = useState(initialDislikes)
  const [userVote, setUserVote] = useState<"like" | "dislike" | null>(null)

  const handleLike = () => {
    if (userVote === "like") {
      setLikes(likes - 1)
      setUserVote(null)
    } else {
      if (userVote === "dislike") {
        setDislikes(dislikes - 1)
        setLikes(likes + 1)
      } else {
        setLikes(likes + 1)
      }
      setUserVote("like")
    }
  }

  const handleDislike = () => {
    if (userVote === "dislike") {
      setDislikes(dislikes - 1)
      setUserVote(null)
    } else {
      if (userVote === "like") {
        setLikes(likes - 1)
        setDislikes(dislikes + 1)
      } else {
        setDislikes(dislikes + 1)
      }
      setUserVote("dislike")
    }
  }

  return (
    <Card className="overflow-hidden rounded-3xl border-[#99BC85] bg-white shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="border-2 border-[#99BC85]">
            <AvatarImage src="/public/placeholder.svg" alt={name} />
            <AvatarFallback className="bg-[#87ceeb] text-white">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-semibold text-[#2e8b57]">{name}</h3>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#595856] bg-[#e6f7ff] px-2 py-0.5 rounded-full">{school}</span>
              <span className="text-[#595856]">•</span>
              <span className="text-[#595856]">{date}</span>
            </div>
          </div>
        </div>

        <p className="text-sm mb-3 text-[#595856]">{content}</p>

        <div className="relative h-48 w-full rounded-xl overflow-hidden mb-2">
          <Image src={image || "/placeholder.svg"} alt="Post image" fill className="object-cover" />
        </div>
      </CardContent>

      <CardFooter className="p-3 pt-0 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`flex items-center gap-1 rounded-full px-3 ${
              userVote === "like" ? "bg-[#d1f5ea] text-[#2e8b57]" : "text-[#595856] hover:bg-[#e6f7ff]"
            }`}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{likes}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleDislike}
            className={`flex items-center gap-1 rounded-full px-3 ${
              userVote === "dislike" ? "bg-[#ffebee] text-[#ff6b6b]" : "text-[#595856] hover:bg-[#e6f7ff]"
            }`}
          >
            <ThumbsDown className="h-4 w-4" />
            <span>{dislikes}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

