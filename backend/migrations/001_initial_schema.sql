-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    hashed_password VARCHAR NOT NULL,
    full_name VARCHAR,
    role VARCHAR NOT NULL DEFAULT 'student',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
    id VARCHAR PRIMARY KEY,
    title VARCHAR NOT NULL,
    description VARCHAR,
    image_url VARCHAR,
    created_by VARCHAR NOT NULL REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_courses_created_by ON courses(created_by);

-- Create modules table
CREATE TABLE IF NOT EXISTS modules (
    id VARCHAR PRIMARY KEY,
    course_id VARCHAR NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR NOT NULL,
    description VARCHAR,
    order_index INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_modules_course_id ON modules(course_id);

-- Create chapters table
CREATE TABLE IF NOT EXISTS chapters (
    id VARCHAR PRIMARY KEY,
    module_id VARCHAR NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
    title VARCHAR NOT NULL,
    content TEXT,
    order_index INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_chapters_module_id ON chapters(module_id);

-- Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
    id VARCHAR PRIMARY KEY,
    user_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id VARCHAR NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    progress INTEGER NOT NULL DEFAULT 0,
    UNIQUE(user_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON enrollments(course_id);

-- Create files table
CREATE TABLE IF NOT EXISTS files (
    id VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    url VARCHAR NOT NULL,
    file_type VARCHAR NOT NULL,
    course_id VARCHAR REFERENCES courses(id) ON DELETE SET NULL,
    user_id VARCHAR REFERENCES users(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_files_course_id ON files(course_id);
CREATE INDEX IF NOT EXISTS idx_files_user_id ON files(user_id);

