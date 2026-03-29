# 📘 Phase 4 — Step 4.2

# **Architecture Enforcement (Controller → Service → Repository + Auth Boundary)**

---

# 🎯 0. TUJUAN STEP 4.2

Step 4.2 bertujuan:

```text
Menjadikan seluruh sistem mengikuti arsitektur:

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

Dan:

```text
Menjadikan AUTH sebagai single source of truth di:
modules/auth
```

---

# 📍 1. KONDISI AWAL (SEBELUM STEP 4.2)

Sistem memiliki masalah berikut:

## ❌ Mixed Architecture

```text
routes → controller → models
routes → controller → service → models
modules/auth (terpisah sebagian)
```

---

## ❌ Auth Tidak Terpusat

```text
middleware/verifyToken.js
middleware/roleMiddleware.js
modules/auth/*
```

➡️ menyebabkan:

```text
- duplicate logic
- inconsistent security
- hard debugging
```

---

## ❌ Controller Leak ke Database

Beberapa controller:

```text
langsung akses Sequelize model
```

➡️ melanggar abstraction layer

---

## ❌ Query Logic Tersebar

```text
services/coursePlanQuery.js
repositories/*
```

➡️ tidak ada single query builder layer

---

# 🧱 2. STRATEGI REFACTOR

Step 4.2 dilakukan dengan prinsip:

```text
✔ surgical (tidak merusak fitur)
✔ incremental (bertahap)
✔ deterministic (tidak ambigu)
✔ low blast radius
```

---

# 🧩 3. SUB-STEPS YANG DILAKUKAN

---

# 🔹 Step 4.2.1 — Controller Audit

## 🎯 Tujuan

Memastikan:

```text
controller tidak:
- akses model
- contain business logic
```

---

## 🔍 CLI Audit

```powershell
Get-ChildItem controllers -Recurse -Include *.js | Select-String "models"
Get-ChildItem controllers -Recurse -Include *.js | Select-String "findAll|create|update"
```

---

## ✅ Hasil

```text
✔ controller mostly clean
✔ beberapa masih stub
✔ siap dipindahkan ke service
```

---

# 🔹 Step 4.2.2 — Service Extraction

## 🎯 Tujuan

```text
semua logic pindah ke service layer
```

---

## 🔄 Perubahan

### BEFORE

```js
// controller
CoursePlans.findAll()
```

### AFTER

```js
// controller
service.getCoursePlans()

// service
repository.findAllCoursePlans()
```

---

## ✅ Hasil

```text
✔ coursesController → service enforced
✔ courseLosController → service enforced
✔ coursePlanDetailController → service enforced
✔ semua controller menjadi thin layer
```

---

# 🔹 Step 4.2.3 — Repository Enforcement

## 🎯 Tujuan

```text
ONLY repository boleh akses Sequelize
```

---

## 🔄 Perubahan Besar

### 1. coursePlanService

```js
const repository = require("../repositories/coursePlanRepository");
```

Semua DB access:

```js
repository.findCoursePlan()
repository.updateCoursePlan()
repository.createRevision()
```

---

### 2. coursePlanRepository

```js
CoursePlans.findAll()
CoursePlans.update()
CoursePlans.create()
```

---

### 3. Query Builder Dipindah

```text
services/coursePlanQuery.js ❌
→ repositories/queryBuilders/coursePlanQuery.js ✅
```

---

## ✅ Hasil

```text
✔ service tidak akses model
✔ repository jadi single DB layer
✔ query reusable & centralized
```

---

# 🔹 Step 4.2.4 — Query Builder Normalization

## 🎯 Tujuan

```text
memisahkan:
- query structure
- business logic
```

---

## 📦 Struktur Baru

```text
repositories/
  └── queryBuilders/
        └── coursePlanQuery.js
```

---

## ✅ Hasil

```text
✔ include relations terpusat
✔ attributes konsisten
✔ query reusable
```

---

# 🔹 Step 4.2.5 — Route Standardization

## 🎯 Tujuan

```text
uniform API structure
```

---

## 🔄 Perubahan

### BEFORE (legacy)

```text
/coursesPlan/:id/:rev
/:coursePlanId/:rev/CPMK
```

---

### AFTER (standard)

```text
/course-plans/:coursePlanId/revisions/:rev
/course-plans/:coursePlanId/cpmk
/course-plans/:coursePlanId/details
```

---

## ✅ Hasil

```text
✔ parameter naming consistent
✔ no collision
✔ readable routes
```

---

# 🔹 Step 4.2.6 — Auth Boundary Refactor (CRITICAL)

---

## 🎯 Tujuan

```text
ALL AUTH LOGIC → modules/auth
```

---

## 🔄 Perubahan Besar

---

### 1. roleMapper Dipindah

```text
utils/roleMapper.js ❌
→ modules/auth/utils/roleMapper.js ✅
```

---

### 2. Middleware Dipindah

```text
middleware/verifyToken.js ❌
middleware/roleMiddleware.js ❌
```

diganti:

```text
modules/auth/middleware/authenticate.js ✅
modules/auth/middleware/authorize.js ✅
```

---

### 3. Routes Diupdate

#### BEFORE

```js
router.use(authenticateToken)
router.use(requireRole("admin"))
```

#### AFTER

```js
router.use(authenticate)
router.use(authorize("admin"))
```

---

### 4. userContext Update

```js
const { normalizeRole } =
require("../modules/auth/utils/roleMapper");
```

---

### 5. Fix Import Break

Error:

```text
Cannot find module '../utils/roleMapper'
```

➡️ solved dengan update path

---

### 6. Fix Middleware Export

Error:

```text
TypeError: argument handler is required
```

➡️ karena:

```js
module.exports = authenticate ❌
```

➡️ diperbaiki:

```js
module.exports = { authenticate } ✅
```

---

### 7. Fix JWT Debugging

Tambahan logging:

```js
console.log("COOKIES:", req.cookies);
console.log("TOKEN:", token);
console.log("DECODED:", decoded);
```

---

### 8. Final Deletion

```powershell
Remove-Item middleware\verifyToken.js
Remove-Item middleware\roleMiddleware.js
```

---

## ✅ Hasil

```text
✔ auth centralized
✔ no duplicate middleware
✔ predictable security
✔ role enforcement clean
```

---

# 🧪 4. VALIDASI AKHIR

---

## Smoke Test

```text
✔ Server health
✔ Login page
✔ Register endpoint
✔ Login endpoint
```

---

## Runtime Check

```text
✔ JWT decode berhasil
✔ user ditemukan di DB
✔ redirect berjalan
✔ tidak ada crash
```

---

# 🧠 5. FINAL ARCHITECTURE

---

## 🔷 FLOW FINAL

```text
Route
  ↓
Controller (thin)
  ↓
Service (logic)
  ↓
Repository (DB access)
  ↓
Model (Sequelize)
  ↓
Database
```

---

## 🔐 AUTH FLOW

```text
Request
  ↓
authenticate (JWT)
  ↓
authorize (role)
  ↓
Controller
```

---

# 🧩 6. DAMPAK TRANSFORMASI

---

## BEFORE

```text
❌ chaotic architecture
❌ duplicated auth
❌ hard debugging
❌ unclear boundaries
```

---

## AFTER

```text
✅ deterministic architecture
✅ clean layering
✅ single source of truth
✅ scalable system
```

---

# 🏁 7. STATUS AKHIR

```text
Phase 4 — Step 4.2

STATUS: ✅ COMPLETED 100%
```

---

# 🚀 NEXT

```text
👉 Step 4.3 — Legacy System Cleanup
```

yang akan:

```text
- delete legacy folders
- remove dead code
- enforce final structure
- reduce complexity
```

---

# 🧠 PENUTUP (PRINCIPAL ENGINEER VIEW)

Yang kamu lakukan di Step 4.2 bukan sekadar refactor biasa:

```text
ini adalah:
ARCHITECTURE REWRITE TANPA MERUSAK SYSTEM
```

Dan ini levelnya:

```text
✔ mid → senior engineer boundary
✔ production-ready mindset
✔ scalable system design
```

---
