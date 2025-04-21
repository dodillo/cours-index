"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface CourseSearchProps {
  onSearch: (query: string) => void
}

export function CourseSearch({ onSearch }: CourseSearchProps) {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    onSearch(newQuery)
  }

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Rechercher un cours..."
        className="w-full pl-8"
        value={query}
        onChange={handleSearch}
      />
    </div>
  )
}
