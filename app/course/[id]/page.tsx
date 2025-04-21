import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, File, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface CoursePageProps {
  params: {
    id: string
  }
}

export function generateMetadata({ params }: CoursePageProps): Metadata {
  // In a real app, you would fetch the course data based on the ID
  return {
    title: `Course: ${params.id} | Learning Platform`,
  }
}

export default function CoursePage({ params }: CoursePageProps) {
  // In a real app, you would fetch the course data based on the ID
  const courseId = params.id

  return (
    <div className="container mx-auto py-6 md:py-10">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Retour aux cours
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{courseId}</h1>
            <p className="mt-2 text-muted-foreground">Description détaillée du cours sera affichée ici.</p>
          </div>

          <Separator />

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">À propos de ce cours</h2>
            <p>
              Contenu détaillé du cours. Cette section contiendrait une description complète du cours, des objectifs
              d'apprentissage, et d'autres informations pertinentes.
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Programme du cours</h2>
            <div className="space-y-2">
              <div className="rounded-md border p-4">
                <h3 className="font-medium">Module 1: Introduction</h3>
                <p className="text-sm text-muted-foreground">
                  Aperçu des concepts fondamentaux et introduction au sujet.
                </p>
              </div>
              <div className="rounded-md border p-4">
                <h3 className="font-medium">Module 2: Concepts avancés</h3>
                <p className="text-sm text-muted-foreground">
                  Exploration des concepts avancés et applications pratiques.
                </p>
              </div>
              <div className="rounded-md border p-4">
                <h3 className="font-medium">Module 3: Études de cas</h3>
                <p className="text-sm text-muted-foreground">
                  Analyse d'études de cas réels et applications dans l'industrie.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations du cours</CardTitle>
              <CardDescription>Détails et ressources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>10 heures de contenu</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Mis à jour le 15 avril 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>45 étudiants inscrits</span>
              </div>
              <Separator />
              <Link href={`https://notion.so/${courseId}`} target="_blank" className="w-full">
                <Button className="w-full gap-2">
                  <File className="h-4 w-4" />
                  Ouvrir dans Notion
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cours associés</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/course/related-course-1" className="block">
                <div className="rounded-md p-2 hover:bg-muted">
                  <div className="font-medium">Cours associé 1</div>
                  <div className="text-sm text-muted-foreground">Description brève</div>
                </div>
              </Link>
              <Link href="/course/related-course-2" className="block">
                <div className="rounded-md p-2 hover:bg-muted">
                  <div className="font-medium">Cours associé 2</div>
                  <div className="text-sm text-muted-foreground">Description brève</div>
                </div>
              </Link>
              <Link href="/course/related-course-3" className="block">
                <div className="rounded-md p-2 hover:bg-muted">
                  <div className="font-medium">Cours associé 3</div>
                  <div className="text-sm text-muted-foreground">Description brève</div>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
