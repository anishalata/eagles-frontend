"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ChevronRight, Loader2, Search, Users, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { AppHeader } from "@/components/layout/app-header"
import { AppNavigation } from "@/components/layout/app-navigation"

interface Player {
  name: string;
  position: string;
  jersey: string | number;
  college: string;
  birth_place: string;
  age: string | number;
  weight: string | number;
  height: string | number;
  experience: string | number;
  group_position: string;
}

interface ApiResponse {
  players: Player[];
  error?: string;
}

export default function RosterPage() {
  const [players, setPlayers] = useState<Player[]>([])
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPosition, setSelectedPosition] = useState("All")

  // Position categories
  const positionCategories = {
    "All": [],
    "Offense": ["QB", "RB", "FB", "WR", "TE", "OT", "OG", "C", "G"],
    "Defense": ["DE", "DT", "NT", "LB", "ILB", "OLB", "CB", "S", "FS", "SS"],
    "Special Teams": ["K", "P", "LS", "PK"]
  }

  useEffect(() => {
    fetchRoster()
  }, [])

  useEffect(() => {
    filterPlayers()
  }, [players, searchTerm, selectedPosition])

  // Helper function to safely get position string
  const getPositionString = (position: string): string => {
    return position || 'Unknown'
  }

  const fetchRoster = async () => {
    try {
      console.log("Fetching Eagles roster from backend...")
      const response = await fetch("http://localhost:8000/eagles-roster")
      if (!response.ok) {
        throw new Error(`Failed to fetch roster: ${response.status}`)
      }
      const data: ApiResponse = await response.json()
      console.log("Roster data received:", data)
      
      if (data.error) {
        throw new Error(data.error)
      }
      
      setPlayers(data.players || [])
    } catch (error) {
      console.error("Error fetching roster:", error)
      setPlayers([])
    } finally {
      setIsLoading(false)
    }
  }
  // Add this right after fetchRoster function, before filterPlayers
useEffect(() => {
  if (players.length > 0) {
    console.log("First player structure:", players[0]);
    console.log("Position type:", typeof players[0].position);
    console.log("Position value:", players[0].position);
  }
}, [players]);

  const filterPlayers = () => {
    let filtered = players

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(player => (
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.jersey.toString().includes(searchTerm)
      ))
    }

    // Filter by position category
    if (selectedPosition !== "All") {
      const categoryPositions = positionCategories[selectedPosition as keyof typeof positionCategories]
      filtered = filtered.filter(player => 
        categoryPositions.includes(player.position)
      )
    }

    setFilteredPlayers(filtered)
  }

  const getPositionColor = (position: string) => {
    const offensePositions = ["QB", "RB", "FB", "WR", "TE", "OT", "OG", "C", "G"]
    const defensePositions = ["DE", "DT", "NT", "LB", "ILB", "OLB", "CB", "S", "FS", "SS"]
    
    if (offensePositions.includes(position)) {
      return "bg-blue-500"
    } else if (defensePositions.includes(position)) {
      return "bg-red-500"
    } else {
      return "bg-gray-500"
    }
  }

  const formatHeight = (height: string | number) => {
    if (typeof height === 'string' && height.includes("'")) {
      return height
    }
    return height || "N/A"
  }

  const formatWeight = (weight: string | number) => {
    if (weight === "N/A" || !weight) return "N/A"
    return typeof weight === 'string' ? weight : `${weight} lbs`
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <AppHeader />

      <main className="flex-1 container mx-auto px-4 py-6">
        <AppNavigation />

        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Current Roster</h2>
            <Button
              onClick={fetchRoster}
              disabled={isLoading}
              variant="outline"
              size="sm"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
              ) : (
                <Users className="h-4 w-4 mr-1" />
              )}
              Refresh Roster
            </Button>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search players by name, position, or jersey number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {Object.keys(positionCategories).map((category) => (
                <Button
                  key={category}
                  variant={selectedPosition === category ? "default" : "outline"}
                  onClick={() => setSelectedPosition(category)}
                  size="sm"
                  className={selectedPosition === category ? "bg-[#004C54]" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Player Count */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Filter className="h-4 w-4" />
            <span>
              Showing {filteredPlayers.length} of {players.length} players
              {selectedPosition !== "All" && ` (${selectedPosition})`}
            </span>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin mr-3" />
              <span className="text-lg">Loading Eagles roster...</span>
            </div>
          ) : (
            <>
              {/* Players Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPlayers.map((player, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div>
                          <CardTitle className="text-base">{player.name}</CardTitle>
                          <CardDescription>#{player.jersey} | {player.position}</CardDescription>
                        </div>
                        <Badge className={getPositionColor(player.position)}>
                          {player.position}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-4">
                        <Image
                          src="/placeholder.svg?height=100&width=80"
                          alt={player.name}
                          width={80}
                          height={100}
                          className="rounded-md"
                        />
                        <div className="text-sm flex-1">
                          <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                            <span className="text-gray-500">Height:</span>
                            <span>{formatHeight(player.height)}</span>
                            <span className="text-gray-500">Weight:</span>
                            <span>{formatWeight(player.weight)}</span>
                            <span className="text-gray-500">Age:</span>
                            <span>{player.age || "N/A"}</span>
                            <span className="text-gray-500">Experience:</span>
                            <span>{player.experience || "N/A"} yrs</span>
                          </div>
                          {player.college && player.college !== "N/A" && (
                            <div className="mt-2 text-xs text-gray-600">
                              <span className="font-medium">College:</span> {player.college}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Link href={`/roster/${encodeURIComponent(player.name)}`} className="w-full">
                        <Button variant="ghost" size="sm" className="w-full flex justify-between items-center">
                          <span>View Profile</span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* No Results */}
              {filteredPlayers.length === 0 && players.length > 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No players found matching your search.</p>
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedPosition("All")
                    }}
                    variant="outline"
                    className="mt-4"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}

              {/* Error State */}
              {!isLoading && players.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Unable to load roster data.</p>
                  <Button onClick={fetchRoster} className="mt-4">
                    Try Again
                  </Button>
                </div>
              )}

              {/* Footer Button */}
              {filteredPlayers.length > 0 && (
                <div className="flex justify-center mt-6">
                  <Button className="bg-[#004C54] hover:bg-[#003540]">
                    View Depth Chart
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}