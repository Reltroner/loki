# 🚀 RPS Management System

### From Academic Project → Deterministic, Secure Backend System

A role-based **RPS (Rencana Pembelajaran Semester) platform** built with **Node.js, Express, SQLite, and EJS** — redesigned into a **deterministic, production-oriented backend system**.

---

# 🧠 Why This Project Exists

Most universities still manage course plans using:

```text
spreadsheets
PDF documents
manual coordination
```

This creates:

```text
❌ inconsistency  
❌ lack of traceability  
❌ high operational friction  
```

---

### 💡 This system transforms that into:

```text
✔ structured workflow
✔ centralized data
✔ role-based access
✔ deterministic backend behavior
```

---

# 🔥 What Makes This Project Different

This is NOT just a CRUD application.

This is a system engineered with:

```text
Determinism > Trial & Error
Clarity > Cleverness
Predictability > Assumptions
```

---

# ⚙️ Tech Stack

**Backend**

* Node.js
* Express.js
* SQLite (Sequelize ORM)
* JWT (Cookie-based Auth)

**Frontend**

* EJS
* HTML / CSS / JS

---

# 🏗️ Architecture (Core Strength)

### BEFORE (Legacy)

```text
Routes → Controllers → Models → DB
```

Problems:

```text
❌ controller-heavy logic  
❌ tight coupling  
❌ hard to debug  
```

---

### AFTER (Refactored System)

```text
Route
↓
Controller
↓
Service
↓
Repository
↓
Model
↓
Database
```

---

### 🎯 Result

```text
✔ deterministic execution flow  
✔ strict separation of concerns  
✔ traceable behavior  
✔ low debugging cost  
```

---

# 🧠 Engineering Principles

---

## 1. Deterministic Flow

```text
Every request follows ONE clear path.
No hidden logic. No shortcuts.
```

---

## 2. Zero Layer Leakage

```text
Controller  ❌ no DB access  
Service     ❌ no ORM usage  
Repository  ✔ single data gateway  
```

---

## 3. Debugging Without Guessing

```text
Route → Controller → Service → Repository → DB
```

If something breaks:

```text
You know exactly where.
```

---

# 🔐 Security (Production Baseline)

This system is hardened with **real-world backend security practices**:

---

## 🛡️ Authentication

```text
JWT (1h expiration) + httpOnly cookie
```

---

## 🚫 Brute Force Protection

```text
✔ rate limiting (login endpoint)
✔ per-email attempt tracking
✔ temporary lock after multiple failures
```

---

## 🔒 Cookie Security

```text
✔ httpOnly
✔ sameSite protection
✔ secure (production)
✔ expiration aligned with JWT
```

---

## 🧨 Sensitive Data Protection

```text
✔ no "user not found" leak
✔ no password hints
✔ unified error: "Invalid credentials"
```

---

## ⚠️ Error Sanitization

```text
500 → "Internal server error"
```

No internal system exposure.

---

# 🧪 Reliability & Testing

---

## Automated Smoke Testing

```bash
npm run smoke:test
```

---

## Covered Scenarios

```text
✔ login success
✔ wrong password → 401
✔ invalid input → 400
✔ register validation
✔ system health
```

---

## 🎯 Guarantee

```text
✔ no silent failure  
✔ predictable responses  
✔ all critical flows testable  
```

---

# 📊 Observability (Built-in)

Every request is logged:

```js
{
  method: 'POST',
  path: '/auth/login',
  status: 401,
  duration: '58ms',
  user: null
}
```

---

### Why this matters:

```text
✔ faster debugging  
✔ production visibility  
✔ no blind spots  
```

---

# 🧬 Evolution Timeline

---

## Phase 4 — Architecture

```text
✔ layered system
✔ separation of concerns
```

---

## Phase 5 — Stability

```text
✔ predictable behavior
✔ edge-case awareness
```

---

## Phase 6 — Reliability

```text
✔ validation layer
✔ structured error system
✔ automation testing
✔ observability
```

---

## Phase 7 — Security

```text
✔ rate limiting
✔ brute-force protection
✔ JWT hardening
✔ cookie security
✔ data protection
```

---

## 🔥 Phase 8 — UI/UX Foundation (Non-Destructive)

```text
✔ single source of truth (layout system)
✔ elimination of UI duplication
✔ role-based UI rendering
✔ deterministic view structure
✔ asset path standardization (CSS, fonts, images)
✔ font system normalization
✔ centralized navigation via /dashboard
✔ alignment between DB ↔ Model ↔ UI (role system)
✔ removal of legacy includes (header/sidebar/footer)
✔ clean separation: layout vs content views
✔ zero 404 asset errors
✔ stable rendering across all roles
```

---

### 🧠 Key Architectural Shift

```text
FROM:
fragmented views + duplicated UI

TO:
centralized layout-driven rendering system
```

---

### 🎯 Result

```text
✔ predictable UI behavior
✔ scalable component system
✔ no rendering conflicts
✔ consistent experience across admin, dosen, mahasiswa
```

---

# 🏁 Current State

```text
✔ deterministic
✔ secure
✔ testable
✔ observable
✔ UI-consistent
✔ production-ready foundation
```

---

# 🧠 What This Project Demonstrates

This project is not about features.

It demonstrates:

---

### 🔥 Engineering Mindset

```text
✔ structured problem solving  
✔ system thinking  
✔ controlled refactoring  
✔ risk-aware decisions  
```

---

### 🔥 Backend Engineering Depth

```text
✔ layered architecture  
✔ security implementation  
✔ error modeling  
✔ observability design  
✔ UI system architecture (layout-driven)
```

---

### 🔥 Real-World Readiness

```text
✔ not fragile  
✔ not experimental  
✔ not guess-based  
✔ not UI-chaotic  
```

---

# 👤 My Contribution

Originally built as a student project (2022). 

---

### In 2026, I:

```text
✔ redesigned the architecture
✔ introduced deterministic system flow
✔ implemented full error standardization
✔ built automation testing
✔ added production-grade security layer
✔ rebuilt UI into a layout-driven system (Phase 8)
✔ eliminated rendering duplication across all views
✔ aligned data, model, and UI layers
```

---

### Result:

```text
from: academic system  
to:   production-oriented backend system
```

---

# 🚀 What’s Next

```text
PHASE 9 — PRODUCTION READINESS
```

Focus:

```text
✔ authentication hardening (bcrypt consistency)
✔ structured logging (audit-ready)
✔ error classification system
✔ system observability (production-grade)
✔ environment configuration
✔ deployment readiness
✔ scalability considerations
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

# 🧠 Final Thought

Most projects show:

```text
"what was built"
```

This project shows:

```text
🔥 how a system is engineered to be reliable, secure, and predictable
```

---
