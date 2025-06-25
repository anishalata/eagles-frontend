import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Users, BarChart3, History, ChevronRight, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
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
            <Link href="/recap">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Launch App
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#004C54] to-[#003540] text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <Image
                src="/placeholder.svg?height=120&width=120"
                alt="Eagles Logo"
                width={120}
                height={120}
                className="rounded-full border-4 border-white"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Eagles Fan Zone</h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Your ultimate destination for Philadelphia Eagles news, stats, and analysis
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/recap">
                <Button size="lg" className="bg-white text-[#004C54] hover:bg-gray-100">
                  Explore the App
                </Button>
              </Link>
              <Button size="lg" className="bg-white text-[#004C54] hover:bg-gray-100">
                Join the Community
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Everything You Need as an Eagles Fan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-center mb-4">
                    <div className="h-16 w-16 bg-[#004C54] rounded-full flex items-center justify-center">
                      <BarChart3 className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardTitle>Game Recaps</CardTitle>
                  <CardDescription>
                    Get detailed analysis and AI-powered insights from every Eagles game
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Live score updates</li>
                    <li>• AI game analysis</li>
                    <li>• Player performance</li>
                    <li>• Upcoming schedule</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-center mb-4">
                    <div className="h-16 w-16 bg-[#004C54] rounded-full flex items-center justify-center">
                      <History className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardTitle>Team History</CardTitle>
                  <CardDescription>Explore decades of Eagles history with our interactive chatbot</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Championship history</li>
                    <li>• Legendary players</li>
                    <li>• Historical records</li>
                    <li>• Ask any question</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-center mb-4">
                    <div className="h-16 w-16 bg-[#004C54] rounded-full flex items-center justify-center">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardTitle>Current Roster</CardTitle>
                  <CardDescription>Complete player profiles with stats, photos, and career highlights</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Player statistics</li>
                    <li>• Position breakdowns</li>
                    <li>• Career highlights</li>
                    <li>• Injury reports</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-center mb-4">
                    <div className="h-16 w-16 bg-[#004C54] rounded-full flex items-center justify-center">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardTitle>Fantasy Football</CardTitle>
                  <CardDescription>Make smarter fantasy decisions with Eagles player insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Weekly projections</li>
                    <li>• Start/sit advice</li>
                    <li>• Matchup analysis</li>
                    <li>• Injury updates</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Eagles by the Numbers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Trophy className="h-12 w-12 text-[#004C54]" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-[#004C54]">1</CardTitle>
                  <CardDescription className="text-lg">Super Bowl Championship</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Super Bowl LII victory over the New England Patriots in 2018</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Trophy className="h-12 w-12 text-[#004C54]" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-[#004C54]">4</CardTitle>
                  <CardDescription className="text-lg">NFL Championships</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Including 3 pre-Super Bowl era championships (1948, 1949, 1960)
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Trophy className="h-12 w-12 text-[#004C54]" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-[#004C54]">90+</CardTitle>
                  <CardDescription className="text-lg">Years of History</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Founded in 1933, bringing decades of Philadelphia football tradition
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Recent Highlights */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Recent Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Latest Victory</CardTitle>
                    <Badge className="bg-[#004C54]">W 24-17</Badge>
                  </div>
                  <CardDescription>Eagles vs. Cowboys • October 16, 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-4">
                    <Image
                      src="/placeholder.svg?height=60&width=60"
                      alt="Game Highlight"
                      width={60}
                      height={60}
                      className="rounded-md"
                    />
                    <div>
                      <p className="font-medium">Dominant Defensive Performance</p>
                      <p className="text-sm text-gray-600">3 sacks, 2 interceptions, and a crucial goal-line stand</p>
                    </div>
                  </div>
                  <Link href="/recap">
                    <Button variant="outline" className="w-full">
                      <span>View Full Recap</span>
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Player Spotlight</CardTitle>
                  <CardDescription>This Week's Standout Performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-4">
                    <Image
                      src="/placeholder.svg?height=60&width=60"
                      alt="Jalen Hurts"
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">Jalen Hurts</p>
                      <p className="text-sm text-gray-600">250 passing yards, 2 TDs, 45 rushing yards</p>
                    </div>
                  </div>
                  <Link href="/roster">
                    <Button variant="outline" className="w-full">
                      <span>View Player Profile</span>
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-[#004C54] text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Dive Deeper?</h2>
            <p className="text-xl mb-8 text-gray-200">
              Join thousands of Eagles fans getting the latest news, analysis, and insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/recap">
                <Button size="lg" className="bg-white text-[#004C54] hover:bg-gray-100">
                  Launch Eagles Fan Zone
                </Button>
              </Link>
              <Button size="lg" className="bg-white text-[#004C54] hover:bg-gray-100">
                Create Account
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="Eagles Logo"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <h3 className="text-lg font-bold">Eagles Fan Zone</h3>
              </div>
              <p className="text-gray-400 text-sm">The ultimate destination for Philadelphia Eagles fans worldwide.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/recap" className="hover:text-white">
                    Game Recaps
                  </Link>
                </li>
                <li>
                  <Link href="/history" className="hover:text-white">
                    Team History
                  </Link>
                </li>
                <li>
                  <Link href="/roster" className="hover:text-white">
                    Current Roster
                  </Link>
                </li>
                <li>
                  <Link href="/fantasy" className="hover:text-white">
                    Fantasy Football
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Forums
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Discord
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Social Media
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Newsletter
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2023 Eagles Fan Zone. All rights reserved. Fly Eagles Fly!</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
