"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { File, GraduationCap, Star } from "lucide-react"
import confetti from "canvas-confetti"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
    description: "Cours de management stratégique",
    category: "management",
    notionLink: "https://www.notion.so/Cours-r-sum-1b72e3d9501c80918ff1c25c26c646a9",
    color: "#3182ce",
    icon: "📊",
  },
  {
    id: "methodologie-recherche",
    title: "Méthodologie de recherche",
    description: "Cours de méthodologie de recherche",
    category: "research",
    notionLink: "https://curse-beast-a8d.notion.site/Cours-1e82e3d9501c80d59116e277190e1a1f?pvs=4",
    color: "#805ad5",
    icon: "🔍",
  },
  {
    id: "gestion-budgetaire",
    title: "Gestion budgétaire et prévisionnelle",
    description: "Cours de gestion budgétaire et prévisionnelle",
    category: "finance",
    notionLink: "https://curse-beast-a8d.notion.site/Cours-GBP-1ba2e3d9501c80079827f6eee15037ca?pvs=73",
    color: "#38a169",
    icon: "💰",
  },
  {
    id: "strategie-financiere",
    title: "Stratégie financière",
    description: "Cours de stratégie financière",
    category: "finance",
    notionLink: "https://curse-beast-a8d.notion.site/Cours-1a12e3d9501c80b1b2a7fde357872aab?pvs=4",
    badge: "Popular",
    color: "#38a169",
    icon: "📈",
  },
  {
    id: "audit-comptable",
    title: "Audit comptable et financier",
    description: "Cours d'audit comptable et financier",
    category: "finance",
    notionLink: "https://curse-beast-a8d.notion.site/Cours-2-1d12e3d9501c80408fd5fc9c056643cb?pvs=4",
    color: "#38a169",
    icon: "🧮",
  },
  {
    id: "anglais-affaires",
    title: "Anglais des affaires",
    description: "Cours d'anglais des affaires",
    category: "languages",
    notionLink: "https://curse-beast-a8d.notion.site/Anglais-des-affaires-1912e3d9501c80b18271fc37589e7840?pvs=4",
    color: "#d53f8c",
    icon: "🇬🇧",
  },
  {
    id: "espagnole-affaires",
    title: "Espagnole des affaires",
    description: "Cours d'espagnole des affaires",
    category: "languages",
    notionLink: "https://curse-beast-a8d.notion.site/Cours-1e92e3d9501c805d8364e8cef2ac35c8?pvs=4",
    color: "#d53f8c",
    icon: "🇪🇸",
  },
  {
    id: "management-projet",
    title: "Management de projet",
    description: "Cours de management de projet",
    category: "management",
    notionLink: "https://curse-beast-a8d.notion.site/Cours-1e92e3d9501c8033b7ebf39ed1515958?pvs=4",
    badge: "New",
    color: "#3182ce",
    icon: "📋",
  },
  {
    id: "entrepreneuriat",
    title: "Entrepreneuriat",
    description: "Cours d'entrepreneuriat",
    category: "business",
    notionLink: "https://notion.so/entrepreneuriat",
    color: "#dd6b20",
    icon: "🚀",
  },
  {
    id: "methodologie-communication",
    title: "Méthodologie de communication",
    description: "Cours de méthodologie de communication",
    category: "communication",
    notionLink: "https://notion.so/methodologie-communication",
    color: "#e53e3e",
    icon: "🗣️",
  },
]

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [favorites, setFavorites] = useState<string[]>([])
  const [filteredCourses, setFilteredCourses] = useState(courses)

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

    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter((course) => course.category === activeCategory)
    }

    setFilteredCourses(result)
  }, [activeCategory])

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

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />

      <div className="container relative z-10 mx-auto py-6 md:py-10">
        <motion.header
          className="mb-12 flex flex-col items-center space-y-6 text-center"
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
        </motion.header>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex flex-wrap justify-center gap-3">
            <motion.button
              onClick={() => setActiveCategory("all")}
              className={`relative flex items-center rounded-full px-6 py-3 text-sm font-medium transition-all ${
                activeCategory === "all" ? "bg-primary text-primary-foreground shadow-lg" : "bg-muted hover:bg-muted/80"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Tous les cours
            </motion.button>

            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative flex items-center rounded-full px-6 py-3 text-sm font-medium capitalize transition-all ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-muted hover:bg-muted/80"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}

            {favorites.length > 0 && (
              <motion.button
                onClick={() => setActiveCategory("favorites")}
                className={`relative flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all ${
                  activeCategory === "favorites"
                    ? "bg-yellow-500 text-white shadow-lg"
                    : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:hover:bg-yellow-900/50"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Star className="h-4 w-4" />
                Favoris
              </motion.button>
            )}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
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
                  <File className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">Aucun cours trouvé</h3>
                <p className="mt-2 text-sm text-muted-foreground">Aucun cours disponible dans cette catégorie</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setActiveCategory("all")
                  }}
                  className="mt-4"
                >
                  Voir tous les cours
                </Button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
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
