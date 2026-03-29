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

## Phase 4 (Current — Deterministic Architecture)

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

Every request follows a predictable path:

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

Strict enforcement:

```text
Controller  ❌ no DB access
Service     ❌ no Sequelize usage (enforced in Phase 4)
Repository  ✔ single DB gateway
```

---

## 4. Debugging Clarity

System debugging follows **layer-by-layer tracing**:

```text
Route → Controller → Service → Repository → DB
```

No ambiguity. No guessing.

---

# 🔐 Authentication System

Authentication is implemented using:

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

Auth is now **fully isolated and modular**.

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

Core entities:

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

# 📁 Project Structure (Phase 4)

```text
config/
controllers/
middleware/            (legacy → being removed)
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
legacy/                (isolated old system)
```

---

# 🧬 Database Lifecycle (Deterministic)

### Standard Flow

```bash
npm run db:reset
npm run db:init
npm run db:seed
```

### Target (Phase 4)

```bash
npm run db:bootstrap
```

### Characteristics

* auto schema sync via Sequelize
* seeded admin user
* fully reproducible environment
* zero ambiguity for new developers

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

# 🔄 Phase 4 Refactor Status

## ✅ Completed

* Controller unification
* Legacy controller isolation
* Service layer enforcement
* Authentication modularization
* Database lifecycle stabilization
* Middleware centralization (auth module)

---

## 🔄 In Progress

```text
Step 4.3 — Architecture Cleanup & Hardening
```

### Focus

* remove legacy middleware
* eliminate unused dependencies
* enforce clean module boundaries
* reduce system noise

---

# 🚀 Installation

```bash
git clone https://github.com/Reltroner/loki.git
cd loki_a2

npm install

npm run db:bootstrap   # (soon)
npm run dev
```

---

# 🧠 Engineering Direction

This project is evolving into:

```text
deterministic backend system
clean architecture implementation
low debugging cost system
modular scalable backend
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

Originally developed as a university project, now evolving into a:

```text
production-grade backend architecture exercise
```

---

# 📜 License

Open source for academic and educational purposes.

---

# 🔥 Signature Engineering Identity (Added)

This project follows a strict engineering philosophy:

```text
Deterministic > Trial & Error
Clarity > Cleverness
Layer-by-layer Debugging > Guessing
Small Safe Refactor > Big Rewrite
```

---


