'use client'

import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/SearchBar"
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from "react"

const displayScents = [
  { name: "Chanel No. 5", key: 68 },
  { name: "Dior Sauvage", key: 43 },
  { name: "Creed Aventus", key: 2 },
  { name: "YSL Black Opium", key: 70 },
]


export default function Home() {

  const [randomKey, setRandomKey] = useState(0)

  const findRandom = () => {
    const randomRange = 1000
    const randomKey = Math.floor(Math.random() * randomRange)
    return randomKey;
  }
  useEffect(() => {
    setRandomKey(findRandom())
  }, [])

  return (
    <div className="flex flex-col grow justify-center">
      <main className="flex bg-background py-14 px-6">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
          <h1 className="text-2xl md:text-4xl font-bold text-center">Find Your Signature Scent</h1>
          <p className="text-muted-foreground text-base md:text-lg text-center">Search for your favorite perfumes to find alternatives and fragrances that will give the same vibes.</p>
          <div className="w-full flex flex-col gap-4 md:gap-12">
            <div className="flex items-center gap-4">
              <SearchBar />
            </div>
            {/* suggested perfumes */}
            <div className="flex flex-wrap gap-1 md:gap-2 justify-center">
              {displayScents.map((scent) => (
                <Link key={scent.key} href={`/recommendation/${encodeURIComponent(scent.key)}`}>
                  <Button
                    key={scent.key}
                    variant="ghost"
                    className="rounded-full bg-muted text-muted-foreground px-4 py-2 hover:bg-muted-90 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary flex items-center gap-2"
                  >
                    {scent.name}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              ))}
              {/* random button */}
              <Link href={`/recommendation/${randomKey}`}>
                <Button
                  variant="ghost"
                  className="rounded-full boerder-muted border-2 bg-muted text-muted-foreground px-4 py-2 hover:bg-muted-90 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary flex items-center gap-2"
                >
                  Suggest Me A Random Perfume
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}