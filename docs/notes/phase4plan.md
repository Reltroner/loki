# Phase 4 — Deterministic Architecture Refactor Master Plan

## 1. Background

Setelah Phase 3 selesai, sistem telah mencapai kondisi berikut:

* SQLite database lifecycle sudah berjalan (`db:reset → db:init → db:seed`)
* Dashboard admin berfungsi
* Repository layer mulai digunakan
* Authentication module terpisah
* CLI debugging tools tersedia

Namun audit struktur project menunjukkan beberapa **architecture smells** yang dapat menyebabkan:

* loop debugging
* non-deterministic behavior
* duplicated logic
* unclear module boundaries
* maintenance complexity

Phase 4 bertujuan untuk melakukan **refactor sistem secara menyeluruh** dari layer paling bawah hingga layer syntax agar sistem menjadi:

```text
deterministic
clear
stable
clean
maintainable
```

Refactor dilakukan **tanpa memecah fitur yang sudah bekerja**.

---

# 2. Current Architecture Problems

Audit struktur menunjukkan beberapa masalah fundamental.

## 2.1 Duplicate Controller Layer

Project memiliki dua struktur controller:

```text
controller/
controllers/
```

Contoh:

```text
controller/courses.js
controllers/coursesController.js
```

Ini menciptakan:

```text
ambiguous execution path
maintenance difficulty
```

---

## 2.2 Mixed Architectural Styles

Saat ini project menggunakan **3 gaya arsitektur sekaligus**:

### Legacy MVC

```text
routes → controller → models
```

### Partial Service Layer

```text
routes → controllers → services → models
```

### Modular Architecture

```text
modules/auth/*
```

Akibatnya:

```text
inconsistent logic flow
hard-to-trace bugs
```

---

## 2.3 Service Layer Tidak Konsisten

Beberapa fitur menggunakan:

```text
services/
repositories/
```

Namun sebagian controller langsung memanggil:

```text
models
```

Ini melanggar abstraction layer.

---

## 2.4 Database Lifecycle Tidak Terintegrasi

Database lifecycle tersebar di beberapa script:

```text
init-db.js
seed-data.js
create-admin.js
reset-db.js
```

Namun belum ada **single deterministic bootstrap pipeline**.

---

## 2.5 Folder Redundancy

Beberapa folder bersifat legacy atau tidak digunakan:

```text
frontend/
template/
controller/
js/
img/
```

Padahal aplikasi sebenarnya menggunakan:

```text
views/
public/
```

Ini menambah kompleksitas struktur.

---

## 2.6 Auth Layer Tidak Sepenuhnya Terintegrasi

Auth berada di:

```text
modules/auth/
```

Namun middleware dan role mapping berada di:

```text
middleware/
utils/
```

Sehingga boundary auth tidak jelas.

---

# 3. Target Architecture

Phase 4 akan menyatukan arsitektur menjadi **Clean Layered Architecture**.

Target pipeline:

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

Setiap layer memiliki tanggung jawab tunggal.

---

# 4. Target Project Structure

Struktur akhir setelah refactor:

```text
config/
controllers/
middleware/
models/
repositories/
services/
routes/
modules/
scripts/
utils/
views/
public/
docs/
```

Legacy structure akan dihapus.

---

# 5. Deterministic Database Lifecycle

Database lifecycle harus menjadi:

```text
npm run db:reset
npm run db:init
npm run db:seed
```

Namun akan diperkenalkan satu pipeline baru:

```text
npm run db:bootstrap
```

yang menjalankan:

```text
reset → init → seed
```

Dengan demikian developer baru hanya perlu:

```text
npm install
npm run db:bootstrap
npm run dev
```

---

# 6. Authentication Boundary Refactor

Auth module akan menjadi:

```text
modules/auth
```

dengan boundary jelas:

```text
authRoutes
authController
authService
authRepository
```

Semua logic auth akan berada dalam modul ini.

Role mapping dipindahkan ke:

```text
modules/auth/utils
```

---

# 7. Repository Standardization

Semua akses database harus melalui repository.

Contoh:

```text
repositories/coursePlanRepository.js
repositories/dashboardRepository.js
```

Controller tidak boleh langsung memanggil model Sequelize.

---

# 8. Service Layer Enforcement

Business logic harus berada di service layer.

Contoh:

```text
services/coursePlanService.js
services/dashboardService.js
```

Service bertanggung jawab:

```text
validation
business rules
orchestration
```

---

# 9. Route Consistency

Semua route akan mengikuti pola:

```text
/routes
   admin.js
   dosen.js
   mahasiswa.js
```

Controller dipanggil secara konsisten.

Route parameter juga telah diperbaiki untuk menghindari collision:

```text
coursePlanId
cpmkId
referenceId
assessmentId
```

---

# 10. CLI Tooling Stabilization

Script debugging yang sudah ada akan dipertahankan:

```text
doctor.js
route-audit.js
dependency-check.js
sequelize-health.js
smoke-test.js
```

Namun akan dibuat satu orchestrator:

```text
scripts/system-check.js
```

yang menjalankan seluruh diagnostic.

---

# 11. Infrastructure Hardening

Beberapa stabilisasi tambahan:

### Request Logging

```text
middleware/requestLogger.js
```

### Global Error Handler

```text
server.js
```

### Role Middleware

```text
middleware/roleMiddleware.js
```

---

# 12. Documentation Consolidation

Dokumentasi yang tersebar akan dirapikan:

```text
docs/notes/
docs/architecture/
```

dan setiap phase akan memiliki urutan jelas:

```text
Phase1
Phase2
Phase3
Phase4
```

---

# 13. Phase 4 Objectives

Phase 4 bertujuan menghasilkan sistem dengan karakteristik:

```text
Deterministic
Predictable
Modular
Clean Architecture
Low Debugging Cost
```

Refactor dilakukan secara bertahap melalui **sub-steps**.

---

# 14. Phase 4 Execution Strategy

Phase 4 tidak dilakukan sekaligus.

Akan dibagi menjadi beberapa step:

```text
Step 4.1
Step 4.2
Step 4.3
Step 4.4
Step 4.5
Step 4.6
```

Setiap step memiliki scope kecil agar:

```text
blast radius rendah
rollback mudah
debugging minimal
```

---

# 15. Expected Outcome

Setelah Phase 4 selesai, sistem akan memiliki:

* architecture clarity
* deterministic database lifecycle
* unified controller layer
* consistent service & repository usage
* stable authentication module
* minimal debugging loops

---

# End of Phase 4 Master Plan
