"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Services from "@/components/services"
import PageTransition from "@/components/page-transition"
import ChatbotWidget from "@/components/chatbot/chatbot-widget"

export default function ServicesPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-16">
          <Services />
        </main>
        <Footer />
        <ChatbotWidget />
      </div>
    </PageTransition>
  )
}
