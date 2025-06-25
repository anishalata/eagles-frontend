import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Users } from "lucide-react"
import Image from "next/image"
import { AppHeader } from "@/components/layout/app-header"
import { AppNavigation } from "@/components/layout/app-navigation"

export default function FantasyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <AppHeader />

      <main className="flex-1 container mx-auto px-4 py-6">
        <AppNavigation />

        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Fantasy Football</h2>

          <Card>
            <CardHeader>
              <CardTitle>Eagles Fantasy Performers</CardTitle>
              <CardDescription>Week 6 Stats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-12 font-medium text-sm border-b pb-2">
                  <div className="col-span-4">Player</div>
                  <div className="col-span-2 text-center">Points</div>
                  <div className="col-span-6 text-center">Stats</div>
                </div>

                <div className="grid grid-cols-12 text-sm border-b pb-2">
                  <div className="col-span-4 flex items-center">
                    <Image
                      src="/placeholder.svg?height=30&width=30"
                      alt="Jalen Hurts"
                      width={30}
                      height={30}
                      className="rounded-full mr-2"
                    />
                    <div>
                      <p className="font-medium">Jalen Hurts</p>
                      <p className="text-xs text-gray-500">QB</p>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center justify-center">
                    <Badge className="bg-green-600">24.8</Badge>
                  </div>
                  <div className="col-span-6 text-xs flex items-center">250 pass yds, 2 TD, 45 rush yds</div>
                </div>

                <div className="grid grid-cols-12 text-sm border-b pb-2">
                  <div className="col-span-4 flex items-center">
                    <Image
                      src="/placeholder.svg?height=30&width=30"
                      alt="A.J. Brown"
                      width={30}
                      height={30}
                      className="rounded-full mr-2"
                    />
                    <div>
                      <p className="font-medium">A.J. Brown</p>
                      <p className="text-xs text-gray-500">WR</p>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center justify-center">
                    <Badge className="bg-green-600">18.2</Badge>
                  </div>
                  <div className="col-span-6 text-xs flex items-center">7 rec, 122 yds, 1 TD</div>
                </div>

                <div className="grid grid-cols-12 text-sm">
                  <div className="col-span-4 flex items-center">
                    <Image
                      src="/placeholder.svg?height=30&width=30"
                      alt="Dallas Goedert"
                      width={30}
                      height={30}
                      className="rounded-full mr-2"
                    />
                    <div>
                      <p className="font-medium">Dallas Goedert</p>
                      <p className="text-xs text-gray-500">TE</p>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center justify-center">
                    <Badge className="bg-green-600">14.5</Badge>
                  </div>
                  <div className="col-span-6 text-xs flex items-center">5 rec, 85 yds, 1 TD</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Players
              </Button>
            </CardFooter>
          </Card>

          <h2 className="text-2xl font-bold mt-6 mb-4">Fantasy Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Start 'Em</CardTitle>
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="DeVonta Smith"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">DeVonta Smith</p>
                      <p className="text-xs text-gray-500">vs Giants (31st against WR)</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Eagles D/ST"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">Eagles D/ST</p>
                      <p className="text-xs text-gray-500">vs Giants (28 sacks allowed)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Sit 'Em</CardTitle>
                  <Users className="h-5 w-5 text-gray-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Kenneth Gainwell"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">Kenneth Gainwell</p>
                      <p className="text-xs text-gray-500">Limited touches in committee</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Quez Watkins"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">Quez Watkins</p>
                      <p className="text-xs text-gray-500">Low target share</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
