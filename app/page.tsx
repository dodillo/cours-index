"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { File, GraduationCap, Search, Star, X } from "lucide-react"
import confetti from "canvas-confetti"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ParticleBackground } from "@/components/particle-background"

interface Course {
  id: string
  title: string
  description: string
  category: string
  notionLink: string
  badge?: string
  color: string
  icon: string
}

// This would typically come from an API or database
const courses: Course[] = [
  {
    id: "management-strategique",
    title: "Management stratégique",
    category: "management",
    notionLink: "https://curse-beast-a8d.notion.site/Cours-1b12e3d9501c80c28991ebf3e5459c25?pvs=4",
    color: "#3182ce",
    icon: "📊",
  },
  {
    id: "methodologie-recherche",
    title: "Méthodologie de recherche",
    category: "research",
    notionLink: "https://curse-beast-a8d.notion.site/M-thodologie-de-recherche-1912e3d9501c807485a0fc4e08e61d44?pvs=4",
    color: "#805ad5",
    icon: "🔍",
  },
  {
    id: "gestion-budgetaire",
    title: "Gestion budgétaire et prévisionnelle",
    category: "finance",
    notionLink: "https://curse-beast-a8d.notion.site/Cours-GBP-1ba2e3d9501c80079827f6eee15037ca?pvs=73",
    color: "#38a169",
    icon: "💰",
  },
  {
    id: "strategie-financiere",
    title: "Stratégie financière",
    category: "finance",
    notionLink: "https://curse-beast-a8d.notion.site/Cours-1a12e3d9501c80b1b2a7fde357872aab?pvs=4",
    badge: "Popular",
    color: "#38a169",
    icon: "📈",
  },
  {
    id: "audit-comptable",
    title: "Audit comptable et financier",
    category: "finance",
    notionLink: "https://curse-beast-a8d.notion.site/Cours-2-1d12e3d9501c80408fd5fc9c056643cb?pvs=4",
    color: "#38a169",
    icon: "🧮",
  },
  {
    id: "anglais-affaires",
    title: "Anglais des affaires",
    category: "languages",
    notionLink: "https://notion.so/anglais-affaires",
    color: "#d53f8c",
    icon: "🇬🇧",
  },
  {
    id: "espagnole-affaires",
    title: "Espagnole des affaires",
    category: "languages",
    notionLink: "https://notion.so/espagnole-affaires",
    color: "#d53f8c",
    icon: "🇪🇸",
  },
  {
    id: "management-projet",
    title: "Management de projet",
    category: "management",
    notionLink: "https://notion.so/management-projet",
    badge: "New",
    color: "#3182ce",
    icon: "📋",
  },
  {
    id: "entrepreneuriat",
    title: "Entrepreneuriat",
    category: "business",
    notionLink: "https://notion.so/entrepreneuriat",
    color: "#dd6b20",
    icon: "🚀",
  },
  {
    id: "methodologie-communication",
    title: "Méthodologie de communication",
    category: "communication",
    notionLink: "https://notion.so/methodologie-communication",
    color: "#e53e3e",
    icon: "🗣️",
  },
]

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [favorites, setFavorites] = useState<string[]>([])
  const [filteredCourses, setFilteredCourses] = useState(courses)
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const categories = Array.from(new Set(courses.map((course) => course.category)))

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("courseFavorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  useEffect(() => {
    let result = courses

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter((course) => course.category === activeCategory)
    }

    setFilteredCourses(result)
  }, [searchQuery, activeCategory])

  const toggleFavorite = (courseId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]

      // Save to localStorage
      localStorage.setItem("courseFavorites", JSON.stringify(newFavorites))

      // Trigger confetti if adding to favorites
      if (!prev.includes(courseId)) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      }

      return newFavorites
    })
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />

      <div className="container relative z-10 mx-auto py-6 md:py-10">
        <motion.header
          className="mb-8 flex flex-col items-center space-y-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="rounded-lg bg-gradient-to-br from-[#3182ce] to-[#2c5282] p-3 shadow-lg">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
            <h1 className="bg-gradient-to-r from-[#3182ce] to-[#2c5282] bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
              S8 (Gestion Financière et Comptable)
            </h1>
          </motion.div>

          <motion.p
            className="max-w-[700px] text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Accédez à tous vos cours et ressources pédagogiques en un seul endroit
          </motion.p>

          <motion.div
            className="relative w-full max-w-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="relative">
              <Search
                className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors ${isSearchFocused ? "text-primary" : "text-muted-foreground"}`}
              />
              <Input
                type="search"
                placeholder="Rechercher un cours..."
                className={`w-full pl-9 pr-9 transition-all ${isSearchFocused ? "ring-2 ring-primary ring-offset-2" : ""}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </motion.div>
        </motion.header>

        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <TabsList className="grid w-full max-w-2xl grid-cols-3 sm:grid-cols-5 lg:grid-cols-7">
              <TabsTrigger value="all" className="relative overflow-hidden">
                <span className="relative z-10">Tous</span>
                <motion.div
                  className="absolute inset-0 bg-primary/10"
                  initial={{ x: "-100%" }}
                  animate={{ x: activeCategory === "all" ? 0 : "-100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="relative overflow-hidden capitalize">
                  <span className="relative z-10">{category}</span>
                  <motion.div
                    className="absolute inset-0 bg-primary/10"
                    initial={{ x: "-100%" }}
                    animate={{ x: activeCategory === category ? 0 : "-100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                </TabsTrigger>
              ))}
              {favorites.length > 0 && (
                <TabsTrigger
                  value="favorites"
                  className="relative overflow-hidden"
                  onClick={() => setActiveCategory("favorites")}
                >
                  <span className="relative z-10">Favoris</span>
                  <motion.div
                    className="absolute inset-0 bg-primary/10"
                    initial={{ x: "-100%" }}
                    animate={{ x: activeCategory === "favorites" ? 0 : "-100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                </TabsTrigger>
              )}
            </TabsList>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredCourses.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredCourses
                    .filter((course) => (activeCategory === "favorites" ? favorites.includes(course.id) : true))
                    .map((course, index) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: { delay: index * 0.05, duration: 0.3 },
                        }}
                      >
                        <CourseCard
                          course={course}
                          isFavorite={favorites.includes(course.id)}
                          onToggleFavorite={() => toggleFavorite(course.id)}
                        />
                      </motion.div>
                    ))}
                </div>
              ) : (
                <motion.div
                  className="flex flex-col items-center justify-center py-12 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="rounded-full bg-muted p-4">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">Aucun cours trouvé</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Essayez de modifier vos critères de recherche</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setActiveCategory("all")
                    }}
                    className="mt-4"
                  >
                    Réinitialiser les filtres
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  )
}

