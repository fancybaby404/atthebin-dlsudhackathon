"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Settings, MessageSquare, Users, Grid3X3, Package, Camera, Search } from "lucide-react"
import ProjectCard from "./project-card"
import InventoryItem from "./inventory-item"
import CreatePostDrawer from "./create-post-drawer"
import ScannedItemsDrawer from "./scanned-items-drawer"
import { Input } from "./ui/input"

const badges = ["DIY Creator", "Eco-Friendly", "Sustainable Living"];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("projects")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scannedDrawerOpen, setScannedDrawerOpen] = useState(false)
  const [scanDrawerTab, setScanDrawerTab] = useState<"scan" | "scanned" | "ideas">("scan")
  const [scannedItems, setScannedItems] = useState<
    Array<{
      id: string
      name: string
      materials: string[]
      image: string
    }>
  >([])

  // Inventory items data
  const inventoryItems = [
    {
      name: "Plastic Bottle",
      materials: ["Plastic", "PET"],
      dateAdded: "Today",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Glass Container",
      materials: ["Glass"],
      dateAdded: "2 days ago",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Cardboard Box",
      materials: ["Cardboard", "Paper"],
      dateAdded: "3 days ago",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Aluminum Can",
      materials: ["Aluminum", "Metal"],
      dateAdded: "Yesterday",
      image: "/placeholder.svg?height=60&width=60",
    }
  ]

  const handleScan = (barcode: string) => {
    // Simulate getting data from a barcode
    const mockItems = [
      {
        id: "1",
        barcode: "123456789",
        name: "Plastic Bottle",
        materials: ["Plastic", "PET"],
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "2",
        barcode: "987654321",
        name: "Glass Container",
        materials: ["Glass"],
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "3",
        barcode: "456789123",
        name: "Cardboard Package",
        materials: ["Cardboard", "Paper"],
        image: "/placeholder.svg?height=60&width=60",
      },
    ]

    // Find a mock item based on the last digit of the barcode
    const lastDigit = Number.parseInt(barcode.slice(-1))
    const mockItem = mockItems[lastDigit % 3]

    if (mockItem) {
      // Add a unique ID based on timestamp
      const newItem = {
        ...mockItem,
        id: `${mockItem.id}-${Date.now()}`,
      }

      setScannedItems((prev) => [...prev, newItem])
      setScanDrawerTab("scanned")
    }
  }

  const handlePlusClick = () => {
    if (activeTab === "inventory") {
      setScannedDrawerOpen(true)
      setScanDrawerTab("scan")
    } else {
      setDrawerOpen(true)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-[#E4EFE7] min-h-screen flex flex-col">
      {/* Profile Header */}
      <div className="p-4 flex flex-col items-center relative border-b border-[#E4EFE7] bg-[#99BC85] rounded-b-3xl shadow-md">
        <div className="absolute top-4 right-4">
          <Button variant="ghost" size="icon" className="rounded-full bg-white text-[#585451] hover:bg-[#E4EFE7]">
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        <Avatar className="h-20 w-20 mb-2 border-4 border-[#E4EFE7] shadow-lg">
          <AvatarImage src="/public/placeholder.svg" alt="Profile" />
          <AvatarFallback className="bg-[#99BC85] text-white">JD</AvatarFallback>
        </Avatar>

        <h1 className="text-xl font-bold text-[#585451]">Jane Doe</h1>
        <p className="text-sm text-[#585451] mb-2">@craftyjane</p>

        <div className="flex gap-2 mb-3 justify-center items-center flex-wrap">
          {badges.map((badge) => (
            <Badge
              key={badge}
              className="bg-[#E4EFE7] hover:bg-[#d3ddd6] text-[#585451] rounded-full px-3 border border-[#E4EFE7]"
            >
              {badge}
            </Badge>
          ))}
        </div>

        <p className="text-sm text-center mb-4 text-[#585451]">
          Turning trash into treasure! Sharing my DIY journey and eco-friendly crafts
        </p>

        <div className="flex w-full justify-around text-center text-sm mb-2">
          <div>
            <p className="font-bold text-[#585451]">248</p>
            <p className="text-[#585451]">Posts</p>
          </div>
          <div>
            <p className="font-bold text-[#585451]">12.4k</p>
            <p className="text-[#585451]">Followers</p>
          </div>
          <div>
            <p className="font-bold text-[#585451]">542</p>
            <p className="text-[#585451]">Following</p>
          </div>
        </div>

        <div className="flex gap-2 w-full mt-2">
          <Button variant={"outline"} className="flex-1 hover:bg-[#E4EFE7] text-[#585451] rounded-xl">Follow</Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl border-[#E4EFE7] text-[#585451] hover:bg-[#E4EFE7]"
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl border-[#E4EFE7] text-[#585451] hover:bg-[#E4EFE7]"
          >
            <Users className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="projects" className="flex-1 flex flex-col" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 p-1 mt-4 mx-4 bg-[#E4EFE7] rounded-2xl">
          <TabsTrigger
            value="projects"
            className="flex gap-1.5 data-[state=active]:bg-white data-[state=active]:text-[#585451] text-[#585451] rounded-xl"
          >
            <Grid3X3 className="h-4 w-4" />
            Projects
          </TabsTrigger>
          <TabsTrigger
            value="inventory"
            className="flex gap-1.5 data-[state=active]:bg-white data-[state=active]:text-[#585451] text-[#585451] rounded-xl"
          >
            <Package className="h-4 w-4" />
            Inventory
          </TabsTrigger>
        </TabsList>

        {/* Projects Tab */}
        <TabsContent value="projects" className="flex-1 relative p-4">
          <div className="grid grid-cols-1 gap-4">
            {/* ProjectCard components remain the same structurally, just update their colors */}
            <ProjectCard
              title="Bottle Pencil Case"
              description="Upcycled plastic bottle transformed into a cute pencil holder"
              image="/placeholder.svg?height=150&width=300"
              tags={["Upcycling", "School Supplies"]}
              likes={124}
              className="bg-white border border-[#E4EFE7] hover:border-[#99BC85]"
            />
            {/* ... other ProjectCards ... */}
          </div>
        </TabsContent>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="flex-1 relative p-4">
          <div className="grid grid-cols-1 gap-3">
            {inventoryItems.map((item, index) => (
              <InventoryItem
                key={index}
                {...item}
                className="bg-white border border-[#E4EFE7] hover:border-[#99BC85]"
              />
            ))}
          </div>

          {/* Empty state */}
          {inventoryItems.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Package className="h-12 w-12 text-[#99BC85] mb-2" />
              <h3 className="text-lg font-semibold text-[#585451]">No items yet</h3>
              <p className="text-sm text-[#585451] mt-1 mb-4">Scan barcodes to add items to your inventory</p>
              <Button
                onClick={() => {
                  setScannedDrawerOpen(true)
                  setScanDrawerTab("scan")
                }}
                className="bg-[#99BC85] hover:bg-[#7a9669] text-[#585451] rounded-xl"
              >
                <Camera className="h-4 w-4 mr-2" />
                Scan Barcode
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Drawers remain the same */}
      <CreatePostDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
      <ScannedItemsDrawer
        open={scannedDrawerOpen}
        onOpenChange={setScannedDrawerOpen}
        activeTab={scanDrawerTab}
        onTabChange={setScanDrawerTab}
        scannedItems={scannedItems}
        onClearItems={() => setScannedItems([])}
        onScan={handleScan}
      />
    </div>
  )
}

