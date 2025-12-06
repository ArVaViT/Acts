from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.api.dependencies import get_current_user
from app.models.user import User
from app.schemas.course import CourseResponse, ModuleResponse, EnrollmentResponse
from app.services.course_service import (
    get_courses,
    get_course,
    get_module,
    enroll_user_in_course,
    get_user_courses
)

router = APIRouter(prefix="/courses", tags=["courses"])


@router.get("", response_model=List[CourseResponse])
async def list_courses(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    courses = get_courses(db, skip=skip, limit=limit)
    return courses


@router.get("/{course_id}", response_model=CourseResponse)
async def get_course_detail(
    course_id: str,
    db: Session = Depends(get_db)
):
    course = get_course(db, course_id)
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    return course


@router.get("/{course_id}/modules/{module_id}", response_model=ModuleResponse)
async def get_module_detail(
    course_id: str,
    module_id: str,
    db: Session = Depends(get_db)
):
    module = get_module(db, course_id, module_id)
    if not module:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Module not found"
        )
    return module


@router.post("/{course_id}/enroll", response_model=EnrollmentResponse)
async def enroll_course(
    course_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    course = get_course(db, course_id)
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    enrollment = enroll_user_in_course(db, current_user.id, course_id)
    return enrollment

