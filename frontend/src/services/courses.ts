import api from './api'
import type { Course, Module, Enrollment } from '../types'

export const coursesService = {
  async getCourses(): Promise<Course[]> {
    const response = await api.get<Course[]>('/courses')
    return response.data
  },

  async getCourse(id: string): Promise<Course> {
    const response = await api.get<Course>(`/courses/${id}`)
    return response.data
  },

  async getModule(courseId: string, moduleId: string): Promise<Module> {
    const response = await api.get<Module>(`/courses/${courseId}/modules/${moduleId}`)
    return response.data
  },

  async enrollInCourse(courseId: string): Promise<Enrollment> {
    const response = await api.post<Enrollment>(`/courses/${courseId}/enroll`)
    return response.data
  },

  async getMyCourses(): Promise<Enrollment[]> {
    const response = await api.get<Enrollment[]>('/users/me/courses')
    return response.data
  },
}

