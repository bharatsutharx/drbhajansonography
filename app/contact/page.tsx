"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageTransition from "@/components/page-transition"
import ChatbotWidget from "@/components/chatbot/chatbot-widget"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, MapPin, Clock, MessageCircle, Navigation, Star, Heart } from "lucide-react"

export default function ContactPage() {
  const handleCall = () => {
    window.open("tel:+919460991212", "_self")
  }

  const handleWhatsApp = () => {
    const message = "Hi, I would like to book an appointment. Please let me know the available slots."
    const whatsappUrl = `https://wa.me/919460991212?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleGetDirections = () => {
    window.open("https://maps.google.com/?q=N.H.+68,+Opp.+B.Lal+%26+Citilite+Hospital,+Kamalpura,+Sanchor", "_blank")
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Navbar />

        <main className="pt-16">
          {/* Hero Section */}
          <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 mb-6">
                  <Heart className="w-4 h-4 mr-2" />
                  Get In Touch
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Contact Us
                  <span className="block text-blue-600">We're Here to Help</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Ready to schedule your appointment or have questions about our services? Our friendly team is here to
                  assist you with all your medical imaging needs.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-8 h-8 text-green-600" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">Call Us</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Speak directly with our team</p>
                    <p className="text-2xl font-bold text-green-600 mb-4">+91 94609 91212</p>
                    <Button onClick={handleCall} className="w-full bg-green-600 hover:bg-green-700">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">Visit Us</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Come to our modern facility</p>
                    <p className="text-sm text-gray-700 mb-4">
                      N.H. 68, Opp. B.Lal & Citilite Hospital, Kamalpura, Sanchor
                    </p>
                    <Button onClick={handleGetDirections} variant="outline" className="w-full">
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-8 h-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">WhatsApp</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Quick messaging support</p>
                    <p className="text-lg font-semibold text-purple-600 mb-4">Instant Response</p>
                    <Button onClick={handleWhatsApp} className="w-full bg-purple-600 hover:bg-purple-700">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message Us
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Operating Hours */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Operating Hours</h2>
                  <p className="text-gray-600">We're open every day to serve you better</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Regular Hours</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Monday - Sunday</span>
                        <span className="font-semibold text-gray-900">8:00 AM - 8:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Emergency Services</span>
                        <span className="font-semibold text-green-600">24/7 Available</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button onClick={handleCall} size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                        <Phone className="w-5 h-5 mr-2" />
                        Book Appointment Now
                      </Button>
                      <Button onClick={handleWhatsApp} variant="outline" size="lg" className="w-full">
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Chat on WhatsApp
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Map Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Us Easily</h2>
                <p className="text-lg text-gray-600">
                  Located on National Highway 68, opposite B.Lal & Citilite Hospital for easy access
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center mb-6">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg font-medium">Interactive Map</p>
                    <p className="text-sm">Click "Get Directions" to open in Google Maps</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Address Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">Dr. Bhajan Sonography & Imaging Centre</p>
                          <p className="text-gray-600">N.H. 68, Opp. B.Lal & Citilite Hospital</p>
                          <p className="text-gray-600">Kamalpura, Sanchor, Rajasthan</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700">+91 94609 91212</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Landmarks</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-gray-700">Opposite B.Lal & Citilite Hospital</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-gray-700">On National Highway 68</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-gray-700">Near Kamalpura Main Market</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleGetDirections}
                      size="lg"
                      className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
                    >
                      <Navigation className="w-5 h-5 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <ChatbotWidget />
      </div>
    </PageTransition>
  )
}
