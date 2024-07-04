'use client'

import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/SearchBar"
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const displayScents = [
  { name: "Chanel No. 5", key: 68 },
  { name: "Dior Sauvage", key: 43 },
  { name: "Creed Aventus", key: 2 },
  { name: "YSL Black Opium", key: 70 },
]


export default function Home() {
  const findRandom = () => {
    const randomRange = 1000
    const randomKey = Math.floor(Math.random() * randomRange)
    return randomKey;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-background py-12 px-6">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
          <h1 className="text-4xl font-bold text-center">Find Your Signature Scent</h1>
          <p className="text-muted-foreground text-lg text-center">Search for your favorite perfumes to find alternatives and fragrances that will give the same vibes.</p>
          <div className="w-full flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <SearchBar />
            </div>
            {/* suggested perfumes */}
            <div className="flex flex-wrap gap-2 justify-center">
              {displayScents.map((scent) => (
                <Link key={scent.key} href={`/recommendation/${encodeURIComponent(scent.key.toString(),)}`}>
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
              <Link href={`/recommendation/${findRandom()}`}>
                <Button
                  variant="ghost"
                  className="rounded-full bg-muted text-muted-foreground px-4 py-2 hover:bg-muted-90 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary flex items-center gap-2"
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