import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Course } from '@/types'

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow">
      {course.image_url && (
        <div className="w-full h-48 overflow-hidden rounded-t-lg">
          <img
            src={course.image_url}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
        {course.description && (
          <CardDescription className="line-clamp-2">
            {course.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex-grow">
        <Link to={`/courses/${course.id}`}>
          <Button className="w-full">Открыть курс</Button>
        </Link>
      </CardContent>
    </Card>
  )
}

