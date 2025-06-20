"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Quote, ChevronLeft, ChevronRight, Phone, Heart } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Sanchor",
    service: "MRI Scan",
    rating: 5,
    text: "Excellent service and very professional staff. Dr. Bhajan explained everything clearly and the MRI results were delivered quickly. The facility is clean and modern. Highly recommended!",
    avatar: "PS",
    date: "2 weeks ago",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Jalore",
    service: "CT Scan",
    rating: 5,
    text: "Outstanding experience! The CT scan was done efficiently and the staff was very caring. Dr. Bhajan's expertise is evident in his detailed explanations. Great value for money.",
    avatar: "RK",
    date: "1 month ago",
  },
  {
    id: 3,
    name: "Sunita Patel",
    location: "Bhinmal",
    service: "Ultrasound",
    rating: 5,
    text: "Very comfortable experience during my pregnancy ultrasound. The staff was gentle and Dr. Bhajan took time to show us the baby clearly. Wonderful service!",
    avatar: "SP",
    date: "3 weeks ago",
  },
  {
    id: 4,
    name: "Amit Verma",
    location: "Sirohi",
    service: "X-Ray",
    rating: 5,
    text: "Quick and efficient service. Got my X-ray results within an hour. The digital quality is excellent and the pricing is very reasonable. Will definitely recommend to others.",
    avatar: "AV",
    date: "1 week ago",
  },
  {
    id: 5,
    name: "Meera Joshi",
    location: "Pali",
    service: "Mammography",
    rating: 5,
    text: "Professional and compassionate care during my mammography screening. The female technician made me feel comfortable throughout the procedure. Excellent facility!",
    avatar: "MJ",
    date: "2 months ago",
  },
  {
    id: 6,
    name: "Vikram Singh",
    location: "Jodhpur",
    service: "Echo Cardiography",
    rating: 5,
    text: "Dr. Bhajan's expertise in cardiac imaging is remarkable. The echo test was thorough and he explained all the findings in detail. Top-notch medical care!",
    avatar: "VS",
    date: "1 month ago",
  },
]

const stats = [
  { label: "Patient Rating", value: "4.9/5", icon: Star, color: "text-yellow-500" },
  { label: "Happy Patients", value: "10,000+", icon: Heart, color: "text-red-500" },
  { label: "Years Experience", value: "15+", icon: Quote, color: "text-blue-500" },
  { label: "Success Rate", value: "99%", icon: Star, color: "text-green-500" },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const handleBookAppointment = () => {
    window.open("tel:+919460991212", "_self")
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 mb-4">
            <Heart className="w-4 h-4 mr-2" />
            Patient Stories
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">What Our Patients Say</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real experiences from real patients who trust us with their healthcare needs. Your health and satisfaction
            are our top priorities.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <IconComponent className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                  <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Main Testimonial Carousel */}
        <div className="relative mb-16">
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Testimonial Content */}
                <div className="p-8 lg:p-12">
                  <div className="mb-6">
                    <Quote className="w-12 h-12 text-blue-600 mb-4" />
                    <div className="flex items-center mb-4">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  <blockquote className="text-lg lg:text-xl text-gray-700 mb-8 leading-relaxed italic">
                    "{testimonials[currentIndex].text}"
                  </blockquote>

                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonials[currentIndex].avatar}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{testimonials[currentIndex].name}</div>
                      <div className="text-gray-600">{testimonials[currentIndex].location}</div>
                      <div className="text-sm text-blue-600 font-medium">{testimonials[currentIndex].service}</div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500">{testimonials[currentIndex].date}</div>
                </div>

                {/* Visual Element */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 lg:p-12 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Heart className="w-20 h-20 mx-auto mb-6 opacity-80" />
                    <h3 className="text-2xl font-bold mb-4">Trusted Healthcare</h3>
                    <p className="text-blue-100 mb-6">
                      Join thousands of satisfied patients who chose us for their diagnostic needs
                    </p>
                    <Button
                      onClick={handleBookAppointment}
                      className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 font-semibold"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Book Your Appointment
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center text-gray-600 hover:text-blue-600"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center text-gray-600 hover:text-blue-600"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-2 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Additional Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">"{testimonial.text.substring(0, 120)}..."</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
                    <div className="text-xs text-gray-600">{testimonial.service}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Experience Quality Healthcare?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our family of satisfied patients and experience the difference of personalized, professional medical
            imaging services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleBookAppointment}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call +91 94609 91212
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
            >
              View All Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
