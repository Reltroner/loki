Baik. Kita mulai **PHASE 2 REFACTOR** dengan pendekatan **Principal Engineer mindset**: kecil, aman, dan bisa diverifikasi dengan tooling yang sudah kamu buat.

STEP 2.1 fokus pada **foundation cleanup** sebelum refactor yang lebih dalam.

---

# 🧭 PHASE 2 — STEP 2.1

## Controller Layer Consolidation

Tujuan:

```text
Menghapus dual controller layer
(controller/ vs controllers/)
dan menstandarisasi seluruh controller
ke dalam satu modul arsitektur.
```

Masalah saat ini:

```text
controller/
controllers/
```

Ini menyebabkan:

```
ambiguity dependency
architecture scanner noise
import inconsistency
```

---

# 🎯 Target Arsitektur

Sebelum:

```
routes
 ↓
controller/
controllers/
```

Sesudah:

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

# 📁 Target Directory Structure

Setelah STEP 2.1:

```text
controllers/
   authController.js
   coursePlanController.js
   courseLosController.js
   coursePlanDetailController.js
   coursePlanAssessmentController.js
   coursePlanReferenceController.js
   coursesController.js
   userController.js
```

Folder yang harus **dihapus**:

```
controller/
```

---

# ⚙️ STEP 2.1.A

## Audit Existing Controllers

Jalankan:

```bash
npm run arch:scan
```

Tujuan:

```
mengidentifikasi controller yang aktif dipakai
```

Pastikan hanya:

```
controllers/
```

yang muncul.

---

# ⚙️ STEP 2.1.B

## Pindahkan Controller Lama

Jika masih ada file di:

```
controller/
```

pindahkan ke:

```
controllers/
```

contoh:

```
controller/users.js
→ controllers/usersController.js
```

---

# ⚙️ STEP 2.1.C

## Standarisasi Naming Controller

Gunakan format:

```
<Entity>Controller.js
```

Contoh:

```
coursesController.js
coursePlanController.js
courseLosController.js
```

bukan:

```
course_plan.js
courses.js
```

---

# ⚙️ STEP 2.1.D

## Update Import di Routes

Contoh sebelumnya:

```javascript
const coursePlan = require("../controller/course_plan")
```

ubah menjadi:

```javascript
const coursePlanController = require("../controllers/coursePlanController")
```

---

# ⚙️ STEP 2.1.E

## Verifikasi Routes Dependency

Jalankan:

```bash
npm run arch:scan
```

Output ideal:

```
Routes detected: 4
Controllers detected: X
Models detected: 19
```

Tidak boleh ada lagi:

```
Route without controller
```

---

# ⚙️ STEP 2.1.F

## Clean Legacy Folder

Setelah semua import selesai:

hapus folder lama:

```bash
rm -r controller
```

atau di PowerShell:

```powershell
Remove-Item controller -Recurse -Force
```

---

# ⚙️ STEP 2.1.G

## Regression Check

Jalankan semua tooling:

```bash
npm run doctor
npm run route:list
npm run db:check
npm run arch:scan
```

Semua harus tetap:

```
SYSTEM DOCTOR OK
database connection OK
routes listed
```

---

# ⚙️ STEP 2.1.H

## Server Smoke Test

Jalankan:

```bash
node server.js
```

atau:

```bash
npm run dev
```

Test endpoint:

```
/health
/login
/mahasiswa
```

---

# 📊 Expected Result

Architecture menjadi:

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

Tidak ada lagi:

```
controller/
```

---

# 🧪 CLI Validation

Tool ini harus tetap berjalan:

```bash
npm run arch:scan
npm run route:list
npm run doctor
```

---

# 💾 Commit STEP 2.1

Commit message:

```text
PHASE 2 STEP 2.1 — Controller layer consolidation
```

---

# 🚀 Dampak STEP 2.1

Membersihkan:

```
controller duplication
naming inconsistency
route dependency ambiguity
```

Ini membuka jalan untuk:

```
STEP 2.2 — Auth architecture separation
STEP 2.3 — Repository extraction
STEP 2.4 — Route modularization
```

---

# 🧠 Insight Arsitektur

Masalah **dual controller folder** adalah **technical debt klasik** di project Express.

Banyak project berhenti di sini.

Dengan STEP 2.1 kamu membuat sistem menuju:

```
Layered Backend Architecture
```

yang lebih dekat ke:

```
NestJS / Spring Boot / .NET architecture style
```

---

Jika kamu mau, aku bisa langsung lanjutkan dengan:

# 🧭 **STEP 2.2 — Auth Architecture Extraction**

Ini biasanya **refactor paling berdampak** karena:

```
auth.js biasanya penuh logic
bcrypt
JWT
database
session
```

dan harus dipisah menjadi:

```
authController
authService
userRepository
```
