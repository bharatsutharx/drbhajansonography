"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageTransition from "@/components/page-transition"
import ChatbotWidget from "@/components/chatbot/chatbot-widget"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Award,
  Heart,
  Shield,
  Clock,
  Star,
  Phone,
  MapPin,
  Calendar,
  Activity,
  CheckCircle,
  Users,
  Target,
  Eye,
} from "lucide-react"
import Image from "next/image"

const achievements = [
  { icon: Users, label: "Happy Patients", value: "10,000+", color: "text-blue-600" },
  { icon: Calendar, label: "Years Experience", value: "15+", color: "text-green-600" },
  { icon: Award, label: "Success Rate", value: "99%", color: "text-purple-600" },
  { icon: Star, label: "Patient Rating", value: "4.9/5", color: "text-yellow-600" },
]

const values = [
  {
    icon: Heart,
    title: "Compassionate Care",
    description:
      "We treat every patient with empathy, respect, and personalized attention to ensure comfort throughout their diagnostic journey.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description:
      "Patient safety is our top priority with FDA-approved equipment, strict protocols, and radiation safety measures.",
  },
  {
    icon: Target,
    title: "Precision & Accuracy",
    description:
      "Advanced technology combined with expert interpretation ensures the most accurate diagnostic results for better treatment outcomes.",
  },
  {
    icon: Clock,
    title: "Timely Service",
    description:
      "We understand the importance of quick diagnosis and provide fast, efficient service without compromising on quality.",
  },
]

const timeline = [
  {
    year: "2008",
    title: "Foundation",
    description:
      "Dr. Bhajan Lal established the center with a vision to provide quality diagnostic services to the community.",
  },
  {
    year: "2012",
    title: "Technology Upgrade",
    description: "Introduced digital X-ray and advanced ultrasound systems to enhance diagnostic capabilities.",
  },
  {
    year: "2016",
    title: "CT Scan Installation",
    description: "Added 96-slice CT scanner to provide comprehensive imaging services under one roof.",
  },
  {
    year: "2020",
    title: "MRI Services",
    description: "Installed 1.5T MRI system, becoming the most advanced imaging center in the region.",
  },
  {
    year: "2023",
    title: "Digital Excellence",
    description: "Achieved complete digital workflow with AI-assisted reporting and telemedicine capabilities.",
  },
]

export default function AboutPage() {
  const handleBookAppointment = () => {
    window.open("tel:+919460991212", "_self")
  }

  const handleGetDirections = () => {
    window.open("https://maps.google.com/?q=N.H.+68,+Opp.+B.Lal+%26+Citilite+Hospital,+Kamalpura,+Sanchor", "_blank")
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Navbar />

        <main>
          {/* Hero Section */}
          <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 mb-6">
                    <Heart className="w-4 h-4 mr-2" />
                    About Our Center
                  </Badge>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                    Dedicated to Your
                    <span className="block text-blue-600">Health & Wellness</span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed mb-8">
                    For over 15 years, Dr. Bhajan Sonography & CT, MRI Centre has been at the forefront of diagnostic
                    imaging, combining advanced technology with compassionate care to serve our community with
                    excellence.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={handleBookAppointment}
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Book Appointment
                    </Button>
                    <Button
                      onClick={handleGetDirections}
                      variant="outline"
                      size="lg"
                      className="border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
                    >
                      <MapPin className="w-5 h-5 mr-2" />
                      Visit Us
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/images/center-inauguration.jpg"
                      alt="Dr. Bhajan Sonography & Imaging Centre"
                      fill
                      className="object-cover"
                      priority
                      quality={90}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Floating Achievement Cards */}
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
            </div>
          </section>

          {/* Achievements Section */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {achievements.map((achievement, index) => {
                  const IconComponent = achievement.icon
                  return (
                    <Card
                      key={index}
                      className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                      <CardContent className="p-6">
                        <IconComponent className={`w-8 h-8 ${achievement.color} mx-auto mb-3`} />
                        <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{achievement.value}</div>
                        <div className="text-sm text-gray-600">{achievement.label}</div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </section>

          {/* About Dr. Bhajan Section */}
          <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="/images/reception-area.jpg"
                      alt="Dr. Bhajan Lal - Chief Radiologist"
                      fill
                      className="object-cover"
                      quality={90}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </div>

                <div className="order-1 lg:order-2">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200 mb-6">
                    <Award className="w-4 h-4 mr-2" />
                    Expert Radiologist
                  </Badge>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Meet Dr. Bhajan Lal</h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    With over 15 years of dedicated experience in diagnostic radiology, Dr. Bhajan Lal has been
                    instrumental in providing accurate diagnoses and exceptional patient care. His expertise spans
                    across all imaging modalities including MRI, CT, ultrasound, and X-ray.
                  </p>

                  <div className="space-y-4 mb-8">
                    {[
                      "MD in Radiodiagnosis",
                      "15+ years of clinical experience",
                      "Specialist in advanced imaging techniques",
                      "Thousands of successful diagnoses",
                      "Committed to continuous medical education",
                    ].map((qualification, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{qualification}</span>
                      </div>
                    ))}
                  </div>

                  <blockquote className="border-l-4 border-blue-600 pl-6 italic text-gray-700 bg-white p-4 rounded-r-lg shadow-sm">
                    "My commitment is to provide every patient with accurate diagnosis and compassionate care, ensuring
                    they receive the best possible healthcare experience."
                    <footer className="mt-2 text-sm text-gray-600">- Dr. Bhajan Lal</footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </section>

          {/* Our Values Section */}
          <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 mb-6">
                  <Eye className="w-4 h-4 mr-2" />
                  Our Values
                </Badge>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  What Drives Us Forward
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Our core values guide everything we do, from patient care to technological advancement, ensuring we
                  deliver the highest standards of medical imaging services.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {values.map((value, index) => {
                  const IconComponent = value.icon
                  return (
                    <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-8">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{value.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Timeline Section */}
          <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 mb-6">
                  <Activity className="w-4 h-4 mr-2" />
                  Our Journey
                </Badge>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  15 Years of Excellence
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  From humble beginnings to becoming the region's most advanced imaging center, our journey has been
                  marked by continuous innovation and unwavering commitment to patient care.
                </p>
              </div>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200 hidden lg:block"></div>

                <div className="space-y-12">
                  {timeline.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                    >
                      <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? "lg:pr-8" : "lg:pl-8"}`}>
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                          <CardContent className="p-6">
                            <Badge className="bg-blue-600 text-white mb-4">{item.year}</Badge>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{item.description}</p>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Timeline Dot */}
                      <div className="hidden lg:flex w-2/12 justify-center">
                        <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                      </div>

                      <div className="hidden lg:block w-5/12"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-600 to-blue-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Experience the Difference</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
                Join thousands of satisfied patients who have trusted us with their healthcare needs. Experience our
                commitment to excellence, advanced technology, and personalized care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleBookAppointment}
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Book Your Appointment
                </Button>
                <Button
                  onClick={handleGetDirections}
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Visit Our Center
                </Button>
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
