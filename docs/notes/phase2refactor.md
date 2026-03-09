# 📦 PHASE 2 — MODULAR ARCHITECTURE REFACTOR

Project:

```text
loki_a2-master
```

Objective:

```text
Transform backend from basic Express MVC
into modular, tool-driven backend architecture.
```

Principles applied:

```text
Separation of concerns
Layered architecture
Feature modularization
Developer tooling
Architecture observability
```

---

# 🧭 ARCHITECTURAL TARGET

Final backend architecture:

```text
modules/
   auth/
      authRoutes.js
      authController.js
      authService.js
      authRepository.js

models/
scripts/
docs/
server.js
```

Execution flow:

```text
HTTP Request
     ↓
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

---

# STEP 2.1

# Controller Layer Consolidation

## Problem

Project memiliki dua folder:

```text
controller/
controllers/
```

Hal ini menyebabkan:

```text
duplicate controller structure
inconsistent imports
unclear architecture boundaries
```

## Solution

Standardize controller layer:

```text
controllers/
```

Routes tidak lagi memanggil logic langsung.

## Result

```text
routes → controllers → models
```

Architecture scanner sekarang dapat mengidentifikasi dependency layer dengan jelas.

---

# STEP 2.2

# Service Layer Extraction

## Problem

Controller berisi:

```text
bcrypt logic
JWT generation
database queries
```

Ini melanggar separation of concerns.

## Solution

Introduce service layer:

```text
services/authService.js
```

Controller hanya bertanggung jawab untuk:

```text
request handling
response formatting
```

Service menangani:

```text
business logic
authentication rules
token generation
```

## Result

```text
routes → controllers → services → models
```

---

# STEP 2.3

# Repository Layer Extraction

## Problem

Service masih langsung mengakses Sequelize models.

```text
Users.create
Users.findOne
```

Ini membuat database coupling tinggi.

## Solution

Introduce repository layer:

```text
repositories/userRepository.js
```

Repository menangani:

```text
data persistence
database queries
ORM interaction
```

Service sekarang menjadi:

```text
pure business logic layer
```

## Result

```text
routes → controllers → services → repositories → models
```

---

# STEP 2.4

# Feature-Based Modular Architecture

## Problem

Layer-based folder structure sulit dinavigasi saat project berkembang.

Contoh masalah:

```text
controllers = 60+ files
services = 80+ files
repositories = 40+ files
```

Developer harus berpindah folder untuk satu feature.

## Solution

Introduce feature modules.

```text
modules/
   auth/
```

Module berisi seluruh layer untuk satu domain.

```text
authRoutes
authController
authService
authRepository
```

## Result

Feature navigation:

```text
modules/auth
```

Semua logic berada dalam satu tempat.

---

# STEP 2.5

# Architecture Visualizer CLI

Introduce tool:

```bash
npm run arch:diagram
```

Script:

```text
scripts/architecture-diagram.js
```

Tool menghasilkan diagram:

```text
routes → controllers → services → repositories → models
```

Output:

```text
docs/architecture/backend-architecture.png
```

Purpose:

```text
visual documentation
architecture onboarding
system overview
```

---

# STEP 2.6

# Auto Module Loader

## Problem

Routes harus diregister manual di server.

```js
app.use("/auth", authRoutes)
```

Semakin banyak module → semakin kompleks server configuration.

## Solution

Introduce module loader:

```text
scripts/module-loader.js
```

Server secara otomatis menemukan:

```text
modules/*/*Routes.js
```

dan melakukan mounting:

```text
/auth
/courses
/users
```

## Result

Server bootstrap menjadi:

```js
loadModules(app)
```

---

# STEP 2.7

# Module Dependency Graph Generator

Introduce CLI:

```bash
npm run arch:deps
```

Script:

```text
scripts/module-deps.js
```

Tool ini:

```text
scan modules
detect dependencies
generate dependency graph
```

Output:

```text
docs/architecture/module-dependency.png
```

Purpose:

```text
understand module coupling
detect tight dependencies
visualize domain relations
```

---

# STEP 2.8

# Route Conflict Detector

Introduce CLI:

```bash
npm run route:audit
```

Script:

```text
scripts/route-audit.js
```

Tool mendeteksi:

```text
duplicate routes
shadowed routes
parameter collisions
```

Example problem:

```text
GET /coursesPlan/:id/:rev
GET /coursesPlan/:id/:rev
```

Output example:

```text
✔ No duplicate routes detected
```

---

# STEP 2.9

# Architecture Health Score

Introduce CLI:

```bash
npm run arch:score
```

Script:

```text
scripts/architecture-score.js
```

Tool mengevaluasi:

```text
module structure
CLI tooling completeness
architecture documentation
```

Output example:

```text
ARCHITECTURE HEALTH SCORE

✔ Modules structure
✔ CLI tooling
✔ Architecture docs

Score: 100 / 100
```

Purpose:

```text
quick architecture quality check
CI readiness
engineering visibility
```

---

# CLI ENGINEERING TOOLKIT

Backend sekarang memiliki toolkit:

```bash
npm run doctor
npm run route:list
npm run route:audit
npm run arch:scan
npm run arch:diagram
npm run arch:deps
npm run arch:score
npm run db:check
npm run query:analyze
npm run index:audit
npm run smoke:test
```

Capabilities:

```text
system diagnostics
architecture visualization
dependency analysis
route validation
performance analysis
smoke testing
architecture scoring
```

---

# ARCHITECTURE DOCUMENTATION

Generated artifacts:

```text
docs/architecture/database-erd.png
docs/architecture/backend-architecture.png
docs/architecture/module-dependency.png
```

These diagrams represent:

```text
database schema
backend architecture layers
module relationships
```

---

# ENGINEERING OUTCOME

Before Phase 2:

```text
basic Express MVC
```

After Phase 2:

```text
modular backend architecture
with engineering tooling
```

Capabilities added:

```text
feature modules
auto module loading
architecture diagrams
dependency graphs
route auditing
smoke testing
architecture scoring
```

---

# PRINCIPAL ENGINEER PERSPECTIVE

Phase 2 achieved:

```text
architectural clarity
developer observability
modular scalability
tool-driven backend development
```

The backend is now ready for:

```text
team collaboration
feature expansion
long-term maintainability
```

---

# FUTURE ROADMAP (PHASE 3)

Potential next evolution:

```text
STEP 3.0 Architecture Linter
STEP 3.1 Automatic OpenAPI generator
STEP 3.2 Contract testing
STEP 3.3 Performance profiler CLI
STEP 3.4 CI architecture gate
```

Goal:

```text
turn backend into a self-diagnosing platform
```

---
