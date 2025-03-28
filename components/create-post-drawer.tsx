"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Image, X, Trash2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"

interface InventoryItem {
  id: string
  name: string
  image: string
}

interface CreatePostDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreatePostDrawer({ open, onOpenChange }: CreatePostDrawerProps) {
  const [selectedTab, setSelectedTab] = useState("post")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedItems, setSelectedItems] = useState<InventoryItem[]>([])
  const [pendingItems, setPendingItems] = useState<InventoryItem[]>([])

  // Reset state when drawer is closed
  useEffect(() => {
    if (!open) {
      setSelectedItems([])
      setPendingItems([])
    }
  }, [open])

  const inventoryItems: InventoryItem[] = [
    { id: "1", name: "DIY Craft Kit - Bottle Art", image: "/placeholder.svg?height=60&width=60" },
    { id: "2", name: "Eco-Friendly Craft Guide", image: "/placeholder.svg?height=60&width=60" },
    { id: "3", name: "Recycled Paper Beads Kit", image: "/placeholder.svg?height=60&width=60" },
    { id: "4", name: "Upcycled Jewelry Tutorial", image: "/placeholder.svg?height=60&width=60" },
  ]

  const toggleItemSelection = (item: InventoryItem) => {
    if (pendingItems.some((i) => i.id === item.id)) {
      setPendingItems(pendingItems.filter((i) => i.id !== item.id))
    } else {
      setPendingItems([...pendingItems, item])
    }
  }

  const handleShareItems = () => {
    setSelectedItems([...selectedItems, ...pendingItems])
    setPendingItems([])
    setSelectedTab("post")
  }

  const removeSelectedItem = (id: string) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== id))
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-[#E4EFE7] rounded-t-3xl border-t border-[#99BC85]">
        <DrawerHeader className="border-b border-[#99BC85] bg-[#E4EFE7] rounded-t-3xl">
          <DrawerTitle className="text-[#585451]">Create New</DrawerTitle>
          <DrawerDescription className="text-[#738d64]">
            Share your DIY project or select items from your inventory
          </DrawerDescription>
        </DrawerHeader>

        <Tabs defaultValue="post" value={selectedTab} onValueChange={setSelectedTab} className="w-full p-4">
          <TabsList className="grid grid-cols-2 w-full bg-[#E4EFE7] rounded-xl">
            <TabsTrigger
              value="post"
              className="data-[state=active]:bg-[#99BC85] data-[state=active]:text-white rounded-lg"
            >
              Create Post
            </TabsTrigger>
            <TabsTrigger
              value="inventory"
              className="data-[state=active]:bg-[#99BC85] data-[state=active]:text-white rounded-lg"
            >
              From Inventory
            </TabsTrigger>
          </TabsList>

          <TabsContent value="post" className="mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-[#585451]">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter a title for your post"
                  className="border-[#99BC85] bg-white rounded-xl focus-visible:ring-[#585451]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-[#585451]">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your DIY project..."
                  className="min-h-24 border-[#99BC85] bg-white rounded-xl focus-visible:ring-[#585451]"
                />
              </div>

              {/* Recycled Materials Used section */}
              {selectedItems.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-[#585451]">Recycled Materials Used</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedItems.map((item) => (
                      <div key={item.id} className="relative bg-white rounded-lg border border-[#99BC85] p-2 group">
                        <div className="flex items-center gap-2">
                          <div className="relative h-10 w-10 rounded-md overflow-hidden border border-[#E4EFE7]">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <span className="text-xs text-[#738d64] font-medium truncate flex-1">{item.name}</span>
                        </div>
                        <button
                          className="absolute top-1 right-1 bg-white/80 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeSelectedItem(item.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5 text-[#ff6b6b]" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label className="text-[#585451]">Add Image</Label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#99BC85] rounded-xl p-6 bg-white">
                  {selectedImage ? (
                    <div className="relative w-full">
                      <img
                        src={selectedImage || "/placeholder.svg"}
                        alt="Selected"
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full"
                        onClick={() => setSelectedImage(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      className="border-[#99BC85] text-[#738d64] hover:bg-[#E4EFE7] rounded-xl"
                      onClick={() => setSelectedImage("/placeholder.svg?height=200&width=300")}
                    >
                      <Image className="h-4 w-4 mr-2" />
                      Upload Image
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="mt-4">
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-2">
                {inventoryItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center bg-white rounded-lg border border-[#99BC85] p-2"
                    onClick={() => toggleItemSelection(item)}
                  >
                    <div className="pr-2 flex items-center gap-2">
                      <Checkbox
                        id={`item-${item.id}`}
                        checked={pendingItems.some((i) => i.id === item.id)}
                        className="border-[#99BC85] data-[state=checked]:bg-[#99BC85] data-[state=checked]:text-white"
                      />
                    </div>
                    <div className="flex items-center flex-1 space-x-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-10 w-10 rounded-lg object-cover border border-[#99BC85]"
                      />
                      <Label
                        htmlFor={`item-${item.id}`}
                        className="text-sm font-medium text-[#738d64] cursor-pointer flex-1"
                      >
                        {item.name}
                      </Label>
                      {pendingItems.some((i) => i.id === item.id) && <Check className="h-4 w-4 text-[#738d64]" />}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <DrawerFooter className="border-t border-[#99BC85] bg-[#E4EFE7]">
          {selectedTab === "post" ? (
            <Button className="bg-[#99BC85] hover:bg-[#738d64] text-white rounded-xl">Create Post</Button>
          ) : (
            <Button
              className="bg-[#99BC85] hover:bg-[#738d64] text-white rounded-xl"
              onClick={handleShareItems}
              disabled={pendingItems.length === 0}
            >
              Share Selected Items
            </Button>
          )}
          <DrawerClose asChild>
            <Button variant="outline" className="border-[#99BC85] text-[#738d64] hover:bg-[#E4EFE7] rounded-xl">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

