'use client'

import React, { useState, useEffect, useRef } from 'react'
import Fuse from 'fuse.js'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'

interface Perfume {
  combined_name: string
  key: number
  brand: string
  perfume: string
  image_url: string
  longevity: string
  sillage: string
  reviews: string
  notes: string
  main_accords: string
}

export default function PerfumeSearch() {
  const [data, setData] = useState<Perfume[]>([])
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Perfume[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/get_all_perfumes') // Replace with your API URL
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const perfumes: Perfume[] = await response.json()
        // Create a combined name field for searching
        perfumes.forEach((perfume, index) => {
          perfume.combined_name = `${perfume.brand} ${perfume.perfume}`
          perfume.key = index
        })
        setData(perfumes)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (data.length) {
      const fuse = new Fuse(data, {
        keys: ['combined_name'],
        threshold: 0.6,
      })

      const searchResults = fuse.search(query)
      setResults(searchResults.map(result => result.item).slice(0, 5))
    }
  }, [data, query])

  const handleSearch = () => {
    setShowSuggestions(false)
    // Implement actual search functionality here
    console.log('Searching for:', query)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownRef])

  return (
    <div className="search-container mx-auto p-4 !bg-white !text-black w-3/5 ">
      <div className="search-bar relative">
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setShowSuggestions(true)
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search perfumes..."
          className="w-full !bg-white py-2 px-4 rounded-full border-2 border-gray-200 focus:outline-none focus:border-blue-500"
        />
        <Button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
        >
          Search
        </Button>
      </div>
      <div className="dropdown">
        {showSuggestions && results.length > 0 && (
          <Card ref={dropdownRef} className="absolute z-10 w-3/5 max-w-2xl mt-1 !bg-white shadow-lg !text-black rounded-lg overflow-hidden">
            {results.map((item) => (
              <Link href={`/recommendation/${item.key}`}
                key={item.key}
                className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => {
                  setQuery(item.perfume)
                  setShowSuggestions(false)
                  if (inputRef.current) inputRef.current.focus()
                }}
              >
                <Image
                  src={item.image_url}
                  alt={item.perfume}
                  width={40}
                  height={40}
                  className="mr-2 rounded"
                />
                <div>
                  <div className="font-semibold">{item.perfume}</div>
                  <div className="text-sm text-gray-600">{item.brand}</div>
                </div>
              </Link>
            ))}
          </Card>
        )}
      </div>
    </div>
  )
}