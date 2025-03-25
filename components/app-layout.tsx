"use client"
import { useState } from "react"
import BottomNav from "./bottom-nav"
import ProfilePage from "./profile-page"
import FeedPage from "./feed-page"
import CreatePostDrawer from "./create-post-drawer"
import ScannedItemsDrawer from "./scanned-items-drawer"
import AIAssistantButton from "./ai-assistant-button"

export default function AppLayout() {
  const [activeTab, setActiveTab] = useState<"feed" | "profile">("feed")
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
    if (activeTab === "profile") {
      setScannedDrawerOpen(true)
      setScanDrawerTab("scan")
    } else {
      setDrawerOpen(true)
    }
  }

  return (
    <div className="flex justify-center w-full bg-[#E4EFE7] min-h-screen">
      <main className="flex flex-col w-full max-w-md relative">
        <div className="flex-1 pb-20">
          {activeTab === "feed" ? <FeedPage /> : <ProfilePage />}
        </div>

        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} onPlusClick={handlePlusClick} />

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

        <AIAssistantButton />
      </main>
    </div>
  )
}

