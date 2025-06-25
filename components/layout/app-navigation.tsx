"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function AppNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState("recap")

  useEffect(() => {
    // Set active tab based on current pathname
    const path = pathname.split("/")[1] || "recap"
    setActiveTab(path)
  }, [pathname])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    router.push(`/${value}`)
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="recap" className="text-sm sm:text-base">
          Recap
        </TabsTrigger>
        <TabsTrigger value="history" className="text-sm sm:text-base">
          History
        </TabsTrigger>
        <TabsTrigger value="roster" className="text-sm sm:text-base">
          Roster
        </TabsTrigger>
        <TabsTrigger value="fantasy" className="text-sm sm:text-base">
          Fantasy
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
