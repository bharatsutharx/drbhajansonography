"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import LoadingSpinner from "./loading-spinner"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()

  const handleNavigation = async (href: string) => {
    if (window.location.pathname === href) return

    setIsLoading(true)
    setIsOpen(false)

    await new Promise((resolve) => setTimeout(resolve, 100))
    router.push(href)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <nav
        className={`bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-40 transition-all duration-300 border-b border-gray-100 ${
          isScrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14 sm:h-16">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center group">
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-blue-400 transition-all duration-300 shadow-sm group-hover:shadow-md">
                    <Image
                      src="images/logo-en.jpg"
                      alt="Dr. Bhajan Sonography & Imaging Center"
                      width={48}
                      height={48}
                      className="object-cover w-full h-full scale-110 group-hover:scale-125 transition-transform duration-300"
                      priority
                    />
                  </div>
                  {/* Subtle glow effect on hover */}
                  <div className="absolute inset-0 rounded-full bg-blue-400/20 opacity-0 group-hover:opacity-100 sm:group-hover:opacity-100 active:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  </div>
              </Link>
              <div className="ml-3 sm:ml-4">
              <h2 className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base">Dr. Bhajan Sonography</h2>
              <p className="text-xs sm:text-sm text-gray-500">& CT, MRI Centre</p>
              </div>
              </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => handleNavigation("/")}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
              </button>
              <button
                onClick={() => handleNavigation("/services")}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
              >
                Services
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
              </button>
              <button
                onClick={() => handleNavigation("/about")}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
              >
                About Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
              </button>
              <button
                onClick={() => handleNavigation("/contact")}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-blue-600 p-2 rounded-md transition-colors duration-200 hover:bg-gray-50"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
                <button
                  onClick={() => handleNavigation("/")}
                  className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavigation("/services")}
                  className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
                >
                  Services
                </button>
                <button
                  onClick={() => handleNavigation("/about")}
                  className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
                >
                  About Us
                </button>
                <button
                  onClick={() => handleNavigation("/contact")}
                  className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
