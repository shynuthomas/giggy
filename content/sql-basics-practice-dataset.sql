CREATE DATABASE IF NOT EXISTS learntechguru_sql;
USE learntechguru_sql;

DROP TABLE IF EXISTS enrollments;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS students;

CREATE TABLE students (
  student_id INT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  city VARCHAR(50),
  marks INT
);

CREATE TABLE courses (
  course_id INT PRIMARY KEY,
  course_name VARCHAR(100) NOT NULL,
  fee DECIMAL(10,2) NOT NULL
);

CREATE TABLE enrollments (
  enrollment_id INT PRIMARY KEY,
  student_id INT,
  course_id INT,
  enrolled_on DATE,
  FOREIGN KEY (student_id) REFERENCES students(student_id),
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

INSERT INTO students (student_id, full_name, city, marks) VALUES
(1, 'Asha Nair', 'Kochi', 78),
(2, 'Rahul Das', 'Bengaluru', 85),
(3, 'Meera Jose', 'Chennai', 91),
(4, 'Nikhil Paul', 'Hyderabad', 74),
(5, 'Anita Roy', 'Pune', 88),
(6, 'Kiran Kumar', 'Kochi', 69),
(7, 'Divya Menon', 'Chennai', 95),
(8, 'Arjun Rao', 'Bengaluru', 82);

INSERT INTO courses (course_id, course_name, fee) VALUES
(101, 'SQL Basics', 99.00),
(102, 'Python Basics', 149.00),
(103, 'Power BI', 199.00),
(104, 'Excel for Data Analysis', 79.00);

INSERT INTO enrollments (enrollment_id, student_id, course_id, enrolled_on) VALUES
(1001, 1, 101, '2026-03-01'),
(1002, 2, 101, '2026-03-02'),
(1003, 2, 102, '2026-03-03'),
(1004, 3, 101, '2026-03-04'),
(1005, 3, 103, '2026-03-05'),
(1006, 5, 101, '2026-03-06'),
(1007, 7, 101, '2026-03-07'),
(1008, 8, 104, '2026-03-08');

-- Practice Query 1: Show all students who enrolled in SQL Basics.
-- Practice Query 2: Show average marks city-wise.
-- Practice Query 3: Show students not enrolled in any course.
-- Practice Query 4: Show top 3 students by marks.
-- Practice Query 5: Count enrollments per course.
