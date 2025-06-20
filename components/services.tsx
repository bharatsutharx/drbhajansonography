"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Scan, Bone, Baby, Heart, Eye, Phone, Clock, CheckCircle, Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const services = [
  {
    id: "mri",
    title: "1.5T MRI Scan",
    description: "High-resolution magnetic resonance imaging for detailed soft tissue analysis",
    icon: Brain,
    image: "/images/mri-machine.jpg",
    features: ["No radiation", "Detailed imaging", "Multiple sequences", "Expert reporting"],
    duration: "30-60 minutes",
    preparation: "No special preparation required",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    link: "/services/mri",
  },
  {
    id: "ct",
    title: "96 Slice CT Scan",
    description: "Advanced computed tomography with rapid, high-quality imaging",
    icon: Scan,
    image: "/images/ct-scanner.jpg",
    features: ["Fast scanning", "High resolution", "3D reconstruction", "Low dose protocol"],
    duration: "5-15 minutes",
    preparation: "Fasting may be required",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    link: "/services/ct",
  },
  {
    id: "ultrasound",
    title: "Ultrasound & Doppler",
    description: "Comprehensive sonography and color doppler studies",
    icon: Baby,
    image: "/images/ultrasound-scan.jpg",
    features: ["Real-time imaging", "No radiation", "Color doppler", "Pregnancy scans"],
    duration: "20-45 minutes",
    preparation: "Full bladder for some scans",
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
    iconColor: "text-pink-600",
    link: "/services/ultrasound",
  },
  {
    id: "xray",
    title: "Digital X-Ray",
    description: "Digital radiography for bone and chest imaging with instant results",
    icon: Bone,
    image: "/images/reception-area.jpg",
    features: ["Instant results", "Digital quality", "Low radiation", "Multiple views"],
    duration: "5-10 minutes",
    preparation: "Remove metal objects",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    link: "/services/xray",
  },
  {
    id: "echo",
    title: "Echocardiography",
    description: "Cardiac ultrasound for heart function assessment",
    icon: Heart,
    image: "/images/center-inauguration.jpg",
    features: ["Heart function", "Valve assessment", "Blood flow", "Non-invasive"],
    duration: "30-45 minutes",
    preparation: "No special preparation",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    iconColor: "text-red-600",
    link: "/services/echo",
  },
  {
    id: "mammography",
    title: "Digital Mammography",
    description: "Breast cancer screening with digital mammography technology",
    icon: Eye,
    image: "/images/reception-area.jpg",
    features: ["Early detection", "Digital clarity", "Comfortable procedure", "Expert analysis"],
    duration: "15-20 minutes",
    preparation: "Avoid deodorants/powders",
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
    link: "/services/mammography",
  },
]

export default function Services() {
  const handleBookAppointment = (serviceName: string) => {
    const message = `Hi, I would like to book an appointment for ${serviceName}. Please let me know the available slots.`
    const whatsappUrl = `https://wa.me/919460991212?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 mb-4">
            <Star className="w-4 h-4 mr-2" />
            Premium Services
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Advanced Diagnostic Services
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            State-of-the-art medical imaging technology combined with expert radiologist interpretation for accurate
            diagnosis and exceptional patient care.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <Card
                key={service.id}
                className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50 overflow-hidden"
              >
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${service.bgColor} flex items-center justify-center backdrop-blur-sm`}
                    >
                      <IconComponent className={`w-6 h-6 ${service.iconColor}`} />
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">{service.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-sm">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Duration & Preparation */}
                  <div className="space-y-3 pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <div>
                        <span className="text-sm font-medium text-gray-900">Duration: </span>
                        <span className="text-sm text-gray-600">{service.duration}</span>
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">Preparation: </span>
                      <span className="text-gray-600">{service.preparation}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                      onClick={() => handleBookAppointment(service.title)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white group/btn"
                    >
                      <Phone className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                      Book Now
                    </Button>
                    <Link href={service.link} className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full group/btn border-gray-300 hover:border-blue-600 hover:bg-blue-50"
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 lg:p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">Why Choose Our Services?</h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                We combine cutting-edge technology with compassionate care to deliver exceptional diagnostic services
                that you can trust.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Expert Radiologist", "Latest Technology", "Quick Results", "Affordable Pricing"].map(
                  (benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="font-medium">{benefit}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
            <div className="text-center lg:text-right">
              <div className="inline-flex flex-col space-y-4">
                <Button
                  onClick={() => handleBookAppointment("General Consultation")}
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call +91 94609 91212
                </Button>
                <p className="text-blue-200 text-sm">Available 8:00 AM - 8:00 PM Daily</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
