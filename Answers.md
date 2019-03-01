1. Explain the difference between `RDBMS` and `SQL`.
   Structured Query Language is simply one tool that is used to interact with Relational Database Management Systems. Because it's a standard, it will be supported and have a core set of commands across most RDBMS.

2. Why do tables need a `primary key`?
   Tables need a primary key because that's how we're able to access their rows and create relationships between tables.

3. What is the name given to a table column that references the primary key on another table.
   Foreign Key

4. What do we need in order to have a _many to many_ relationship between two tables.
   You need an "in-between" table that has a foreign key pointed to each of the primary keys of the respective tables in the many-to-many relationship. If I had a table of cohorts and students with a many-to-many relationship, I'd want an in-between table of cohort_students that had a cohort_id key pointed at cohorts.id and a student_id key pointed at students.id.
