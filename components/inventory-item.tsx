import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface InventoryItemProps {
  name: string
  materials: string[]
  dateAdded: string
  image: string
}

export default function InventoryItem({ name, materials, dateAdded, image }: InventoryItemProps) {
  return (
    <Card className="bg-white rounded-2xl shadow-md border-[#99BC85]">
      <CardContent className="p-3 flex items-center gap-3">
        <div className="relative h-14 w-14 flex-shrink-0 rounded-xl overflow-hidden border-2 border-[#99BC85]">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>

        <div className="flex-1">
          <h3 className="font-medium text-sm text-[#2e8b57]">{name}</h3>
          <div className="flex flex-wrap gap-1 mt-1">
            {materials.map((material, index) => (
              <Badge key={index} className="bg-[#FDFAF6] hover:bg-[#d1f5ea] text-[#5f9ea0] text-xs rounded-full">
                {material}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-[#5f9ea0] mt-1">Added: {dateAdded}</p>
        </div>
      </CardContent>
    </Card>
  )
}

