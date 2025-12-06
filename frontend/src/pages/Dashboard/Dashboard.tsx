import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { coursesService } from '@/services/courses'
import type { User, Enrollment } from '@/types'
import { BookOpen, User as UserIcon } from 'lucide-react'

interface DashboardProps {
  user: User | null
}

export default function Dashboard({ user }: DashboardProps) {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMyCourses = async () => {
      try {
        const data = await coursesService.getMyCourses()
        setEnrollments(data)
      } catch (error) {
        console.error('Ошибка загрузки курсов:', error)
      } finally {
        setLoading(false)
      }
    }
    loadMyCourses()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Кабинет пользователя</h1>
        <p className="text-muted-foreground">
          Управление профилем и курсами
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              <CardTitle>Профиль</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Имя</p>
              <p className="font-medium">{user?.full_name || 'Не указано'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Роль</p>
              <p className="font-medium capitalize">{user?.role}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              <CardTitle>Мои курсы</CardTitle>
            </div>
            <CardDescription>
              Курсы, на которые вы записаны
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Загрузка...</div>
            ) : enrollments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Вы еще не записаны ни на один курс
                <Link to="/">
                  <Button className="mt-4">Посмотреть курсы</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {enrollments.map((enrollment) => (
                  <div
                    key={enrollment.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h3 className="font-semibold">
                        {enrollment.course?.title || 'Курс'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Прогресс: {enrollment.progress}%
                      </p>
                    </div>
                    {enrollment.course && (
                      <Link to={`/courses/${enrollment.course.id}`}>
                        <Button variant="outline">Продолжить</Button>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

