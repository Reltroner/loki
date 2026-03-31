# 📘 RPS Management System

### Academic Course Plan (RPS) Platform

A role-based **RPS (Rencana Pembelajaran Semester) management platform** built with **Node.js, Express, SQLite, and EJS**, designed to digitize the creation, management, and distribution of course plans in higher education institutions.

This project has evolved from a traditional MVC system into a **layered, deterministic backend architecture**, emphasizing:

```text
clarity
stability
predictability
maintainability
```

---

# 🧭 System Overview

Universities often manage RPS documents manually using spreadsheets or PDFs.
This system transforms the workflow into a **centralized web platform** that enables structured academic management.

## 📌 Project Evolution

This project was originally developed in 2022 as a collaborative academic system by a team of students.

## 🔧 My Contribution (2026 Refactor & Evolution)

In 2026, I independently led a full system refactor, transforming the project into a deterministic, production-oriented backend system with:

- layered architecture (controller → service → repository)
- structured error handling and observability
- automated testing and system validation
- modular authentication system
- improved maintainability and scalability

This phase represents a complete architectural evolution from the original implementation.

### Core Capabilities

* centralized course plan management
* learning outcome mapping (CPL → CPMK)
* lecturer RPS authoring tools
* academic reporting & analytics
* student RPS discovery
* printable academic documents

---

# ⚙️ Tech Stack

## Backend

* Node.js
* Express.js
* SQLite (Sequelize ORM)
* JWT Authentication (cookie-based)

## Frontend

* HTML
* CSS
* JavaScript
* EJS Template Engine

## Engineering Concepts

* Clean Layered Architecture
* RESTful Design
* Middleware-based Security
* Relational Data Modeling
* Deterministic System Design

---

# 🏗️ Architecture Evolution

## Phase ≤3 (Legacy)

```text
Routes → Controllers → Models → Database
```

### Issues

* mixed architectural styles
* controller-heavy logic
* direct model access
* high debugging cost

---

## Phase 4 (Deterministic Architecture)

```text
Routes
↓
Controllers
↓
Services
↓
Repositories
↓
Models
↓
Database
```

### Characteristics

* deterministic execution flow
* strict separation of concerns
* service orchestration layer
* repository-based data access
* low debugging complexity
* traceable system behavior

---

# 🧠 Architectural Principles

## 1. Deterministic Flow

```text
Route → Controller → Service → Repository → Model
```

---

## 2. Single Responsibility

| Layer      | Responsibility   |
| ---------- | ---------------- |
| Route      | HTTP mapping     |
| Controller | request/response |
| Service    | business logic   |
| Repository | database access  |
| Model      | ORM schema       |

---

## 3. No Layer Leakage

```text
Controller  ❌ no DB access  
Service     ❌ no Sequelize usage  
Repository  ✔ single DB gateway  
```

---

## 4. Debugging Clarity

```text
Route → Controller → Service → Repository → DB
```

No ambiguity. No guessing.

---

# 🔐 Authentication System

```text
JWT + Cookie-based session
```

### Flow

```text
Login
→ JWT generated
→ Cookie stored (httpOnly)
→ Middleware validates
→ Access granted
```

### Module Boundary

```text
modules/auth/
├── authRoutes
├── authController
├── authService
├── authRepository
├── middleware/
├── utils/
```

Auth is **fully modular and isolated**.

---

# 🧱 Role-Based Access Model

## Admin

* manage courses
* manage lecturers
* monitor RPS progress
* generate reports
* manage curriculum outcomes

## Lecturer (Dosen)

* create and edit RPS
* define CPMK
* design assessments
* manage references

## Student (Mahasiswa)

* view courses
* search RPS
* print documents

---

# 🗃️ Data Model

