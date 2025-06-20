"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send, Bot, User, Phone, Minimize2 } from "lucide-react"
import { generateMedicalResponse } from "@/lib/ai-service"

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
}

const quickRepliesEnglish = [
  "Book Appointment",
  "MRI Scan Info",
  "CT Scan Info",
  "Ultrasound Info",
  "Location & Hours",
  "Contact Details",
]

const quickRepliesHindi = [
  "अपॉइंटमेंट बुक करें",
  "MRI स्कैन जानकारी",
  "CT स्कैन जानकारी",
  "अल्ट्रासाउंड जानकारी",
  "पता और समय",
  "संपर्क विवरण",
]

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [showIntro, setShowIntro] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "नमस्ते! Hello! I'm here to help you with Dr. Bhajan Sonography & Imaging Centre. आप हिंदी या English में बात कर सकते हैं। How can I assist you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [language, setLanguage] = useState<"en" | "hi" | "mixed">("mixed")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Show intro notification after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShowIntro(true)
        // Auto hide intro after 8 seconds
        setTimeout(() => setShowIntro(false), 8000)
      }
    }, 3000) // Show after 3 seconds

    return () => clearTimeout(timer)
  }, [hasInteracted])

  // Hide intro when user interacts
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, isMinimized])

  const detectLanguage = (text: string): "en" | "hi" | "mixed" => {
    const hindiPattern = /[\u0900-\u097F]/
    const englishPattern = /[a-zA-Z]/

    const hasHindi = hindiPattern.test(text)
    const hasEnglish = englishPattern.test(text)

    if (hasHindi && hasEnglish) return "mixed"
    if (hasHindi) return "hi"
    if (hasEnglish) return "en"
    return "mixed"
  }

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

    // Detect language preference
    const detectedLang = detectLanguage(text)
    setLanguage(detectedLang)

    try {
      const response = await generateMedicalResponse(text, detectedLang)

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
        text:
          language === "hi"
            ? "क्षमा करें, मुझे कुछ तकनीकी समस्या हो रही है। कृपया +91 94609 91212 पर कॉल करें।"
            : "Sorry, I'm having technical issues. Please call +91 94609 91212 for immediate assistance.",
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply)
  }

  const handleCall = () => {
    window.open("tel:+919460991212", "_self")
  }

  const handleChatOpen = () => {
    setIsOpen(true)
    setShowIntro(false)
    setHasInteracted(true)
  }

  const currentQuickReplies = language === "hi" ? quickRepliesHindi : quickRepliesEnglish

  return (
    <>
      {/* Intro Notification Popup */}
      {/* Enhanced Chat Widget Button */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-50">
        {/* Main button */}
        <Button
          onClick={handleChatOpen}
    className="relative w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg border-2 border-white transition-all duration-300"
    aria-label="Open medical assistant chat"
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
        <div className="fixed bottom-20 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-80 md:w-96 max-w-sm z-50 transition-all duration-300">
          <Card className="h-[70vh] sm:h-[500px] max-h-[600px] flex flex-col shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            {/* Header */}
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg p-3 sm:p-4 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-3 h-3 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-sm sm:text-lg font-semibold">Dr. Bhajan Assistant</CardTitle>
                    <div className="text-xs text-blue-100 flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>{isLoading ? "Typing..." : "Online • हिंदी/English"}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
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

            {/* Content - Hidden when minimized */}
            {!isMinimized && (
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
                    {currentQuickReplies.slice(0, 3).map((reply) => (
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
                      placeholder={language === "hi" ? "अपना संदेश लिखें..." : "Type your message..."}
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
                      {language === "hi" ? "कॉल करें" : "Call Now"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </>
  )
}
