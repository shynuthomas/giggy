# SQL Basics for Freshers - Complete Course Asset Pack

Use this file as a copy-paste source for your Graphy course.

---

## Course Overview

- **Course Title:** SQL Basics for Freshers
- **Price:** 99
- **Level:** Beginner
- **Target Audience:** Freshers, students, non-CS beginners, job seekers
- **Primary Outcome:** Students can solve core SQL interview and work tasks confidently.

### Course Description (Long)

Learn SQL from zero with practical examples and interview-focused practice. This course teaches you how to query data, filter and sort records, aggregate results, combine tables with joins, modify data safely, and solve real-world problems using SQL. By the end, you will complete a mini project and mock tests designed for fresher placements.

### CTA

**Start Learning SQL Today - Enroll for 99**

---

## Module 1 - Introduction to Databases and SQL

### Video 1 Script (8-10 min)

Hello everyone, welcome to SQL Basics for Freshers. In this lesson, we will understand what databases are and why SQL is one of the most important skills for careers in software, analytics, and data.

Think of a database as a digital locker that stores information in an organized way. In relational databases, data is stored in tables. A table has rows and columns. For example, in a Students table, each row represents one student, and columns represent name, email, and score.

Now what is SQL? SQL stands for Structured Query Language. It is used to communicate with relational databases to read data, filter data, update values, and create reports.

Why should freshers learn SQL?

1. SQL is asked in interviews for many roles.
2. SQL is used in real jobs every day.
3. SQL is easier to start compared to many programming topics.

In this course, we will move from basic SELECT queries to joins and interview practice. Do not worry if you are new. We will learn step by step with examples.

### Key Notes

- DBMS vs RDBMS
- Table, row, column, primary key
- SQL is declarative: you tell what you want, not how to do it

---

## Module 2 - SQL Setup and First Query

### Video 2 Script (10-12 min)

In this lesson, we set up SQL and run our first query.

You can use MySQL, PostgreSQL, or SQLite for practice. Once installed, create a database named `learntechguru_sql`.

Now create a sample table:

```sql
CREATE TABLE students (
  student_id INT PRIMARY KEY,
  full_name VARCHAR(100),
  city VARCHAR(50),
  marks INT
);
```

Insert a few rows:

```sql
INSERT INTO students (student_id, full_name, city, marks) VALUES
(1, 'Asha Nair', 'Kochi', 78),
(2, 'Rahul Das', 'Bengaluru', 85),
(3, 'Meera Jose', 'Chennai', 91);
```

Run your first query:

```sql
SELECT * FROM students;
```

This command reads all rows and all columns from the students table.

### Key Notes

- `CREATE TABLE` for schema creation
- `INSERT INTO` for adding records
- `SELECT *` for full table read

---

## Module 3 - Data Retrieval Basics

### Video 3 Script (12-15 min)

Now we learn core query clauses: SELECT, WHERE, ORDER BY, LIMIT.

Get specific columns:

```sql
SELECT full_name, marks FROM students;
```

Filter rows:

```sql
SELECT * FROM students WHERE marks >= 80;
```

Multiple conditions:

```sql
SELECT * FROM students
WHERE city = 'Chennai' OR city = 'Kochi';
```

Sort results:

```sql
SELECT * FROM students ORDER BY marks DESC;
```

Show top 2:

```sql
SELECT * FROM students ORDER BY marks DESC LIMIT 2;
```

### Key Notes

- `WHERE` filters rows
- `ORDER BY` sorts output
- `LIMIT` controls number of rows shown

---

## Module 4 - SQL Functions and Advanced Filtering

### Video 4 Script (12-15 min)

In real projects, we use SQL functions for text, math, and date operations.

Examples:

```sql
SELECT UPPER(full_name) AS name_upper FROM students;
SELECT LENGTH(full_name) AS name_length FROM students;
SELECT marks, marks + 5 AS updated_marks FROM students;
```

Pattern matching with LIKE:

```sql
SELECT * FROM students WHERE full_name LIKE 'R%';
```

Range and set filters:

```sql
SELECT * FROM students WHERE marks BETWEEN 70 AND 90;
SELECT * FROM students WHERE city IN ('Kochi', 'Chennai');
```

Null checks:

```sql
SELECT * FROM students WHERE city IS NULL;
```

### Key Notes

- `LIKE` for pattern search
- `IN` for multiple exact values
- `BETWEEN` for ranges
- `IS NULL` for missing values