function CourseCard({
  course,
  isFavorite,
  onToggleFavorite,
}: {
  course: Course
  isFavorite: boolean
  onToggleFavorite: () => void
}) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
      <Card
        className="group relative overflow-hidden border-t-4 transition-all hover:shadow-lg"
        style={{ borderTopColor: course.color }}
      >
        <div
          className="absolute right-3 top-3 z-10 cursor-pointer"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onToggleFavorite()
          }}
        >
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <Star
              className={`h-5 w-5 transition-colors ${isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
            />
          </motion.div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#3182ce]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none" />

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full text-lg"
                style={{ backgroundColor: `${course.color}20` }}
              >
                {course.icon}
              </div>
              <CardTitle className="text-xl">{course.title}</CardTitle>
            </div>
          </div>
          {course.badge && (
            <div className="mt-1">
              <Badge
                variant="secondary"
                className={`${course.badge === "New" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"}`}
              >
                {course.badge}
              </Badge>
            </div>
          )}
          <CardDescription className="mt-2 line-clamp-2">{course.description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <Badge variant="outline" className="capitalize">
            {course.category}
          </Badge>
        </CardContent>
        <CardFooter>
          <Link href={course.notionLink} target="_blank" className="w-full">
            <Button variant="default" className="w-full gap-2 overflow-hidden">
              <motion.div initial={{ x: -25, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                <File className="h-4 w-4" />
              </motion.div>
              <span>Accéder au cours</span>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
