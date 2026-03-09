# 1️⃣ Hasil Scan Arsitektur Saat Ini

Dari `arch:scan`:

```
Routes detected: 4
Controllers detected: 8
Models detected: 19
⚠ Route without controller → auth.js
```

Artinya:

* routing sudah dipisah
* controllers sudah ada
* models sudah banyak
* **auth.js masih berisi logic langsung**

Masalah utamanya:

```
routes/auth.js
```

kemungkinan berisi:

```
JWT logic
DB query
bcrypt
session logic
```

yang **harus dipindah ke controller/service**.

---

# 2️⃣ Problem Arsitektur yang Paling Jelas

## A. Dual controller folder

Project kamu punya:

```
controller/
controllers/
```

Ini **technical debt**.

Standar industri:

```
controllers/
```

folder `controller/` harus **dihapus di Phase 2**.

---

## B. Route masih terlalu besar

Contoh route yang muncul:

```
GET /:id/:rev/CPMK
GET /:id/:rev/pertemuan
GET /:id/:rev/referensi
GET /:id/:rev/penilaian
```

Ini menandakan route file kemungkinan **terlalu gemuk**.

Idealnya:

```
routes/
   coursePlanRoutes.js
   courseLosRoutes.js
   referenceRoutes.js
   assessmentRoutes.js
```

bukan satu file raksasa.

---

## C. Missing Database Index

Dari:

```
npm run index:audit
```

yang paling penting:

```
CoursePlans.course_id
CoursePlanDetails.course_plan_id
CoursePlanAssessments.course_plan_id
```

Ini **critical performance issue**.

Jika database membesar nanti:

```
query akan sangat lambat
```

Ini harus diperbaiki di Phase 2.

---

# 3️⃣ Hal yang Sudah Sangat Bagus

Dari tooling kamu terlihat:

### ✔ Clean Express Boot

```
createApp()
if (require.main === module)
```

ini **production grade pattern**.

---

### ✔ Layer mulai muncul

Sudah ada:

```
controllers
services
repositories
models
```

Ini arah ke:

```
Clean Architecture
```

---

### ✔ Engineering CLI tools

Ini sangat jarang di project kecil.

Kamu sudah punya:

```
route:list
doctor
index:audit
query:analyze
arch:scan
```

Ini **praktik engineer senior**.

---

# 4️⃣ Tujuan PHASE 2 REFACTOR

Goal utamanya:

```
menyelesaikan modular architecture
```

Target akhir:

```
routes
 ↓
controllers
 ↓
services
 ↓
repositories
 ↓
models
```

---

# 5️⃣ Struktur Ideal Setelah Phase 2

Target:

```
src/
   routes/
   controllers/
   services/
   repositories/
   models/
   middleware/
```

Root jadi lebih bersih.

---

# 6️⃣ Phase 2 Refactor Plan

Urutan yang aman:

---

# STEP 1 — Remove legacy controller folder

Hapus:

```
controller/
```

Pastikan semua route pakai:

```
controllers/
```

---

# STEP 2 — Fix auth route architecture

Saat ini:

```
routes/auth.js
```

kemungkinan langsung memanggil:

```
bcrypt
jsonwebtoken
models
```

Refactor menjadi:

```
routes/auth.js
 → controllers/authController.js
 → services/authService.js
 → repositories/userRepository.js
```

---

# STEP 3 — Move query logic ke repository

Contoh yang salah:

```javascript
const coursePlans = await CoursePlans.findAll()
```

di controller.

Harus dipindah ke:

```
repositories/coursePlanRepository.js
```

Controller hanya:

```
call service
```

---

# STEP 4 — Add Sequelize Index

Tambahkan di model.

Contoh:

```javascript
course_id: {
  type: DataTypes.INTEGER,
  allowNull: false,
  indexes: true
}
```

atau:

```javascript
indexes: [
 { fields: ['course_id'] }
]
```

---

# STEP 5 — Split Large Routes

Misalnya:

```
routes/dosen.js
```

pecah menjadi:

```
routes/coursePlanRoutes.js
routes/referenceRoutes.js
routes/assessmentRoutes.js
```

---

# STEP 6 — Clean naming

Standarisasi:

```
CoursePlanController
CoursePlanService
CoursePlanRepository
```

bukan:

```
course_plan.js
```

---

# 7️⃣ Setelah Phase 2 selesai

Arsitektur kamu akan menjadi:

```
Express Clean Architecture
```

yang digunakan oleh banyak perusahaan.

Flow request:

```
HTTP Request
     ↓
Routes
     ↓
Controller
     ↓
Service
     ↓
Repository
     ↓
Sequelize Model
     ↓
Database
```

---

# 8️⃣ Commit untuk Phase 2

Commit message yang bagus:

```
PHASE 2 REFACTOR — Modular Architecture
```

atau:

```
PHASE 2 — Controller / Service / Repository separation
```

---

# 9️⃣ Insight Penting

Project kamu sebenarnya **sudah melampaui Express MVC biasa**.

Banyak project Express hanya:

```
routes
controllers
models
```

Sedangkan kamu sudah menuju:

```
Layered Backend Architecture
```

yang jauh lebih maintainable.

---

✅ **Kesimpulan Phase 2**

Fokus:

1. hapus `controller/`
2. refactor `auth.js`
3. pindahkan query ke repository
4. tambahkan database index
5. pecah route besar
6. standarisasi naming

---

