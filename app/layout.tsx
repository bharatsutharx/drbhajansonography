import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Dr. Bhajan Sonography & Imaging Center</title>
        <meta
          name="description"
          content="Advanced medical imaging services including 1.5T MRI, 96 Slice CT Scan, Digital X-Ray, Sonography, and Colour Doppler with expert radiologist Dr. Bhajan Lal."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
