"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trophy, Users, Loader2, RefreshCw } from "lucide-react"
import Image from "next/image"
import { AppHeader } from "@/components/layout/app-header"
import { AppNavigation } from "@/components/layout/app-navigation"

export default function HistoryPage() {
  const [historyQuestion, setHistoryQuestion] = useState("")
  const [historyAnswers, setHistoryAnswers] = useState<{ question: string; answer: string }[]>([])
  const [isHistoryLoading, setIsHistoryLoading] = useState(false)
  const [eaglesHistory, setEaglesHistory] = useState<string>("")
  const [funFact, setFunFact] = useState<string>("")
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)
  const [isLoadingFunFact, setIsLoadingFunFact] = useState(false)

  // Featured legends data (we'll enhance this later with API calls)
  const [legendsInfo, setLegendsInfo] = useState({
    "Reggie White": "",
    "Brian Dawkins": "",
    "Nick Foles": ""
  })

  // Fetch Eagles history when component mounts
  useEffect(() => {
    fetchEaglesHistory()
    fetchFunFact()
    fetchLegendInfo()
  }, [])

  const fetchEaglesHistory = async () => {
    try {
      console.log("Fetching Eagles history from backend...")
      const response = await fetch("http://localhost:8000/eagles-history")
      if (!response.ok) {
        throw new Error(`Failed to fetch Eagles history: ${response.status}`)
      }
      const data = await response.json()
      console.log("Eagles history received:", data)
      setEaglesHistory(data.history || "")
    } catch (error) {
      console.error("Error fetching Eagles history:", error)
      setEaglesHistory("Unable to load Eagles history at this time.")
    } finally {
      setIsLoadingHistory(false)
    }
  }

  const fetchFunFact = async () => {
    setIsLoadingFunFact(true)
    try {
      console.log("Fetching Eagles fun fact from backend...")
      const response = await fetch("http://localhost:8000/eagles-fun-fact")
      if (!response.ok) {
        throw new Error(`Failed to fetch fun fact: ${response.status}`)
      }
      const data = await response.json()
      console.log("Fun fact received:", data)
      setFunFact(data.fun_fact || "")
    } catch (error) {
      console.error("Error fetching fun fact:", error)
      setFunFact("Unable to load fun fact at this time.")
    } finally {
      setIsLoadingFunFact(false)
    }
  }

  const fetchLegendInfo = async () => {
    // Fetch info for each legend
    const legends = ["Reggie White", "Brian Dawkins", "Nick Foles"]
    const newLegendsInfo = { ...legendsInfo }

    for (const legend of legends) {
      try {
        const response = await fetch(`http://localhost:8000/eagles-legend/${encodeURIComponent(legend)}`)
        if (response.ok) {
          const data = await response.json()
          newLegendsInfo[legend as keyof typeof legendsInfo] = data.legend || ""
        }
      } catch (error) {
        console.error(`Error fetching info for ${legend}:`, error)
      }
    }

    setLegendsInfo(newLegendsInfo)
  }

  const askHistoryQuestion = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!historyQuestion.trim()) return

    setIsHistoryLoading(true)

    try {
      console.log("Sending history question:", historyQuestion)
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: historyQuestion }),
      })

      if (!response.ok) {
        throw new Error(`History chat request failed: ${response.status}`)
      }

      const data = await response.json()
      console.log("History chat response received:", data)

      const newAnswer = {
        question: historyQuestion,
        answer: data.response || "Sorry, I couldn't process that question.",
      }

      setHistoryAnswers((prev) => [...prev, newAnswer])
      setHistoryQuestion("")
    } catch (error) {
      console.error("Error in history chat:", error)
      const errorAnswer = {
        question: historyQuestion,
        answer: "Sorry, the history chat service is temporarily unavailable. Please try again later.",
      }
      setHistoryAnswers((prev) => [...prev, errorAnswer])
      setHistoryQuestion("")
    } finally {
      setIsHistoryLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <AppHeader />

      <main className="flex-1 container mx-auto px-4 py-6">
        <AppNavigation />

        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Team History</h2>
            <Button
              onClick={fetchFunFact}
              disabled={isLoadingFunFact}
              variant="outline"
              size="sm"
            >
              {isLoadingFunFact ? (
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-1" />
              )}
              New Fun Fact
            </Button>
          </div>

          {/* Eagles History Card */}
          <Card>
            <CardHeader>
              <CardTitle>Philadelphia Eagles Legacy</CardTitle>
              <CardDescription>Founded in 1933</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingHistory ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin mr-2" />
                  <span>Loading Eagles history...</span>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-[#f0f4f8] rounded-lg p-4 border-l-4 border-[#004C54]">
                    <p className="text-sm text-gray-700">{eaglesHistory}</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <Trophy className="h-6 w-6 text-[#004C54] mt-1" />
                      <div>
                        <h3 className="font-bold">Super Bowl Championships</h3>
                        <p className="text-sm text-gray-700">Super Bowl LII (2017 season)</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Trophy className="h-6 w-6 text-[#004C54] mt-1" />
                      <div>
                        <h3 className="font-bold">NFL Championships (pre-Super Bowl era)</h3>
                        <p className="text-sm text-gray-700">1948, 1949, 1960</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Trophy className="h-6 w-6 text-[#004C54] mt-1" />
                      <div>
                        <h3 className="font-bold">Conference Championships</h3>
                        <p className="text-sm text-gray-700">1980, 2004, 2017, 2022</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={fetchEaglesHistory}
                disabled={isLoadingHistory}
              >
                {isLoadingHistory ? "Loading..." : "Refresh History"}
              </Button>
            </CardFooter>
          </Card>

          {/* Fun Fact Card */}
          {funFact && (
            <Card className="bg-gradient-to-r from-[#004C54] to-[#006B76] text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2" />
                  Eagles Fun Fact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{funFact}</p>
              </CardContent>
            </Card>
          )}

          <h2 className="text-2xl font-bold mt-6 mb-4">Legendary Players</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Reggie White</CardTitle>
                <CardDescription>Defensive End, 1985-1992</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  alt="Reggie White"
                  width={150}
                  height={150}
                  className="mx-auto rounded-md mb-2"
                />
                <p className="text-sm text-gray-700">
                  {legendsInfo["Reggie White"] || "\"The Minister of Defense\" is considered one of the greatest defensive players in NFL history."}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Brian Dawkins</CardTitle>
                <CardDescription>Safety, 1996-2008</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  alt="Brian Dawkins"
                  width={150}
                  height={150}
                  className="mx-auto rounded-md mb-2"
                />
                <p className="text-sm text-gray-700">
                  {legendsInfo["Brian Dawkins"] || "\"Weapon X\" was known for his hard hits, leadership, and versatility on the field."}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Nick Foles</CardTitle>
                <CardDescription>Quarterback, 2012-2014, 2017-2018</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  alt="Nick Foles"
                  width={150}
                  height={150}
                  className="mx-auto rounded-md mb-2"
                />
                <p className="text-sm text-gray-700">
                  {legendsInfo["Nick Foles"] || "Super Bowl LII MVP who led the Eagles to their first Super Bowl victory."}
                </p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mt-6 mb-4">Ask About Eagles History</h2>
          <Card>
            <CardHeader>
              <CardTitle>Eagles History Chatbot</CardTitle>
              <CardDescription>Ask any question about Eagles history and get an instant answer from our knowledge base</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {historyAnswers.length > 0 ? (
                <ScrollArea className="h-[200px] rounded-md border p-4">
                  <div className="space-y-4">
                    {historyAnswers.map((item, index) => (
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
                    Ask a question about Eagles history to get started.
                    <br />
                    <span className="text-sm">Example: "When did the Eagles win their first Super Bowl?" or "Tell me about Brian Dawkins"</span>
                  </p>
                </div>
              )}
              <form onSubmit={askHistoryQuestion} className="flex space-x-2">
                <Input
                  placeholder="Ask about Eagles history..."
                  value={historyQuestion}
                  onChange={(e) => setHistoryQuestion(e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  disabled={isHistoryLoading || !historyQuestion.trim()}
                  className="bg-[#004C54] hover:bg-[#003540]"
                >
                  {isHistoryLoading ? (
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