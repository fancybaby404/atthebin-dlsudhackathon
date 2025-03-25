"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Settings, MessageSquare, Users, Grid3X3, Package, Camera } from "lucide-react"
import ProjectCard from "./project-card"
import InventoryItem from "./inventory-item"
import CreatePostDrawer from "./create-post-drawer"
import ScannedItemsDrawer from "./scanned-items-drawer"

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
      name: "Plastic Water Bottle",
      materials: ["Plastic", "PET"],
      dateAdded: "2 days ago",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Cardboard Box",
      materials: ["Cardboard", "Paper"],
      dateAdded: "1 week ago",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Glass Jar",
      materials: ["Glass"],
      dateAdded: "3 days ago",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Aluminum Can",
      materials: ["Aluminum", "Metal"],
      dateAdded: "Yesterday",
      image: "/placeholder.svg?height=60&width=60",
    },
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
    <div className="w-full max-w-md mx-auto bg-[#e6f7ff] min-h-screen flex flex-col">
      {/* Profile Header */}
      <div className="p-4 flex flex-col items-center relative border-b border-[#a3e4d7] bg-[#d1f5ea] rounded-b-3xl shadow-md">
        <div className="absolute top-4 right-4">
          <Button variant="ghost" size="icon" className="text-[#2e8b57] hover:text-[#1d6b43] hover:bg-[#c5f0e3]">
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        <Avatar className="h-20 w-20 mb-2 border-4 border-[#a3e4d7] shadow-lg">
          <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile" />
          <AvatarFallback className="bg-[#66cdaa] text-white">JD</AvatarFallback>
        </Avatar>

        <h1 className="text-xl font-bold text-[#2e8b57]">Jane Doe</h1>
        <p className="text-sm text-[#5f9ea0] mb-2">@craftyjane</p>

        <div className="flex gap-2 mb-3">
          <Badge className="bg-[#66cdaa] hover:bg-[#5cb8a0] text-white rounded-full px-3">DIY Creator</Badge>
          <Badge className="bg-[#87ceeb] hover:bg-[#75b9d4] text-white rounded-full px-3">Eco-Friendly</Badge>
        </div>

        <p className="text-sm text-center mb-4 text-[#2e8b57]">
          Turning trash into treasure! Sharing my DIY journey and eco-friendly crafts
        </p>

        <div className="flex w-full justify-around text-center text-sm mb-2">
          <div>
            <p className="font-bold text-[#2e8b57]">248</p>
            <p className="text-[#5f9ea0]">Posts</p>
          </div>
          <div>
            <p className="font-bold text-[#2e8b57]">12.4k</p>
            <p className="text-[#5f9ea0]">Followers</p>
          </div>
          <div>
            <p className="font-bold text-[#2e8b57]">542</p>
            <p className="text-[#5f9ea0]">Following</p>
          </div>
        </div>

        <div className="flex gap-2 w-full mt-2">
          <Button className="flex-1 bg-[#2e8b57] hover:bg-[#1d6b43] text-white rounded-xl">Follow</Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl border-[#a3e4d7] text-[#2e8b57] hover:bg-[#d1f5ea]"
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl border-[#a3e4d7] text-[#2e8b57] hover:bg-[#d1f5ea]"
          >
            <Users className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="projects" className="flex-1 flex flex-col" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 p-1 mt-4 mx-4 bg-[#d1f5ea] rounded-2xl">
          <TabsTrigger
            value="projects"
            className="flex gap-1.5 data-[state=active]:bg-[#66cdaa] data-[state=active]:text-white rounded-xl"
          >
            <Grid3X3 className="h-4 w-4" />
            Projects
          </TabsTrigger>
          <TabsTrigger
            value="inventory"
            className="flex gap-1.5 data-[state=active]:bg-[#66cdaa] data-[state=active]:text-white rounded-xl"
          >
            <Package className="h-4 w-4" />
            Inventory
          </TabsTrigger>
        </TabsList>

        {/* Projects Tab */}
        <TabsContent value="projects" className="flex-1 relative p-4">
          <div className="grid grid-cols-1 gap-4">
            <ProjectCard
              title="Bottle Pencil Case"
              description="Upcycled plastic bottle transformed into a cute pencil holder"
              image="/placeholder.svg?height=150&width=300"
              tags={["Upcycling", "School Supplies"]}
              likes={124}
            />
            <ProjectCard
              title="Cardboard Desk Organizer"
              description="Made from cereal boxes and decorated with colorful paper"
              image="/placeholder.svg?height=150&width=300"
              tags={["Cardboard", "Organization"]}
              likes={87}
            />
            <ProjectCard
              title="T-shirt Tote Bag"
              description="No-sew tote bag made from an old t-shirt"
              image="/placeholder.svg?height=150&width=300"
              tags={["Fabric", "No-Sew"]}
              likes={215}
            />
          </div>
        </TabsContent>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="flex-1 relative p-4">
          <div className="grid grid-cols-1 gap-3">
            {inventoryItems.map((item, index) => (
              <InventoryItem
                key={index}
                name={item.name}
                materials={item.materials}
                dateAdded={item.dateAdded}
                image={item.image}
              />
            ))}
          </div>

          {/* Empty state if no items */}
          {inventoryItems.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Package className="h-12 w-12 text-[#a3e4d7] mb-2" />
              <h3 className="text-lg font-semibold text-[#2e8b57]">No items yet</h3>
              <p className="text-sm text-[#5f9ea0] mt-1 mb-4">Scan barcodes to add items to your inventory</p>
              <Button
                onClick={() => {
                  setScannedDrawerOpen(true)
                  setScanDrawerTab("scan")
                }}
                className="bg-[#2e8b57] hover:bg-[#1d6b43] text-white rounded-xl"
              >
                <Camera className="h-4 w-4 mr-2" />
                Scan Barcode
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Create Post Drawer (for Projects tab) */}
      <CreatePostDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />

      {/* Scanned Items Drawer */}
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