| Entity       | Description         |
| ------------ | ------------------- |
| Users        | system accounts     |
| Lecturers    | academic staff      |
| Courses      | subjects            |
| Course Plans | RPS documents       |
| Plan Details | weekly meetings     |
| Assessments  | grading components  |
| CPL          | curriculum outcomes |
| CPMK         | course outcomes     |

---

# 📁 Project Structure

```text
config/
controllers/
middleware/
models/
repositories/
  └── queryBuilders/
services/
routes/
modules/
  └── auth/
scripts/
utils/
views/
public/
docs/
```

---

# 🧬 Database Lifecycle (Deterministic)

```bash
npm run db:reset
npm run db:init
npm run db:seed
```

### Target

```bash
npm run db:bootstrap
```

### Characteristics

* reproducible environment
* seeded baseline data
* zero ambiguity setup

---

# 🧪 CLI Tooling (Engineering Observability)

```bash
node scripts/doctor.js
node scripts/route-audit.js
node scripts/dependency-check.js
node scripts/sequelize-health.js
npm run smoke:test
```

### Purpose

* detect architectural issues
* validate routing layer
* ensure system stability
* prevent regression

---

# 🔄 Phase Evolution Summary

---

## ✅ Phase 4 — Architecture

```text
✔ clean layered system
✔ separation of concerns
✔ repository pattern
```

---

## ✅ Phase 5 — Stability

```text
✔ edge-case awareness
✔ predictable behavior
✔ structured thinking
```

---

## ✅ Phase 6 — Reliability & Automation

```text
✔ request validation (no input chaos)
✔ deterministic error system
✔ service-level error identity (error.code)
✔ controller error mapping (status-aware)
✔ edge-case matrix (defined behavior)
✔ automation testing (no manual testing)
✔ structured logging (observability)
```

---

# 🔥 System Guarantees (Phase 6)

After Phase 6, the system guarantees:

```text
✔ no silent failure
✔ no random error behavior
✔ no uncontrolled input
✔ all flows testable
✔ all requests observable
```

---

# 🧪 Automation Testing

```bash
npm run smoke:test
```

### Covered Scenarios

```text
✔ health check
✔ login success
✔ login wrong password → 401
✔ login invalid input → 400
✔ register invalid → 400
✔ register success
```

---

# 📊 Observability (Logging System)

All requests are logged in structured format:

```js
{
  method: 'POST',
  path: '/auth/login',
  status: 401,
  duration: '58ms',
  user: null
}
```

### Characteristics

```text
✔ consistent
✔ minimal
✔ traceable
✔ production-safe
```

---

# 🧠 Engineering Direction

This project has evolved into:

```text
deterministic backend system
low debugging cost system
fully testable backend
observable execution system
```

---

# 🏁 Current System State

```text
✔ reliable
✔ predictable
✔ testable
✔ observable
✔ stable
```

---

# 🚀 Next Phase

```text
PHASE 7 — SECURITY HARDENING
```

Focus:

```text
✔ rate limiting
✔ brute force protection
✔ JWT security
✔ cookie hardening
✔ data protection
```

---

# 👥 Contributors

| Name                                | Role     |
| ----------------------------------- | -------- |
| Nada Safarina                       | Frontend |
| Dwisuci Insani Karimah              | Frontend |
| Annisa Ulfa                         | Backend  |
| Muhammad Rayhan Rizaldi             | Backend  |
| Boby Darmawan                       | Backend  |
| Raidan Malik Sandra (Rei Reltroner) | Backend  |

---

# 🎓 Academic Context

Originally developed as a university project, now evolving into:

```text
production-grade backend engineering system
```

---

# 📜 License

Open source for academic and educational purposes.

---

# 🔥 Signature Engineering Identity

```text
Deterministic > Trial & Error
Clarity > Cleverness
Layer-by-layer Debugging > Guessing
Small Safe Refactor > Big Rewrite
```

---

# 🧠 FINAL INSIGHT

This is no longer:

```text
just a backend project
```

This is:

```text
🔥 a controlled, testable, observable system
```

---

