from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional


class ChapterBase(BaseModel):
    title: str
    content: str | None = None
    order_index: int = 0


class ChapterCreate(ChapterBase):
    pass


class ChapterResponse(ChapterBase):
    id: str
    module_id: str

    class Config:
        from_attributes = True


class ModuleBase(BaseModel):
    title: str
    description: str | None = None
    order_index: int = 0


class ModuleCreate(ModuleBase):
    pass


class ModuleResponse(ModuleBase):
    id: str
    course_id: str
    chapters: List[ChapterResponse] = []

    class Config:
        from_attributes = True


class CourseBase(BaseModel):
    title: str
    description: str | None = None
    image_url: str | None = None


class CourseCreate(CourseBase):
    pass


class CourseResponse(CourseBase):
    id: str
    created_by: str
    created_at: datetime
    updated_at: datetime | None
    modules: List[ModuleResponse] = []

    class Config:
        from_attributes = True


class EnrollmentResponse(BaseModel):
    id: str
    user_id: str
    course_id: str
    enrolled_at: datetime
    progress: int
    course: CourseResponse | None = None

    class Config:
        from_attributes = True

