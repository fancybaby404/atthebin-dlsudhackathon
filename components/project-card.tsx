import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart } from "lucide-react"
import Image from "next/image"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  likes: number
}

export default function ProjectCard({ title, description, image, tags, likes }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden rounded-3xl border-[#a3e4d7] bg-white shadow-md">
      <div className="relative h-40 w-full">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover rounded-t-3xl" />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-[#2e8b57]">{title}</h3>
        <p className="text-sm text-[#5f9ea0] mt-1">{description}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {tags.map((tag) => (
            <Badge key={tag} className="bg-[#d1f5ea] text-[#2e8b57] hover:bg-[#a3e4d7] rounded-full text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <Heart className="h-4 w-4 text-[#ff6b6b]" />
          <span className="text-sm text-[#5f9ea0]">{likes}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

