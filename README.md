# RPS Management System

### Academic Course Plan (RPS) Platform

A role-based **RPS (Rencana Pembelajaran Semester) management platform** built with **Node.js, Express, SQLite, and EJS**, designed to digitize the creation, management, and distribution of course plans in higher education institutions.

This project has evolved from a traditional MVC system into a **layered, deterministic backend architecture**, emphasizing clarity, stability, and maintainability.

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
* SQLite (via Sequelize ORM)
* JWT Authentication

Frontend

* HTML
* CSS
* JavaScript
* EJS Template Engine

Infrastructure Concepts

* Clean Layered Architecture (Phase 4)
* REST API
* middleware-based security
* relational database modeling
* deterministic system design

---

# Architecture Evolution

## Phase ≤3 (Legacy)

```

Routes → Controllers → Models → Database

```

Characteristics:

* mixed architectural styles
* controller-heavy logic
* direct model access
* debugging complexity

---

## Phase 4 (Current)

```

Routes
↓
Controllers
↓
Services
↓
Repositories (ongoing)
↓
Models
↓
Database

```

Characteristics:

* deterministic execution flow
* strict separation of concerns
* service orchestration layer
* repository-based data access (Step 4.2.3 ongoing)
* reduced debugging complexity

---

# Architectural Principles (Updated)

1. **Deterministic Flow**

Every request follows a predictable path:

```

Route → Controller → Service → Repository → Model

```

2. **Single Responsibility**

Each layer has one clear responsibility:

| Layer        | Responsibility            |
|-------------|--------------------------|
| Route       | HTTP mapping             |
| Controller  | request/response         |
| Service     | business logic           |
| Repository  | database access          |
| Model       | ORM schema               |

3. **No Layer Leakage**

* Controller ❌ DB access
* Service ❌ direct Sequelize usage (in progress)
* Repository ✔ single DB gateway

4. **Debugging Clarity**

All logs and failures are traceable by layer.

---

# Role-Based Access Model

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

# Data Model

Core entities:

| Entity              | Description            |
|-------------------|------------------------|
| Users             | system accounts        |
| Lecturers         | academic staff         |
| Courses           | subjects               |
| Course Plans      | RPS documents          |
| Plan Details      | weekly meetings        |
| Assessments       | grading components     |
| CPL               | curriculum outcomes    |
| CPMK              | course outcomes        |

---

# Project Structure (Phase 4)

```

config/
controllers/
middleware/
models/
repositories/        ← NEW (in progress)
services/
routes/
modules/             ← auth module
scripts/
utils/
views/
public/
docs/
legacy/              ← isolated old system

```

---

# Authentication System

Authentication is implemented using **JWT + Cookie-based session**.

Flow:

```

Login → JWT generated → cookie stored → middleware validates → access granted

```

Location:

```

modules/auth/

````

---

# Database Lifecycle (Deterministic)

Standard flow:

```bash
npm run db:reset
npm run db:init
npm run db:seed
````

Current behavior:

* schema auto-sync via Sequelize
* seed includes admin user
* fully reproducible environment

---

# CLI Tooling

System diagnostics:

```bash
node scripts/doctor.js
node scripts/route-audit.js
node scripts/dependency-check.js
node scripts/sequelize-health.js
npm run smoke:test
```

Purpose:

* detect architecture issues
* validate routes
* ensure system stability

---

# Phase 4 Refactor Status

## Completed

* Controller unification
* Legacy controller removal
* Service layer enforcement
* Authentication stabilization
* Database lifecycle stabilization

## In Progress

```
Step 4.2.3 — Repository Enforcement
```

Goal:

* move all DB queries to repository layer
* eliminate Sequelize usage from services

---

# Installation (Updated)

```bash
git clone https://github.com/Reltroner/loki.git
cd loki_a2

npm install

npm run db:bootstrap   # (coming soon)
npm run dev
```

---

# Engineering Direction

The project is transitioning toward:

* Clean Architecture
* deterministic backend systems
* low debugging cost systems
* modular scalable backend

---

# Contributors

| Name                                | Role     |
| ----------------------------------- | -------- |
| Nada Safarina                       | Frontend |
| Dwisuci Insani Karimah              | Frontend |
| Annisa Ulfa                         | Backend  |
| Muhammad Rayhan Rizaldi             | Backend  |
| Boby Darmawan                       | Backend  |
| Raidan Malik Sandra (Rei Reltroner) | Backend  |

---

# Academic Context

Originally developed as a university project, now evolving into a **production-grade backend architecture exercise**.

---

# License

Open source for academic and educational purposes.

---