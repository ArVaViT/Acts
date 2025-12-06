import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { coursesService } from '@/services/courses'
import { authService } from '@/services/auth'
import type { Course, Module } from '@/types'
import { BookOpen, Play } from 'lucide-react'

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)

  useEffect(() => {
    const loadCourse = async () => {
      if (!id) return
      try {
        const data = await coursesService.getCourse(id)
        setCourse(data)
      } catch (error) {
        console.error('Ошибка загрузки курса:', error)
      } finally {
        setLoading(false)
      }
    }
    loadCourse()
  }, [id])

  const handleEnroll = async () => {
    if (!id || !authService.isAuthenticated()) return
    setEnrolling(true)
    try {
      await coursesService.enrollInCourse(id)
      // Перезагрузить курс для обновления статуса
      const data = await coursesService.getCourse(id)
      setCourse(data)
    } catch (error) {
      console.error('Ошибка записи на курс:', error)
    } finally {
      setEnrolling(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Загрузка курса...</div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Курс не найден</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        {course.image_url && (
          <div className="w-full h-64 mb-6 overflow-hidden rounded-lg">
            <img
              src={course.image_url}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
        {course.description && (
          <p className="text-lg text-muted-foreground mb-4">{course.description}</p>
        )}
        {authService.isAuthenticated() && (
          <Button onClick={handleEnroll} disabled={enrolling}>
            {enrolling ? 'Запись...' : 'Записаться на курс'}
          </Button>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          Модули курса
        </h2>
        {course.modules && course.modules.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.modules
              .sort((a, b) => a.order_index - b.order_index)
              .map((module) => (
                <Card key={module.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Play className="h-5 w-5" />
                      {module.title}
                    </CardTitle>
                    {module.description && (
                      <CardDescription>{module.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <Link to={`/courses/${id}/modules/${module.id}`}>
                      <Button variant="outline" className="w-full">
                        Открыть модуль
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Модули пока не добавлены</p>
        )}
      </div>
    </div>
  )
}

