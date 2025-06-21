"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send, Bot, User, Phone, Trash } from "lucide-react"
import { generateMedicalResponse } from "@/lib/ai-service"

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
}

// Quick reply options
const quickReplies = [
  "MRI scan ke baare mein batao",
  "Sonography kaise hoti hai?",
  "Center timing kya hai?",
  "Test reports kab milegi?",
]

export default function ChatbotWidget() {
  // UI state
  const [isOpen, setIsOpen] = useState(false)
  const [showIntro, setShowIntro] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  
  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Namaste! Dr. Bhajan Sonography & Imaging Centre mein aapka swagat hai. Aapko kya help chahiye?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  // Refs for DOM manipulation
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatHistory')
    const savedHasInteracted = localStorage.getItem('hasInteracted')
    const savedIsOpen = localStorage.getItem('chatIsOpen')
    
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages)
        // Convert string timestamps back to Date objects
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
        setMessages(messagesWithDates)
      } catch (error) {
        console.error('Error loading chat history:', error)
      }
    }
    
    if (savedHasInteracted === 'true') {
      setHasInteracted(true)
    }
    
    if (savedIsOpen === 'true') {
      setIsOpen(true)
    }
  }, [])

  // Save chat history to localStorage
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages))
  }, [messages])

  // Save interaction state
  useEffect(() => {
    localStorage.setItem('hasInteracted', hasInteracted.toString())
  }, [hasInteracted])
  
  // Save open state
  useEffect(() => {
    localStorage.setItem('chatIsOpen', isOpen.toString())
  }, [isOpen])

  // Show intro notification after page load
  useEffect(() => {
    if (isOpen) return // Don't show intro if chat is already open
    
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShowIntro(true)
        // Auto hide intro after 8 seconds
        setTimeout(() => setShowIntro(false), 8000)
      }
    }, 3000) // Show after 3 seconds

    return () => clearTimeout(timer)
  }, [hasInteracted, isOpen])

  // Hide intro when user interacts with page
  useEffect(() => {
    const handleUserInteraction = () => {
      setHasInteracted(true)
      setShowIntro(false)
    }

    window.addEventListener("scroll", handleUserInteraction)
    window.addEventListener("click", handleUserInteraction)
    window.addEventListener("touchstart", handleUserInteraction)

    return () => {
      window.removeEventListener("scroll", handleUserInteraction)
      window.removeEventListener("click", handleUserInteraction)
      window.removeEventListener("touchstart", handleUserInteraction)
    }
  }, [])

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Auto-focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Send message and get AI response
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now(),
      text: text,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsLoading(true)

    try {
      // Get conversation history for context (last 4 messages)
      const recentMessages = messages.slice(-4).map(msg => msg.text)
      
      // Pass message and context to AI service
      const response = await generateMedicalResponse(text)

      const botMessage: Message = {
        id: Date.now() + 1,
        text: response,
        isBot: true,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Sorry, technical issue ho raha hai. Please call +91 94609 91212 for assistance.",
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Handle quick reply selection
  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply)
  }

  // Open phone dialer
  const handleCall = () => {
    window.open("tel:+919460991212", "_self")
  }

  // Open chat window
  const handleChatOpen = () => {
    setIsOpen(true)
    setShowIntro(false)
    setHasInteracted(true)
  }
  
  // Clear chat history
  const handleClearChat = () => {
    const welcomeMessage: Message = {
      id: Date.now(),
      text: "Namaste! Dr. Bhajan Sonography & Imaging Centre mein aapka swagat hai. Aapko kya help chahiye?",
      isBot: true,
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
  }

  return (
    <>
      {/* Intro Notification Popup */}
      {showIntro && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-64 sm:w-72 z-50 animate-in fade-in slide-in-from-right-5 duration-300">
          <Card className="bg-white/95 backdrop-blur-sm border border-blue-100 shadow-lg">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-900">Dr. Bhajan Sonography's Assistant</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Namaste! Dr. Bhajan Sonography & Imaging Centre mein aapka swagat hai.Aapko kya help chahiye?
                  </p>
                  <Button 
                    onClick={handleChatOpen} 
                    size="sm" 
                    className="mt-2 text-xs h-7 bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    Chat Start Karein
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Chat Button */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-50">
        <Button
          onClick={handleChatOpen}
          className="relative w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg border-2 border-white transition-all duration-300"
          aria-label="Open ScanBuddy Assistant chat"
        >
          {isOpen ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
          )}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-80 md:w-96 max-w-sm z-50 transition-all duration-300">
          <Card className="h-[65vh] sm:h-[500px] max-h-[600px] flex flex-col shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            {/* Header */}
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg p-3 sm:p-4 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-3 h-3 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-sm sm:text-lg font-semibold">Dr. Bhajan Sonography's Assistant</CardTitle>
                    <div className="text-xs text-blue-100 flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>{isLoading ? "Typing..." : "Online"}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearChat}
                    className="text-white hover:bg-white/20 w-6 h-6 sm:w-8 sm:h-8 p-0"
                    aria-label="Clear chat"
                  >
                    <Trash className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 w-6 h-6 sm:w-8 sm:h-8 p-0"
                    aria-label="Close chat"
                  >
                    <X className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Content */}
            <CardContent className="flex-1 flex flex-col p-0 min-h-0">
              {/* Messages */}
              <ScrollArea className="flex-1 p-3 sm:p-4">
                <div className="space-y-3 sm:space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                      <div
                        className={`max-w-[85%] sm:max-w-[80%] p-2 sm:p-3 rounded-2xl ${
                          message.isBot
                            ? "bg-gray-100 text-gray-800"
                            : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.isBot && (
                            <Bot className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 text-blue-600 flex-shrink-0" />
                          )}
                          {!message.isBot && (
                            <User className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 text-blue-100 flex-shrink-0" />
                          )}
                          <div className="text-xs sm:text-sm leading-relaxed">{message.text}</div>
                        </div>
                        <div className={`text-xs mt-1 sm:mt-2 ${message.isBot ? "text-gray-500" : "text-blue-100"}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 p-2 sm:p-3 rounded-2xl">
                        <div className="flex items-center space-x-2">
                          <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Quick Replies */}
              <div className="p-2 sm:p-3 border-t border-gray-100 bg-gray-50/50">
                <div className="text-xs text-gray-500 mb-2">Quick replies:</div>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {quickReplies.slice(0, 3).map((reply) => (
                    <Button
                      key={reply}
                      onClick={() => handleQuickReply(reply)}
                      variant="outline"
                      size="sm"
                      className="text-xs h-6 sm:h-7 px-2 bg-white hover:bg-blue-50 border-blue-200 text-blue-700"
                      disabled={isLoading}
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-3 sm:p-4 border-t border-gray-100 bg-white">
                <div className="flex space-x-2">
                  <Input
                    ref={inputRef}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 text-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    disabled={isLoading}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage(inputText)
                      }
                    }}
                  />
                  <Button
                    onClick={() => handleSendMessage(inputText)}
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-3"
                    disabled={!inputText.trim() || isLoading}
                  >
                    <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>

                {/* Quick Actions */}
                <div className="flex justify-center mt-2 sm:mt-3">
                  <Button
                    onClick={handleCall}
                    variant="outline"
                    size="sm"
                    className="text-xs border-green-600 text-green-600 hover:bg-green-50 bg-white"
                  >
                    <Phone className="w-3 h-3 mr-1" />
                    Call Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}