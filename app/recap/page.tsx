"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CalendarDays, Clock, Trophy, Users, Loader2 } from "lucide-react"
import Image from "next/image"
import { AppHeader } from "@/components/layout/app-header"
import { AppNavigation } from "@/components/layout/app-navigation"

interface GameData {
  date: string;
  event: string;
  score: string;
  [key: string]: any;
}

export default function RecapPage() {
  const [recapQuestion, setRecapQuestion] = useState("")
  const [recapAnswers, setRecapAnswers] = useState<{ question: string; answer: string }[]>([])
  const [isRecapLoading, setIsRecapLoading] = useState(false)
  const [gameData, setGameData] = useState<GameData | null>(null)
  const [gameSummary, setGameSummary] = useState<string>("")
  const [isLoadingData, setIsLoadingData] = useState(true)

  // Fetch game data when component mounts
  useEffect(() => {
    fetchGameData()
    fetchGameSummary()
  }, [])

  const fetchGameData = async () => {
    try {
      console.log("Fetching game data from backend...")
      const response = await fetch('https://eagles-backend-5rgf.onrender.com/api/game-recap')
      if (!response.ok) {
        throw new Error(`Failed to fetch game data: ${response.status}`)
      }
      const data = await response.json()
      console.log("Game data received:", data)
      setGameData(data)
    } catch (error) {
      console.error("Error fetching game data:", error)
      setGameData(null)
    } finally {
      setIsLoadingData(false)
    }
  }

  const fetchGameSummary = async () => {
    try {
      console.log("Fetching game summary from backend...")
      const response = await fetch('https://eagles-backend-5rgf.onrender.com/api/game-summary')
      if (!response.ok) {
        throw new Error(`Failed to fetch game summary: ${response.status}`)
      }
      const data = await response.json()
      console.log("Game summary received:", data)
      setGameSummary(data.summary || "")
    } catch (error) {
      console.error("Error fetching game summary:", error)
      setGameSummary("Unable to load game summary at this time.")
    }
  }

  const fetchGameRecapSummary = async (question: string) => {
    try {
      console.log("Sending chat message:", question)
      const response = await fetch('https://eagles-backend-5rgf.onrender.com/api/game-chat', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: question }),
      })
      if (!response.ok) {
        throw new Error(`Chat request failed: ${response.status}`)
      }
      const data = await response.json()
      console.log("Chat response received:", data)
      return data.response || "Sorry, I couldn't process that question."
    } catch (error) {
      console.error("Error in chat:", error)
      return "Sorry, the chat service is temporarily unavailable. Please try again later."
    }
  }

  const askRecapQuestion = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!recapQuestion.trim()) return

    setIsRecapLoading(true)

    const answer = await fetchGameRecapSummary(recapQuestion)

    const newAnswer = {
      question: recapQuestion,
      answer: answer,
    }

    setRecapAnswers((prev) => [...prev, newAnswer])
    setRecapQuestion("")
    setIsRecapLoading(false)
  }

  // Parse score to get team scores (assumes format like "Eagles 24-17 Cowboys")
  const parseScore = (scoreString: string) => {
    const match = scoreString.match(/(\d+)-(\d+)/)
    if (match) {
      return { home: match[1], away: match[2] }
    }
    return { home: "0", away: "0" }
  }

  const scores = gameData ? parseScore(gameData.score) : { home: "0", away: "0" }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <AppHeader />

      <main className="flex-1 container mx-auto px-4 py-6">
        <AppNavigation />

        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Latest Game Recap</h2>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>{gameData ? gameData.event : "Loading..."}</CardTitle>
                <Badge className="bg-[#004C54]">Final</Badge>
              </div>
              <CardDescription className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1" />
                {gameData ? gameData.date : "Loading..."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingData ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin mr-2" />
                  <span>Loading game data...</span>
                </div>
              ) : gameData ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-col items-center">
                      <Image src="/placeholder.svg?height=60&width=60" alt="Eagles Logo" width={60} height={60} />
                      <p className="font-bold text-xl mt-2">{scores.home}</p>
                      <p className="text-sm">Eagles</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Final Score</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <Image src="/placeholder.svg?height=60&width=60" alt="Opponent Logo" width={60} height={60} />
                      <p className="font-bold text-xl mt-2">{scores.away}</p>
                      <p className="text-sm">Opponent</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    {gameSummary || "Game summary loading..."}
                  </p>
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Failed to load game data. Please try refreshing the page.
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  fetchGameData()
                  fetchGameSummary()
                }}
              >
                Refresh Game Data
              </Button>
            </CardFooter>
          </Card>

          <h2 className="text-2xl font-bold mt-6 mb-4">Upcoming Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Eagles vs. Giants</CardTitle>
                <CardDescription className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  October 23, 2023
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Image src="/placeholder.svg?height=40&width=40" alt="Eagles Logo" width={40} height={40} />
                    <span className="ml-2">Eagles</span>
                  </div>
                  <span className="text-sm font-medium">vs</span>
                  <div className="flex items-center">
                    <span className="mr-2">Giants</span>
                    <Image src="/placeholder.svg?height=40&width=40" alt="Giants Logo" width={40} height={40} />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>1:00 PM EST</span>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Eagles vs. Commanders</CardTitle>
                <CardDescription className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  October 30, 2023
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Image src="/placeholder.svg?height=40&width=40" alt="Eagles Logo" width={40} height={40} />
                    <span className="ml-2">Eagles</span>
                  </div>
                  <span className="text-sm font-medium">vs</span>
                  <div className="flex items-center">
                    <span className="mr-2">Commanders</span>
                    <Image src="/placeholder.svg?height=40&width=40" alt="Commanders Logo" width={40} height={40} />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>4:25 PM EST</span>
                </div>
              </CardFooter>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mt-6 mb-4">AI Game Analysis</h2>
          <Card>
            <CardHeader>
              <CardTitle>Game Recap Chatbot</CardTitle>
              <CardDescription>Get an AI-powered analysis of the latest Eagles game</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recapAnswers.length > 0 ? (
                <ScrollArea className="h-[200px] rounded-md border p-4">
                  <div className="space-y-4">
                    {recapAnswers.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-start">
                          <div className="h-8 w-8 rounded-full bg-[#004C54] flex items-center justify-center text-white mr-2">
                            <Users className="h-4 w-4" />
                          </div>
                          <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                            <p className="text-sm font-medium">{item.question}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                            <Trophy className="h-4 w-4 text-[#004C54]" />
                          </div>
                          <div className="bg-[#f0f4f8] rounded-lg p-3 max-w-[80%] border-l-2 border-[#004C54]">
                            <p className="text-sm">{item.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="h-[200px] rounded-md border p-4 flex items-center justify-center">
                  <p className="text-gray-500 text-center">
                    Ask a question about the latest Eagles game to get started.
                    <br />
                    <span className="text-sm">Example: "Who were the top performers in the last game?"</span>
                  </p>
                </div>
              )}
              <form onSubmit={askRecapQuestion} className="flex space-x-2">
                <Input
                  placeholder="Ask about the latest Eagles game..."
                  value={recapQuestion}
                  onChange={(e) => setRecapQuestion(e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  disabled={isRecapLoading || !recapQuestion.trim()}
                  className="bg-[#004C54] hover:bg-[#003540]"
                >
                  {isRecapLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Thinking...
                    </>
                  ) : (
                    "Ask"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}