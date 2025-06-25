"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, GraduationCap, Calendar, Users, Trophy, Loader2 } from "lucide-react"
import Image from "next/image"
import { AppHeader } from "@/components/layout/app-header"
import { AppNavigation } from "@/components/layout/app-navigation"

interface Player {
  name: string;
  position: string;
  jersey: string;
  college: string;
  birth_place: string;
  age: string | number;
  weight: string | number;
  height: string | number;
  experience: string | number;
  group_position: string;
}

export default function PlayerProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [player, setPlayer] = useState<Player | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const playerName = params.name as string

  useEffect(() => {
    if (playerName) {
      fetchPlayerProfile(decodeURIComponent(playerName))
    }
  }, [playerName])

  const fetchPlayerProfile = async (name: string) => {
    try {
      console.log("Fetching player profile for:", name)
      const response = await fetch("http://localhost:8000/eagles-roster")
      if (!response.ok) {
        throw new Error(`Failed to fetch roster: ${response.status}`)
      }
      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      // Find the specific player
      const foundPlayer = data.players.find((p: Player) => 
        p.name.toLowerCase() === name.toLowerCase()
      )

      if (!foundPlayer) {
        setError("Player not found")
      } else {
        setPlayer(foundPlayer)
      }
    } catch (error) {
      console.error("Error fetching player profile:", error)
      setError("Failed to load player profile")
    } finally {
      setIsLoading(false)
    }
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

  const getPositionGroup = (groupPosition: string) => {
    switch (groupPosition) {
      case 'offense':
        return { name: 'Offense', color: 'bg-blue-100 text-blue-800' }
      case 'defense':
        return { name: 'Defense', color: 'bg-red-100 text-red-800' }
      case 'specialTeam':
        return { name: 'Special Teams', color: 'bg-gray-100 text-gray-800' }
      default:
        return { name: 'Unknown', color: 'bg-gray-100 text-gray-800' }
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <AppHeader />
        <main className="flex-1 container mx-auto px-4 py-6">
          <AppNavigation />
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mr-3" />
            <span className="text-lg">Loading player profile...</span>
          </div>
        </main>
      </div>
    )
  }

  if (error || !player) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <AppHeader />
        <main className="flex-1 container mx-auto px-4 py-6">
          <AppNavigation />
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">{error || "Player not found"}</h2>
            <Button onClick={() => router.push('/roster')} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Roster
            </Button>
          </div>
        </main>
      </div>
    )
  }

  const positionGroup = getPositionGroup(player.group_position)

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <AppHeader />

      <main className="flex-1 container mx-auto px-4 py-6">
        <AppNavigation />

        <div className="space-y-6">
          {/* Back Button */}
          <Button onClick={() => router.push('/roster')} variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Roster
          </Button>

          {/* Player Header Card */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#004C54] to-[#006B76] text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src="/placeholder.svg?height=120&width=100"
                    alt={player.name}
                    width={100}
                    height={120}
                    className="rounded-lg border-2 border-white"
                  />
                  <div>
                    <CardTitle className="text-3xl font-bold">{player.name}</CardTitle>
                    <CardDescription className="text-gray-200 text-lg">
                      #{player.jersey} • {player.position}
                    </CardDescription>
                    <div className="flex items-center mt-2 space-x-2">
                      <Badge className={getPositionColor(player.position)}>
                        {player.position}
                      </Badge>
                      <Badge className={positionGroup.color}>
                        {positionGroup.name}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Player Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-[#004C54]" />
                  Age
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{player.age || "N/A"}</p>
                <p className="text-xs text-gray-500">years old</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Users className="h-4 w-4 mr-2 text-[#004C54]" />
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{player.experience || "N/A"}</p>
                <p className="text-xs text-gray-500">
                  {player.experience === 0 || player.experience === "0" ? "Rookie" : "years"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Physical</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-bold">{formatHeight(player.height)}</p>
                <p className="text-lg font-bold">{formatWeight(player.weight)}</p>
                <p className="text-xs text-gray-500">Height • Weight</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Jersey</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-[#004C54]">#{player.jersey}</p>
              </CardContent>
            </Card>
          </div>

          {/* Background Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-[#004C54]" />
                  College Career
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{player.college || "N/A"}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Completed college career before joining the Eagles
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-[#004C54]" />
                  Background
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{player.birth_place || "N/A"}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Birthplace
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Career Highlights Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-[#004C54]" />
                Career Highlights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Trophy className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Career statistics and highlights coming soon.</p>
                <p className="text-sm mt-2">Check back for detailed performance data and achievements.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}