---

## Module 5 - Aggregation and Grouping

### Video 5 Script (12-15 min)

Aggregations summarize data.

```sql
SELECT COUNT(*) AS total_students FROM students;
SELECT AVG(marks) AS avg_marks FROM students;
SELECT MIN(marks) AS min_marks, MAX(marks) AS max_marks FROM students;
```

Group by city:

```sql
SELECT city, COUNT(*) AS student_count, AVG(marks) AS avg_marks
FROM students
GROUP BY city;
```

Filter groups using HAVING:

```sql
SELECT city, AVG(marks) AS avg_marks
FROM students
GROUP BY city
HAVING AVG(marks) > 80;
```

### Key Notes

- `GROUP BY` creates buckets
- `HAVING` filters aggregated results
- `WHERE` filters before grouping

---

## Module 6 - Joins (Most Important for Interviews)

### Video 6 Script (15-18 min)

Joins combine data from multiple tables.

Create second table:

```sql
CREATE TABLE courses (
  course_id INT PRIMARY KEY,
  course_name VARCHAR(100),
  student_id INT
);
```

Insert data:

```sql
INSERT INTO courses (course_id, course_name, student_id) VALUES
(101, 'SQL Basics', 1),
(102, 'Python Basics', 2),
(103, 'Power BI', 2),
(104, 'Excel', 4);
```

INNER JOIN:

```sql
SELECT s.full_name, c.course_name
FROM students s
INNER JOIN courses c ON s.student_id = c.student_id;
```

LEFT JOIN:

```sql
SELECT s.full_name, c.course_name
FROM students s
LEFT JOIN courses c ON s.student_id = c.student_id;
```

RIGHT JOIN (if supported):

```sql
SELECT s.full_name, c.course_name
FROM students s
RIGHT JOIN courses c ON s.student_id = c.student_id;
```

### Key Notes

- `INNER JOIN` gives matched rows only
- `LEFT JOIN` keeps all rows from left table
- Learn joins with table aliases (`s`, `c`)

---

## Module 7 - Data Modification (INSERT, UPDATE, DELETE)

### Video 7 Script (12-15 min)

Now we learn to change data safely.

Insert one row:

```sql
INSERT INTO students (student_id, full_name, city, marks)
VALUES (4, 'Nikhil Paul', 'Hyderabad', 74);
```

Update marks:

```sql
UPDATE students
SET marks = 80
WHERE student_id = 4;
```

Delete one row:

```sql
DELETE FROM students
WHERE student_id = 4;
```

Important warning: always use WHERE in UPDATE/DELETE unless you intentionally want all rows affected.

### Key Notes

- DML commands: INSERT, UPDATE, DELETE
- Test with SELECT before and after modification
- Use transactions in production systems

---

## Module 8 - Interview Prep and Mini Project

### Video 8 Script (12-15 min)

This final module focuses on interview confidence and practical problem solving.

Mini project goal: build SQL reports for an online learning portal.

Tables:

- students
- courses
- enrollments

Tasks:

1. Find top 5 students by average score.
2. Find most purchased courses.
3. Find cities with highest enrollment count.
4. Find students who never enrolled in any course.

Interview tip: Explain your logic clearly. Even if query is not perfect, structured thinking matters.

### Completion Criteria

- All module quizzes attempted
- Mock Test 1 and Mock Test 2 completed
- Final assessment score >= 60%

---

## Mock Test 1 (20 Questions)

### MCQs

1. SQL stands for:  
   A) Structured Query Language  
   B) Sequential Query Logic  
   C) Simple Query Language  
   D) Structured Question List

2. Which command reads data?  
   A) UPDATE  
   B) SELECT  
   C) DELETE  
   D) INSERT

3. Which clause is used for filtering rows?  
   A) GROUP BY  
   B) ORDER BY  
   C) WHERE  
   D) HAVING

4. Which keyword removes duplicate rows in result?  
   A) UNIQUE  
   B) DISTINCT  
   C) DIFF  
   D) SINGLE

5. Which command adds a new row?  
   A) APPEND  
   B) INSERT INTO  
   C) ADD ROW  
   D) CREATE ROW

6. Which clause sorts data?  
   A) ORDER BY  
   B) SORT BY  
   C) ALIGN BY  
   D) RANK BY

7. Which operator checks range?  
   A) IN  
   B) EXISTS  
   C) BETWEEN  
   D) LIKE

