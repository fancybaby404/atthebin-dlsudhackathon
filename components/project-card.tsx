import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ThumbsUp } from "lucide-react"
import Image from "next/image"

interface ProjectCardProps {
  title: string
  description?: string
  image: string
  tags?: string[]
  likes: number
  className?: string
}

export default function ProjectCard({ 
  title, 
  description = "", 
  image, 
  tags = [], 
  likes,
  className 
}: ProjectCardProps) {
  return (
    <Card className={`overflow-hidden rounded-3xl border-[#a3e4d7] bg-white shadow-md ${className}`}>
      <div className="relative h-40 w-full">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover rounded-t-3xl" />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-[#2e8b57]">{title}</h3>
        {description && <p className="text-sm text-[#595856] mt-1">{description}</p>}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.map((tag) => (
              <Badge key={tag} className="bg-[#99BC85] text-[#595856] hover:bg-[#99BC85] rounded-full text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <ThumbsUp className="h-4 w-4 " />
          <span className="text-sm text-[#595856]">{likes}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

