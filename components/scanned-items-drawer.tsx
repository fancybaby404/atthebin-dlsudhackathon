"use client"

import { useState, useEffect } from "react"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Check, Lightbulb, Package, Camera, Zap } from "lucide-react"
import Image from "next/image"

interface ScannedItem {
  id: string
  name: string
  materials: string[]
  image: string
}

interface ScannedItemsDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  activeTab: "scan" | "scanned" | "ideas"
  onTabChange: (tab: "scan" | "scanned" | "ideas") => void
  scannedItems: ScannedItem[]
  onClearItems: () => void
  onScan: (barcode: string) => void
}

export default function ScannedItemsDrawer({
  open,
  onOpenChange,
  activeTab,
  onTabChange,
  scannedItems,
  onClearItems,
  onScan,
}: ScannedItemsDrawerProps) {
  const [scanning, setScanning] = useState(false)
  const [scanLine, setScanLine] = useState(0)

  // Simulate scanning animation
  useEffect(() => {
    if (!open || !scanning || activeTab !== "scan") return

    let direction = 1
    let position = 0

    const interval = setInterval(() => {
      position += 2 * direction

      if (position >= 100) {
        direction = -1
      } else if (position <= 0) {
        direction = 1

        // Simulate a successful scan after one complete cycle
        const mockBarcode = Math.floor(Math.random() * 1000000000).toString()
        setScanning(false)
        onScan(mockBarcode)
      }

      setScanLine(position)
    }, 20)

    return () => clearInterval(interval)
  }, [open, scanning, activeTab, onScan])

  // Generate DIY ideas based on materials
  const generateDIYIdeas = () => {
    // Get unique materials from all scanned items
    const allMaterials = scannedItems.flatMap((item) => item.materials)
    const uniqueMaterials = [...new Set(allMaterials)]

    // Mock DIY ideas based on materials
    const ideas = [
      {
        title: "Upcycled Container Planter",
        description: "Transform your containers into beautiful planters for small herbs or succulents.",
        materials: ["Plastic", "Glass"],
        difficulty: "Easy",
        image: "/placeholder.svg?height=100&width=200",
      },
      {
        title: "Eco-Friendly Bird Feeder",
        description: "Create a bird feeder using plastic bottles and other recyclables.",
        materials: ["Plastic", "PET"],
        difficulty: "Medium",
        image: "/placeholder.svg?height=100&width=200",
      },
      {
        title: "Cardboard Desk Organizer",
        description: "Make a stylish desk organizer from cardboard boxes.",
        materials: ["Cardboard", "Paper"],
        difficulty: "Easy",
        image: "/placeholder.svg?height=100&width=200",
      },
      {
        title: "Decorative Glass Jar Lights",
        description: "Turn glass jars into beautiful ambient lights for your room.",
        materials: ["Glass"],
        difficulty: "Medium",
        image: "/placeholder.svg?height=100&width=200",
      },
    ]

    // Filter ideas that use at least one of the scanned materials
    return ideas.filter((idea) => idea.materials.some((material) => uniqueMaterials.includes(material)))
  }

  const diyIdeas = generateDIYIdeas()

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-[#E4EFE7] rounded-t-3xl border-t border-[#99BC85]">
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader className="border-b border-[#99BC85] bg-[#E4EFE7] rounded-t-3xl">
            <DrawerTitle className="text-[#585451]">
              {activeTab === "scan" ? "Scan Barcode" : activeTab === "scanned" ? "Scanned Items" : "DIY Ideas"}
            </DrawerTitle>
            <DrawerDescription className="text-[#738d64]">
              {activeTab === "scan"
                ? "Scan items to add to your inventory"
                : activeTab === "scanned"
                  ? "Review scanned items"
                  : "Get creative with your materials"}
            </DrawerDescription>
          </DrawerHeader>

          <Tabs
            value={activeTab}
            onValueChange={(value) => onTabChange(value as "scan" | "scanned" | "ideas")}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 w-full bg-[#E4EFE7] border-b border-[#99BC85]">
              <TabsTrigger
                value="scan"
                className="data-[state=active]:bg-[#99BC85] data-[state=active]:text-white rounded-t-lg flex items-center gap-1.5"
              >
                <Camera className="h-4 w-4" />
                Scan
              </TabsTrigger>
              <TabsTrigger
                value="scanned"
                className="data-[state=active]:bg-[#99BC85] data-[state=active]:text-white rounded-t-lg flex items-center gap-1.5"
              >
                <Package className="h-4 w-4" />
                Items ({scannedItems.length})
              </TabsTrigger>
              <TabsTrigger
                value="ideas"
                className="data-[state=active]:bg-[#99BC85] data-[state=active]:text-white rounded-t-lg flex items-center gap-1.5"
              >
                <Lightbulb className="h-4 w-4" />
                Ideas ({diyIdeas.length})
              </TabsTrigger>
            </TabsList>

            {/* Scanner Tab */}
            <TabsContent value="scan" className="p-0">
              <div className="relative">
                {/* Camera viewfinder */}
                <div className="bg-black aspect-square w-full relative">
                  {/* Mock camera feed */}
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 opacity-90"></div>

                  {/* Scanning area */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="w-full h-full border-2 border-[#66cdaa] rounded-lg relative">
                      {/* Corner markers */}
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-[#66cdaa] rounded-tl"></div>
                      <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-[#66cdaa] rounded-tr"></div>
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-[#66cdaa] rounded-bl"></div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-[#66cdaa] rounded-br"></div>

                      {/* Scan line */}
                      {scanning && (
                        <div
                          className="absolute left-0 right-0 h-1 bg-[#66cdaa] shadow-[0_0_10px_2px_rgba(102,205,170,0.7)]"
                          style={{ top: `${scanLine}%` }}
                        ></div>
                      )}
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm">
                    Position barcode within the frame
                  </div>
                </div>

                {/* Test button (for demo purposes) */}
                <div className="p-4 flex justify-center">
                  <Button
                    className={`rounded-full px-6 py-2 ${
                      scanning ? "bg-[#ff6b6b] hover:bg-[#ff5252]" : "bg-[#2e8b57] hover:bg-[#1d6b43]"
                    }`}
                    onClick={() => setScanning(!scanning)}
                  >
                    {scanning ? (
                      <>Stop Scanning</>
                    ) : (
                      <>
                        <Zap className="h-5 w-5 mr-2" />
                        Test Scan
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Scanned Items Tab */}
            <TabsContent value="scanned" className="p-4">
              {scannedItems.length > 0 ? (
                <div className="space-y-3">
                  {scannedItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl p-3 border border-[#99BC85] flex items-center gap-3"
                    >
                      <div className="relative h-12 w-12 flex-shrink-0 rounded-lg overflow-hidden border-2 border-[#E4EFE7]">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-medium text-sm text-[#585451]">{item.name}</h3>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.materials.map((material, index) => (
                            <Badge
                              key={index}
                              className="bg-[#E4EFE7] hover:bg-[#d3ddd6] text-[#738d64] text-xs rounded-full"
                            >
                              {material}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-[#738d64]">
                  <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No items scanned yet</p>
                </div>
              )}
            </TabsContent>

            {/* DIY Ideas Tab */}
            <TabsContent value="ideas" className="p-4">
              {diyIdeas.length > 0 ? (
                <div className="space-y-4">
                  {diyIdeas.map((idea, index) => (
                    <div key={index} className="bg-white rounded-xl overflow-hidden border border-[#99BC85]">
                      <div className="relative h-32 w-full">
                        <Image src={idea.image || "/placeholder.svg"} alt={idea.title} fill className="object-cover" />
                        <div className="absolute top-2 right-2">
                          <Badge
                            className={`
                            ${idea.difficulty === "Easy" ? "bg-[#99BC85]" : "bg-[#738d64]"}
                            text-white rounded-full px-2 py-0.5
                          `}
                          >
                            {idea.difficulty}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-3">
                        <h3 className="font-semibold text-[#585451]">{idea.title}</h3>
                        <p className="text-xs text-[#738d64] mt-1 mb-2">{idea.description}</p>

                        <div className="flex flex-wrap gap-1">
                          {idea.materials.map((material, idx) => (
                            <Badge
                              key={idx}
                              className={`
                                ${
                                  scannedItems.some((item) => item.materials.includes(material))
                                    ? "bg-[#E4EFE7] text-[#585451]"
                                    : "bg-[#E4EFE7] text-[#738d64]"
                                } 
                                text-xs rounded-full
                              `}
                            >
                              {material}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-[#738d64]">
                  <Lightbulb className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No DIY ideas available</p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <DrawerFooter className="border-t border-[#99BC85] bg-[#E4EFE7]">
            <div className="flex gap-2">
              {activeTab === "scan" ? (
                <Button
                  className="flex-1 bg-[#99BC85] hover:bg-[#738d64] text-white rounded-xl"
                  onClick={() => onTabChange("scanned")}
                >
                  View Scanned Items ({scannedItems.length})
                </Button>
              ) : activeTab === "scanned" && scannedItems.length > 0 ? (
                <>
                  <Button
                    className="flex-1 bg-[#99BC85] hover:bg-[#738d64] text-white rounded-xl"
                    onClick={() => {
                      onClearItems()
                      onOpenChange(false)
                    }}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Add to Inventory
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-[#99BC85] text-[#738d64] hover:bg-[#E4EFE7] rounded-xl"
                    onClick={onClearItems}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                </>
              ) : null}
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