8. Which query gets top 5 rows?  
   A) TOP 5 (all DBs)  
   B) LIMIT 5  
   C) ROW 5  
   D) FIRST 5

9. COUNT(*) returns:  
   A) Sum of values  
   B) Average values  
   C) Number of rows  
   D) Number of columns

10. Which function gives average?  
    A) MID()  
    B) AVG()  
    C) AVERAGE()  
    D) MEAN()

11. INNER JOIN returns:  
    A) All left rows  
    B) All right rows  
    C) Only matched rows  
    D) Unmatched rows only

12. LEFT JOIN returns:  
    A) Matched only  
    B) All rows from left + matched right  
    C) All rows from right only  
    D) Random rows

13. HAVING is used with:  
    A) ORDER BY  
    B) GROUP BY  
    C) LIMIT  
    D) INSERT

14. Which keyword checks missing values?  
    A) IS EMPTY  
    B) IS NULL  
    C) = NULL  
    D) NULL()

15. UPDATE without WHERE:  
    A) Updates one row  
    B) Throws syntax error  
    C) Updates all rows  
    D) Deletes rows

16. DELETE removes:  
    A) Table structure  
    B) Rows  
    C) Database  
    D) Column type

17. SQL clause execution order generally starts with:  
    A) SELECT  
    B) FROM  
    C) ORDER BY  
    D) LIMIT

18. Which is valid wildcard query?  
    A) WHERE name LIKE 'A%'  
    B) WHERE name IN 'A%'  
    C) WHERE name IS 'A%'  
    D) WHERE name HAS 'A%'

19. GROUP BY is used to:  
    A) Filter rows  
    B) Combine grouped rows for aggregate output  
    C) Sort rows  
    D) Delete duplicates

20. Primary key should be:  
    A) Nullable  
    B) Duplicate  
    C) Unique and not null  
    D) Text only

### Answer Key - Mock Test 1

1-A, 2-B, 3-C, 4-B, 5-B, 6-A, 7-C, 8-B, 9-C, 10-B, 11-C, 12-B, 13-B, 14-B, 15-C, 16-B, 17-B, 18-A, 19-B, 20-C

---

## Mock Test 2 (20 Questions)

### MCQs

1. Which command creates a table?  
   A) MAKE TABLE  
   B) CREATE TABLE  
   C) BUILD TABLE  
   D) NEW TABLE

2. Which SQL keyword renames a column output?  
   A) RENAME  
   B) AS  
   C) TO  
   D) LABEL

3. Which query is correct for descending order by marks?  
   A) ORDER marks DESC  
   B) ORDER BY marks DESC  
   C) SORT BY marks DESC  
   D) marks ORDER DESC

4. Which operator finds partial text?  
   A) BETWEEN  
   B) LIKE  
   C) IN  
   D) ALL

5. Which clause limits returned rows?  
   A) FETCH  
   B) LIMIT  
   C) STOP  
   D) TAKE

6. MAX(marks) returns:  
   A) Minimum mark  
   B) Largest mark  
   C) Mean mark  
   D) Last mark

7. Which function counts non-null values in a column?  
   A) COUNT(column_name)  
   B) SUM(column_name)  
   C) SIZE(column_name)  
   D) TOTAL(column_name)

8. Which join keeps all rows from first table?  
   A) INNER JOIN  
   B) LEFT JOIN  
   C) CROSS JOIN  
   D) SELF JOIN

9. Which command changes existing row values?  
   A) MODIFY  
   B) CHANGE  
   C) UPDATE  
   D) REPLACE ROW

10. Which statement is true about WHERE and HAVING?  
    A) Both are same  
    B) WHERE filters grouped results only  
    C) HAVING filters aggregated groups  
    D) HAVING works only without GROUP BY

11. Which one is DML?  
    A) CREATE  
    B) ALTER  
    C) INSERT  
    D) DROP

12. Which statement removes table data but keeps table?  
    A) DROP TABLE  
    B) DELETE FROM table_name  
    C) REMOVE TABLE  
    D) CLEAR SCHEMA

13. Which keyword combines conditions?  
    A) JOIN  
    B) MERGE  
    C) AND  
    D) BY

14. Which query checks city is either Kochi or Pune?  
    A) city = 'Kochi' AND 'Pune'  
    B) city IN ('Kochi', 'Pune')  
    C) city BETWEEN 'Kochi','Pune'  
    D) city LIKE ('Kochi','Pune')

