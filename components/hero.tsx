"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, MapPin, Clock, Star, Shield, Award, ChevronRight, Stethoscope, Activity } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Advanced MRI Technology",
      subtitle: "1.5T Siemens MRI Scanner",
      description:
        "Experience precision healthcare with our state-of-the-art 1.5T MRI technology for detailed soft tissue imaging.",
      image: "/images/mri-machine.jpg",
      badge: "Latest MRI Tech",
    },
    {
      title: "Expert Ultrasound Services",
      subtitle: "4D Pregnancy & Diagnostic Scans",
      description:
        "Advanced ultrasound technology with expert radiologist interpretation for accurate diagnoses and beautiful pregnancy memories.",
      image: "/images/ultrasound-scan.jpg",
      badge: "Expert Care",
    },
    {
      title: "Multi-Slice CT Scanning",
      subtitle: "96 Slice Siemens CT Scanner",
      description:
        "Rapid, high-resolution CT imaging with advanced reconstruction capabilities for comprehensive diagnostic solutions.",
      image: "/images/ct-scanner.jpg",
      badge: "Fast & Accurate",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const handleBookAppointment = () => {
    window.open("tel:+919460991212", "_self")
  }

  const handleGetDirections = () => {
    window.open("https://maps.google.com/?q=N.H.+68,+Opp.+B.Lal+%26+Citilite+Hospital,+Kamalpura,+Sanchor", "_blank")
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-600 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-600 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-120px)]">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <div className="flex justify-center lg:justify-start">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-4 py-2 text-sm font-medium border border-blue-200">
                <Award className="w-4 h-4 mr-2" />
                {slides[currentSlide].badge}
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                <span className="block">{slides[currentSlide].title}</span>
                <span className="block text-blue-600 mt-2">{slides[currentSlide].subtitle}</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {slides[currentSlide].description}
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-gray-100">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Safe & Secure</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-gray-100">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Stethoscope className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Expert Care</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-gray-100">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Activity className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Latest Tech</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-gray-100">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-yellow-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">5-Star Rated</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={handleBookAppointment}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Book Appointment
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={handleGetDirections}
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 group"
              >
                <MapPin className="w-5 h-5 mr-2 group-hover:bounce transition-transform" />
                Get Directions
              </Button>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">Open Daily</div>
                  <div className="text-gray-600">8:00 AM - 8:00 PM</div>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <Phone className="w-5 h-5 text-green-600" />
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">Call Now</div>
                  <div className="text-gray-600">+91 94609 91212</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Real Machine Images Carousel */}
          <div className="relative order-1 lg:order-2">
            <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    quality={90}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              ))}

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "bg-white shadow-lg scale-110" : "bg-white/50 hover:bg-white/75"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Stats Cards */}
            <div className="absolute -bottom-6 -left-6 hidden lg:block">
              <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">15+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="absolute -top-6 -right-6 hidden lg:block">
              <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">10K+</div>
                    <div className="text-sm text-gray-600">Happy Patients</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Services Preview */}
        <div className="mt-16 lg:mt-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Specialized Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive diagnostic imaging services with state-of-the-art technology
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "1.5T MRI Scan", icon: "🧠", description: "High-resolution magnetic resonance imaging" },
              { name: "96 Slice CT Scan", icon: "🔍", description: "Advanced computed tomography" },
              { name: "Digital X-Ray", icon: "🦴", description: "Digital radiography services" },
              { name: "Ultrasound & Doppler", icon: "👶", description: "Sonography and color doppler" },
            ].map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/services">
              <Button variant="outline" size="lg" className="group">
                View All Services
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
