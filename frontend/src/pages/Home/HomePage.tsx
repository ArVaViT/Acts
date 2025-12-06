import { useEffect, useState } from 'react'
import { coursesService } from '@/services/courses'
import type { Course } from '@/types'
import CourseCard from '@/components/course/CourseCard'

export default function HomePage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await coursesService.getCourses()
        setCourses(data)
      } catch (error) {
        console.error('Ошибка загрузки курсов:', error)
      } finally {
        setLoading(false)
      }
    }
    loadCourses()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Загрузка курсов...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Доступные курсы</h1>
        <p className="text-muted-foreground">
          Выберите курс для изучения
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            Курсы пока не добавлены
          </div>
        ) : (
          courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        )}
      </div>
    </div>
  )
}