15. Which command permanently removes table structure?  
    A) DELETE  
    B) TRUNCATE  
    C) DROP TABLE  
    D) UPDATE

16. Which is best for interview SQL prep?  
    A) Memorize only syntax  
    B) Practice with sample datasets  
    C) Skip joins  
    D) Avoid aggregate functions

17. SQL is mainly:  
    A) Object-oriented language  
    B) Query language for relational data  
    C) Frontend UI language  
    D) Operating system

18. Which query returns unique cities?  
    A) SELECT city FROM students;  
    B) SELECT UNIQUE city FROM students;  
    C) SELECT DISTINCT city FROM students;  
    D) SELECT city UNIQUE students;

19. Which clause appears last in typical query writing?  
    A) FROM  
    B) WHERE  
    C) ORDER BY  
    D) GROUP BY

20. What should freshers focus on first?  
    A) Stored procedures only  
    B) SELECT, WHERE, JOIN, GROUP BY  
    C) Triggers only  
    D) Admin tuning only

### Answer Key - Mock Test 2

1-B, 2-B, 3-B, 4-B, 5-B, 6-B, 7-A, 8-B, 9-C, 10-C, 11-C, 12-B, 13-C, 14-B, 15-C, 16-B, 17-B, 18-C, 19-C, 20-B

---

## Final Assessment (15 Questions)

### Part A - MCQ (10 questions)

1. Difference between WHERE and HAVING?  
2. Which join for all rows from left table?  
3. Best clause for sorting marks descending?  
4. Function to get total rows?  
5. Clause to filter text pattern?  
6. Command to modify records?  
7. Clause used with aggregate grouping?  
8. Query to get distinct city values?  
9. Command to insert data?  
10. What makes primary key valid?

### Part B - Query Writing (5 questions)

Assume table `students(student_id, full_name, city, marks)`:

1. Show all students with marks > 75.  
2. Show top 3 students by marks.  
3. Find average marks by city.  
4. Find students whose name starts with 'A'.  
5. Increase marks by 2 for student_id = 2.

### Final Assessment Suggested Key

MCQ high-level answers:

1. WHERE filters rows before grouping; HAVING filters grouped output.
2. LEFT JOIN
3. ORDER BY marks DESC
4. COUNT(*)
5. LIKE
6. UPDATE
7. GROUP BY
8. SELECT DISTINCT city FROM students;
9. INSERT INTO
10. Unique and NOT NULL

Part B sample queries:

```sql
SELECT * FROM students WHERE marks > 75;

SELECT * FROM students ORDER BY marks DESC LIMIT 3;

SELECT city, AVG(marks) AS avg_marks
FROM students
GROUP BY city;

SELECT * FROM students WHERE full_name LIKE 'A%';

UPDATE students SET marks = marks + 2 WHERE student_id = 2;
```

---

## Practice Worksheet (Downloadable)

### Section 1 - Basic Queries

1. Select all columns from students.
2. Select only full_name and city.
3. Show students from Kochi.
4. Show students with marks between 60 and 90.
5. Show students sorted by name ascending.

### Section 2 - Intermediate Queries

6. Count total students.
7. Find max and min marks.
8. Show average marks city-wise.
9. Show cities having average marks > 75.
10. Show names ending with "a".

### Section 3 - Join Queries

11. Show student name and enrolled course.
12. Show all students even if no course assigned.
13. Show all courses even if student record is missing.

### Section 4 - Data Modification

14. Insert one new student row.
15. Update city for one student.
16. Delete one student row by id.

### Worksheet Answer Hints

Use:

- `SELECT`, `WHERE`, `ORDER BY`, `LIMIT`
- `COUNT`, `AVG`, `MIN`, `MAX`
- `GROUP BY`, `HAVING`
- `INNER JOIN`, `LEFT JOIN`
- `INSERT`, `UPDATE`, `DELETE`

---

## Thumbnail Text Ideas

1. SQL Basics for Freshers - Job Ready in 4 Weeks
2. Learn SQL from Zero - Practice + Mock Tests Included
3. Crack SQL Interviews - Beginner Friendly Course

## SEO Meta Suggestions

- **Meta Title:** SQL Basics for Freshers | LearnTechGuru
- **Meta Description:** Learn SQL from scratch with practical lessons, joins, mock tests, and interview-focused training. Beginner friendly course at just 99.
- **Keywords:** sql basics, sql for freshers, sql interview questions, learn sql online, beginner sql course
