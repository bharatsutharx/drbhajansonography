"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Instagram } from "lucide-react"

export default function Footer() {
  const handleGoogleMaps = () => {
    window.open("https://maps.google.com/?q=N.H.+68,+Opp.+B.Lal+%26+Citilite+Hospital,+Kamalpura,+Sanchor", "_blank")
  }

  const handleInstagram = () => {
    window.open("https://instagram.com/drbhajansonographycentre", "_blank")
  }

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-100">
                <Image
                  src="/images/logo2.jpg"
                  alt="Dr. Bhajan Sonography & CT, MRI Centre"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Dr. Bhajan Sonography</h3>
          <p className="text-xs sm:text-sm text-gray-600">& CT, MRI Centre</p>
              </div>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Advanced medical imaging services with state-of-the-art technology and expert radiologist care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
          <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h3>
          <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleInstagram}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 text-gray-600" />
              </button>
              <button
                onClick={handleGoogleMaps}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors"
                aria-label="Google Maps"
              >
                <MapPin className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Contact Info</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start text-gray-600">
                <Phone className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <a href="tel:+919460991212" className="text-sm hover:text-blue-600">
                    +91 94609 91212
                  </a>
                </div>
              </li>
              <li className="flex items-start text-gray-600">
                <Mail className="h-4 w-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a href="mailto:drbhajansonography@gmail.com" className="text-sm hover:text-green-600">
                    drbhajansonography@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start text-gray-600">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm">
                    N.H. 68, Opp. B.Lal & Citilite Hospital,
                    <br />
                    Kamalpura, Sanchor
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section - Optimized Height */}
        <div className="border-t border-gray-200 mt-6 sm:mt-8 pt-4 text-center">
    <p className="text-gray-600 text-xs sm:text-sm px-2">
      © 2024 Dr. Bhajan Sonography & CT, MRI Centre. All rights reserved.
    </p>
  </div>
</div>
    </footer>
  )
}
