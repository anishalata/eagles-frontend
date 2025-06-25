import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 bg-[#004C54] text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="Eagles Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="text-xl font-bold">Eagles Fan Zone</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>
          <Button
            variant="outline"
            className="bg-transparent text-white border-white hover:bg-white hover:text-[#004C54]"
          >
            Sign In
          </Button>
        </div>
      </div>
    </header>
  )
}
