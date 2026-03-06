# 📚 RPS Management System

A **Course Plan (RPS) Management System** built using **Node.js, Express, MySQL, and EJS** to help universities manage course plans, learning outcomes, and lecturer teaching assignments.

This system allows administrators, lecturers, and students to interact with structured **RPS (Rencana Pembelajaran Semester)** data in a centralized platform.

The project demonstrates **backend API design, database modeling, role-based access control, and MVC architecture**.

---

# 🎯 Project Overview

The application digitizes the management of **RPS documents** used in Indonesian universities.

Core capabilities include:

* Course management
* Learning outcomes (CPL / CPMK)
* Lecturer course assignments
* RPS creation and revision
* Student access to course plans
* Printable RPS documents

---

# ⚙️ Tech Stack

Backend:

* **Node.js**
* **Express.js**
* **MySQL**
* **JWT Authentication**

Frontend:

* **HTML**
* **CSS**
* **JavaScript**
* **EJS Templating**

Other Tools:

* REST API
* MVC Architecture
* Express Middleware

---

# 🧠 System Architecture

The application uses a layered **MVC architecture**.

```
Client Browser
      │
      ▼
   Express Routes
      │
      ▼
   Controllers
      │
      ▼
     Models
      │
      ▼
    MySQL Database
```

### Responsibilities

| Layer       | Responsibility              |
| ----------- | --------------------------- |
| Routes      | Define system endpoints     |
| Controllers | Handle application logic    |
| Models      | Database interaction        |
| Middleware  | Security and authentication |
| Views       | UI rendering using EJS      |

---

# 👥 User Roles

The system supports **three main roles**.

### Admin

Responsible for academic management:

* manage courses
* manage lecturers
* monitor RPS completion
* generate reports

---

### Lecturer (Dosen)

Responsible for creating course plans:

* create RPS
* define CPMK
* define learning activities
* add references
* manage assessments

---

### Student (Mahasiswa)

Students can:

* view course plans
* search RPS
* export RPS documents

---

# 📂 Project Structure

```
.
├── config/
│   ├── config.json
│   └── conn.js
│
├── controller/
│   ├── courses.js
│   ├── users.js
│   ├── course_plan.js
│   ├── course_plan_details.js
│   ├── course_plan_assessments.js
│   ├── course_plan_references.js
│   └── course_los.js
│
├── models/
│   ├── users.js
│   ├── courses.js
│   ├── course_plans.js
│   ├── course_plan_details.js
│   ├── course_plan_assessments.js
│   └── curriculum_los.js
│
├── routes/
│   ├── auth.js
│   ├── admin.js
│   ├── dosen.js
│   └── mahasiswa.js
│
├── middleware/
│   └── verifyToken.js
│
├── views/
│   ├── admin/
│   ├── dosen/
│   ├── mahasiswa/
│   └── partials/
│
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── frontend/
├── template/
├── server.js
├── index.js
└── loki.sql
```

---

# 🗄 Database

Database schema provided in:

```
loki.sql
```

Main entities:

| Table                   | Description              |
| ----------------------- | ------------------------ |
| users                   | system users             |
| lecturers               | lecturer data            |
| courses                 | course information       |
| course_plans            | RPS documents            |
| course_plan_details     | learning session details |
| course_plan_assessments | evaluation components    |
| curriculum_los          | learning outcomes        |

---

# 🔐 Authentication & Security

Authentication uses **JWT-based session validation**.

Middleware:

```
middleware/verifyToken.js
```

Responsibilities:

* validate user token
* restrict protected endpoints
* enforce role-based access

---

# 📡 API Example

Authentication

```
POST /auth/login
POST /auth/register
```

Admin

```
GET /admin/courses
GET /admin/coursePlan
GET /admin/reports
```

Lecturer

```
GET /dosen/courses
POST /dosen/add_rps
PUT /dosen/edit_rps
```

Student

```
GET /mahasiswa/courses
GET /mahasiswa/search
```

---

# ▶ Installation

Clone repository

```
git clone https://github.com/yourusername/loki_a2.git
cd loki_a2
```

Install dependencies

```
npm install
```

Configure environment variables

```
.env
```

Example:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=loki
JWT_SECRET=secret_key
```

Import database

```
loki.sql
```

Run application

```
npm start
```

Server will run on:

```
http://localhost:3000
```

---

# 🧪 Engineering Concepts Demonstrated

This project demonstrates several backend engineering concepts:

* RESTful API design
* MVC architecture
* relational database modeling
* role-based access control
* modular route design
* middleware-based authentication

---

# 👥 Contributors

Project developed by **Kelompok 2**

| Name                            | Student ID |
| ------------------------------- | ---------- |
| Nada Safarina                   | 2011521015 |
| Dwisuci Insani Karimah          | 2011522011 |
| Annisa Ulfa                     | 2011522015 |
| Muhammad Rayhan Rizaldi         | 2011522021 |
| Boby Darmawan                   | 2011522023 |
| Raidan Malik Sandra (Reltroner) | 2011523007 |

---

# 📌 Project Purpose

This project was developed as part of an academic assignment to design a **web-based RPS management platform**.

It also serves as a **learning project demonstrating full-stack web development with Node.js and MySQL**.

---

# 📜 License

Open source for educational and development purposes.
