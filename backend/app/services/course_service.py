from sqlalchemy.orm import Session
from app.models.course import Course, Module, Chapter
from app.models.enrollment import Enrollment
from app.schemas.course import CourseCreate, ModuleCreate, ChapterCreate
import uuid


def get_courses(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Course).offset(skip).limit(limit).all()


def get_course(db: Session, course_id: str):
    return db.query(Course).filter(Course.id == course_id).first()


def create_course(db: Session, course_data: CourseCreate, user_id: str):
    course = Course(
        id=str(uuid.uuid4()),
        title=course_data.title,
        description=course_data.description,
        image_url=course_data.image_url,
        created_by=user_id
    )
    db.add(course)
    db.commit()
    db.refresh(course)
    return course


def get_module(db: Session, course_id: str, module_id: str):
    module = db.query(Module).filter(
        Module.id == module_id,
        Module.course_id == course_id
    ).first()
    return module


def enroll_user_in_course(db: Session, user_id: str, course_id: str):
    # Check if already enrolled
    existing = db.query(Enrollment).filter(
        Enrollment.user_id == user_id,
        Enrollment.course_id == course_id
    ).first()
    if existing:
        return existing

    enrollment = Enrollment(
        id=str(uuid.uuid4()),
        user_id=user_id,
        course_id=course_id,
        progress=0
    )
    db.add(enrollment)
    db.commit()
    db.refresh(enrollment)
    return enrollment


def get_user_courses(db: Session, user_id: str):
    return db.query(Enrollment).filter(Enrollment.user_id == user_id).all()

