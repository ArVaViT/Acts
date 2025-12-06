import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { coursesService } from '@/services/courses'
import type { Module } from '@/types'
import { ArrowLeft, Book } from 'lucide-react'

export default function ModuleView() {
  const { courseId, moduleId } = useParams<{ courseId: string; moduleId: string }>()
  const [module, setModule] = useState<Module | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadModule = async () => {
      if (!courseId || !moduleId) return
      try {
        const data = await coursesService.getModule(courseId, moduleId)
        setModule(data)
      } catch (error) {
        console.error('Ошибка загрузки модуля:', error)
      } finally {
        setLoading(false)
      }
    }
    loadModule()
  }, [courseId, moduleId])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Загрузка модуля...</div>
      </div>
    )
  }

  if (!module) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Модуль не найден</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to={`/courses/${courseId}`}>
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад к курсу
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{module.title}</h1>
        {module.description && (
          <p className="text-lg text-muted-foreground">{module.description}</p>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Book className="h-6 w-6" />
          Главы модуля
        </h2>
        {module.chapters && module.chapters.length > 0 ? (
          <div className="space-y-4">
            {module.chapters
              .sort((a, b) => a.order_index - b.order_index)
              .map((chapter) => (
                <Card key={chapter.id}>
                  <CardHeader>
                    <CardTitle>{chapter.title}</CardTitle>
                  </CardHeader>
                  {chapter.content && (
                    <CardContent>
                      <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: chapter.content }}
                      />
                    </CardContent>
                  )}
                </Card>
              ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Главы пока не добавлены</p>
        )}
      </div>
    </div>
  )
}

