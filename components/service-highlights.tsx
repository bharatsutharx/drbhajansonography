"use client"

import type { ReactNode } from "react"

type Highlight = {
  icon: ReactNode
  title: string
  description: string
}

interface ServiceHighlightsProps {
  highlights?: Highlight[]
}

/* 👉 default data used when no prop is passed */
const defaultHighlights: Highlight[] = [
  {
    title: "Safe & Secure",
    description: "FDA-approved equipment with the highest safety standards",
    icon: "🛡️",
  },
  {
    title: "Quick Results",
    description: "Digital reports delivered the same day",
    icon: "⏱️",
  },
  {
    title: "Expert Care",
    description: "15+ years of diagnostic radiology experience",
    icon: "🏆",
  },
]

export default function ServiceHighlights({ highlights }: ServiceHighlightsProps) {
  const items = highlights ?? defaultHighlights

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Our Service Highlights</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((hl, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
              <div className="text-4xl mb-4">{hl.icon}</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">{hl.title}</h3>
              <p className="text-gray-600">{hl.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
