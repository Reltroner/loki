# RPS Management System

### Academic Course Plan (RPS) Platform

A role-based **RPS (Rencana Pembelajaran Semester) management platform** built with **Node.js, Express, MySQL, and EJS**, designed to digitize the creation, management, and distribution of course plans in higher education institutions.

The system provides structured management of:

* course plans (RPS)
* curriculum learning outcomes (CPL)
* course learning outcomes (CPMK)
* lecturer assignments
* academic assessments
* student course access

This project demonstrates **backend system architecture, relational data modeling, authentication systems, and role-based application design**.

---

# System Overview

Universities often manage RPS documents manually using spreadsheets or PDFs.
This system transforms the workflow into a **centralized web platform** that enables structured academic management.

Key capabilities:

* centralized course plan management
* learning outcome mapping (CPL → CPMK)
* lecturer RPS authoring tools
* academic reporting
* student RPS discovery
* printable academic documents

---

# Tech Stack

Backend

* Node.js
* Express.js
* MySQL
* JWT Authentication

Frontend

* HTML
* CSS
* JavaScript
* EJS Template Engine

Infrastructure Concepts

* MVC architecture
* REST API
* middleware-based security
* relational database modeling

---

# High Level Architecture

```
Browser / Client
        │
        ▼
   Express Router Layer
        │
        ▼
    Controller Layer
        │
        ▼
      Model Layer
        │
        ▼
   MySQL Relational Database
```

### Architectural Principles

The system follows several core backend principles:

1. **Separation of Concerns**

Routes, controllers, models, and views are isolated into independent layers.

2. **Controller-driven logic**

Business logic is centralized in controllers rather than routes.

3. **Relational data modeling**

Course plans and learning outcomes are stored using normalized database structures.

4. **Middleware security**

Authentication and authorization are enforced before protected endpoints are accessed.

---

# Role-Based Access Model

The application defines three primary actors.

## Admin

Responsibilities:

* manage courses
* manage lecturers
* monitor RPS progress
* generate reports
* manage curriculum outcomes

## Lecturer (Dosen)

Responsibilities:

* create and edit RPS
* define CPMK
* design assessment structures
* manage references
* update course learning plans

## Student (Mahasiswa)

Capabilities:

* view available courses
* search RPS documents
* download printable RPS

---

# Data Model

Core domain entities:

| Entity              | Description            |
| ------------------- | ---------------------- |
| Users               | system accounts        |
| Lecturers           | academic staff         |
| Courses             | academic subjects      |
| Course Plans        | RPS documents          |
| Course Plan Details | meeting-level planning |
| Assessments         | grading components     |
| Curriculum Outcomes | CPL mapping            |
| Course Outcomes     | CPMK definitions       |

Relationship example:

```
Curriculum
   │
   ▼
CPL (Learning Outcomes)
   │
   ▼
CPMK
   │
   ▼
Course Plan
   │
   ▼
Course Plan Details
```

---

# Project Structure

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
│   ├── curriculum_los.js
│   └── dbconfig.js
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
├── server.js
├── index.js
└── loki.sql
```

---

# Authentication Model

Authentication is implemented using **JWT tokens**.

Authentication flow:

```
User Login
    │
    ▼
JWT Token Generated
    │
    ▼
Client stores token
    │
    ▼
Protected API Request
    │
    ▼
verifyToken Middleware
    │
    ▼
Authorized Controller Access
```

Middleware responsible:

```
middleware/verifyToken.js
```

Security responsibilities:

* token validation
* unauthorized request blocking
* session protection

---

# API Layer

Example endpoint groups.

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

# Installation

Clone repository

```
git clone https://github.com/yourusername/loki_a2.git
cd loki_a2
```

Install dependencies

```
npm install
```

Configure environment

Create `.env`

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

Run server

```
npm start
```

Application runs at

```
http://localhost:3000
```

---

# Engineering Decisions

### Why Express.js

Express provides a minimal backend framework suitable for structured MVC implementations.

### Why MySQL

The system requires structured relational modeling for academic relationships such as:

* courses
* learning outcomes
* course plans
* lecturer assignments

### Why EJS

EJS allows server-side rendering with dynamic templates while keeping frontend lightweight.

---

# Scalability Considerations

Future architectural improvements could include:

* service layer abstraction
* API versioning
* database migrations
* RBAC policy engine
* REST API documentation (OpenAPI)
* frontend SPA architecture (React / Vue)
* containerization with Docker

---

# Contributors

| Name                            | Role     |
| ------------------------------- | -------- |
| Nada Safarina                   | Frontend |
| Dwisuci Insani Karimah          | Frontend |
| Annisa Ulfa                     | Backend  |
| Muhammad Rayhan Rizaldi         | Backend  |
| Boby Darmawan                   | Backend  |
| Raidan Malik Sandra (Reltroner) | Backend  |

---

# Academic Context

This project was developed as part of a university coursework assignment focused on building a **web-based academic management system**.

The implementation demonstrates concepts in:

* full-stack web development
* backend system design
* relational database modeling
* authentication systems

---

# License

Open source for academic and educational purposes.
