# 🚀 Phase 4 — Step 4.2 Blueprint

## **"Layer Enforcement & Execution Path Normalization"**

---

# 1️⃣ Objective Step 4.2

Step ini bertujuan untuk memastikan:

```text
100% request flow deterministic
tidak ada bypass antar layer
tidak ada logic duplication
```

Target akhir:

```text
routes → controllers → services → repositories → models
```

Tanpa exception.

---

# 2️⃣ Current Problem (yang kamu alami sekarang)

Walaupun Step 4.1 sudah stabil, masih ada:

```text
❌ Controller langsung akses model
❌ Service tidak selalu digunakan
❌ Logic tersebar (controller + service)
❌ Role mapping bocor ke luar auth module
```

Ini menyebabkan:

```text
logic tidak predictable
debugging sulit
hidden bugs (seperti redirect issue kemarin)
```

---

# 3️⃣ Scope Step 4.2 (STRICT)

Step 4.2 hanya fokus pada:

```text
✔ enforce layer
✔ rapikan flow
✔ tidak ubah fitur
✔ tidak ubah UI
✔ tidak ubah DB schema
```

---

# 4️⃣ Golden Rule (WAJIB)

Selama Step 4.2:

```text
Controller ❌ TIDAK BOLEH:
- query database
- pakai Sequelize model
- handle business logic

Service ❌ TIDAK BOLEH:
- akses request (req, res)
- render view

Repository ❌ TIDAK BOLEH:
- contain business logic
```

---

# 5️⃣ Target Flow Final

```text
[Route]
   ↓
[Controller]  → handle req/res ONLY
   ↓
[Service]     → business logic ONLY
   ↓
[Repository]  → database ONLY
   ↓
[Model]
```

---

# 6️⃣ Execution Strategy (Deterministic)

Step 4.2 dibagi menjadi **4 Substep**:

---

## 🔹 Step 4.2.1 — Controller Audit

### Tujuan:

Identifikasi pelanggaran layer

### CLI:

```powershell
grep "require(.*models" controllers\*.js
```

```powershell
grep "sequelize" controllers\*.js
```

### Jika ketemu:

```text
❌ controller akses model langsung
```

---

## 🔹 Step 4.2.2 — Service Extraction

### Tujuan:

Pindahkan logic dari controller → service

---

### BEFORE (BAD):

```js
// controller
const course = await Courses.findAll()
```

---

### AFTER (GOOD):

```js
// controller
const data = await courseService.getAllCourses()
```

```js
// service
exports.getAllCourses = async () => {
  return await courseRepository.findAll()
}
```

---

## 🔹 Step 4.2.3 — Repository Enforcement

### Tujuan:

Semua query DB harus lewat repository

---

### BEFORE:

```js
await Courses.create(...)
```

---

### AFTER:

```js
await courseRepository.createCourse(...)
```

---

## 🔹 Step 4.2.4 — Route Clean Mapping

Pastikan semua route:

```text
route → controller.method
```

Tidak ada inline logic.

---

# 7️⃣ Refactor Priority Order (WAJIB IKUTI)

Jangan acak. Urutan ini deterministic:

---

### 1. Auth Module (SUDAH SELESAI sebagian)

```text
modules/auth
```

✔ repository
✔ service
✔ controller

→ hanya perlu minor cleanup

---

### 2. Dashboard (LOW RISK)

```text
admin dashboard
```

---

### 3. Courses

```text
controllers/coursesController.js
```

---

### 4. Course Plan (HIGH COMPLEXITY)

```text
coursePlanController
```

---

# 8️⃣ Refactor Pattern (Template)

Gunakan pattern ini untuk SEMUA feature:

---

### Controller

```js
exports.getSomething = async (req, res) => {
  try {
    const result = await service.doSomething(req.params)

    res.render("view", result)

  } catch (err) {
    res.status(500).render("err500", { error: err.message })
  }
}
```

---

### Service

```js
exports.doSomething = async (params) => {
  // business logic here

  return await repository.querySomething(params)
}
```

---

### Repository

```js
exports.querySomething = async (params) => {
  return await Model.findAll({ where: params })
}
```

---

# 9️⃣ Blast Radius Control

Setiap refactor:

```text
✔ refactor 1 file
✔ test langsung
✔ lanjut file berikutnya
```

---

# 🔟 Verification Strategy

Setelah setiap perubahan:

---

### 1. Run server

```powershell
node server.js
```

---

### 2. Smoke test

```powershell
npm run smoke:test
```

---

### 3. Route audit

```powershell
node scripts/routes-list.js
```

---

### 4. Manual test

```text
login
dashboard
courses
```

---

# 11️⃣ Anti-Pattern (HARUS DIHINDARI)

```text
❌ refactor semua file sekaligus
❌ ubah DB schema
❌ ubah naming besar-besaran
❌ tambah fitur baru
❌ optimasi premature
```

---

# 12️⃣ Success Criteria Step 4.2

Step 4.2 selesai jika:

```text
✔ controller tidak menyentuh model
✔ semua query lewat repository
✔ semua logic di service
✔ route → controller clean
✔ tidak ada duplication logic
✔ flow predictable
```

---

# 13️⃣ Expected Outcome

Setelah Step 4.2:

```text
debugging jadi linear
tidak ada hidden logic
flow mudah ditrace
bug seperti sebelumnya tidak terulang
```

---

# 🧠 Insight (very important)

Step 4.1 tadi memperbaiki:

```text
SYSTEM STATE
```

Step 4.2 memperbaiki:

```text
EXECUTION FLOW
```

---

# 🚀 Next

Kalau blueprint ini sudah clear, langkah berikutnya:

```text
👉 generate Step 4.2.1 (Controller Audit — CLI deterministic)
```

Itu akan jadi **entry point eksekusi nyata** Step 4.2 tanpa chaos.
