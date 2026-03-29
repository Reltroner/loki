# 📘 Phase 4 — Step 4.1

# **Stabilization & Debugging Foundation (Pre-Refactor Phase)**

---

# 🎯 0. TUJUAN STEP 4.1

Step 4.1 adalah fase:

```text
“menstabilkan sistem sebelum disentuh refactor besar”
```

Tujuan utamanya:

```text
✔ memastikan sistem berjalan deterministik
✔ menghilangkan bug fundamental (login, DB, routing)
✔ memastikan observability (debug visibility)
✔ menyiapkan baseline sebelum refactor
```

---

# 📍 1. KONDISI AWAL (SEBELUM STEP 4.1)

Sistem berada dalam kondisi:

## ❌ Behavior Tidak Deterministic

```text
- login kadang berhasil, kadang gagal
- redirect tidak konsisten
- error "User not found" padahal user ada
```

---

## ❌ Database Tidak Stabil

```text
- tabel tidak selalu exist
- seed gagal (no such table: users)
- lifecycle DB tidak jelas
```

---

## ❌ Debugging Sulit

```text
- tidak ada logging request
- tidak ada visibility layer-by-layer
- sulit trace flow request
```

---

## ❌ Architecture Belum Siap Refactor

```text
- masih ada legacy + modular + service layer campur
- belum aman untuk refactor besar
```

---

# 🧱 2. STRATEGI STEP 4.1

Pendekatan:

```text
✔ debugging layer by layer
✔ tidak langsung refactor
✔ perbaiki fondasi dulu
✔ observability > perubahan
```

---

# 🧩 3. SUB-STEPS YANG DILAKUKAN

---

# 🔹 Step 4.1.1 — CLI Debugging Foundation

## 🎯 Tujuan

```text
mendapatkan visibilitas penuh terhadap codebase
```

---

## 🔧 Tools yang digunakan

### Select-String (PowerShell grep)

```powershell
Select-String -Path "modules\auth\authRepository.js" -Pattern "findOne"
```

---

## ❌ Masalah awal

```powershell
Select-String modules\auth\authRepository.js "findOne"
```

Error:

```text
Cannot find path 'findOne'
```

---

## ✅ Fix

```powershell
Select-String -Path "modules\auth\authRepository.js" -Pattern "findOne"
```

---

## 🧠 Insight

```text
CLI debugging harus deterministic → selalu gunakan -Path & -Pattern
```

---

# 🔹 Step 4.1.2 — Full Codebase Scan

## 🎯 Tujuan

```text
memahami dependency & flow sistem
```

---

## 🔍 Scan dilakukan:

```powershell
Select-String -Path "modules\auth\*.js" -Pattern "loginUser"
Select-String -Path "modules\auth\*.js" -Pattern "findOne"
Select-String -Path "views\*.ejs" -Pattern "email"
```

---

## ✅ Hasil

```text
✔ mapping lengkap flow:
routes → controller → service → repository → model
✔ tahu semua entry point login
```

---

# 🔹 Step 4.1.3 — Root Cause Login Bug

---

## ❌ Problem

```text
Login selalu:
"User not found"
```

---

## 🔍 Debug Logging Ditambahkan

```js
console.log("LOGIN BODY:", req.body)
console.log("LOGIN EMAIL:", email)
console.log("DB USER:", user)
```

---

## 🔎 Temuan

```text
LOGIN EMAIL: admin@unand.ac.id
DB USER: null
```

---

## 🧠 Insight

```text
Problem bukan di controller/service
Problem di DATA LAYER (DB kosong / tidak sesuai)
```

---

# 🔹 Step 4.1.4 — Database Lifecycle Fix

---

## ❌ Error

```text
SQLITE_ERROR: no such table: users
```

---

## 🔍 Root Cause

```text
sequelize.sync() tidak dijalankan sebelum seed
```

---

## ✅ Fix

### Di seed-data.js:

```js
await sequelize.authenticate();
await sequelize.sync();
```

---

## ➕ Tambahan

Gunakan transaction:

```js
const transaction = await sequelize.transaction();
```

---

## ✅ Hasil

```text
✔ tabel selalu ada
✔ seed deterministic
✔ tidak ada race condition
```

---

# 🔹 Step 4.1.5 — Seed Data Stabilization

---

## 🎯 Tujuan

```text
menjadikan DB sebagai source of truth
```

---

## 🔐 Admin user dibuat:

```js
await Users.create({
  name: "Admin",
  email: "admin@unand.ac.id",
  password: await bcrypt.hash("12345", 10),
  role: "admin"
});
```

---

## ✅ Verifikasi

```powershell
sqlite3 database.sqlite "SELECT email FROM users;"
```

Output:

```text
admin@unand.ac.id
```

---

# 🔹 Step 4.1.6 — Login Flow Validation

---

## 🔍 Hasil setelah fix

```text
LOGIN EMAIL: admin@unand.ac.id
DB USER: Users { ... }
```

---

## ✅ Behavior

```text
✔ user ditemukan
✔ password match
✔ JWT dibuat
✔ redirect berhasil
```

---

# 🔹 Step 4.1.7 — Smoke Test Stabilization

---

## 🎯 Tujuan

```text
memastikan sistem tidak rusak saat refactor nanti
```

---

## 🧪 Command

```powershell
npm run smoke:test
```

---

## ✅ Result

```text
✔ Server health
✔ Login page
✔ Register endpoint
✔ Login endpoint
```

---

## 🧠 Insight

```text
Smoke test = safety net sebelum refactor besar
```

---

# 🔹 Step 4.1.8 — Server Observability

---

## 🔧 Ditambahkan

### 1. Route Printer

```js
printRoutes(app._router.stack);
```

---

### 2. Request Logger

```text
middleware/requestLogger.js
```

---

### 3. Health Endpoint

```js
GET /health
```

---

## ✅ Hasil

```text
✔ tahu semua route aktif
✔ tahu request flow
✔ mudah debug runtime
```

---

# 🧪 4. VALIDASI AKHIR STEP 4.1

---

## Sistem Stabil

```text
✔ login bekerja
✔ DB deterministic
✔ seed berhasil
✔ tidak ada crash
```

---

## Observability Ada

```text
✔ console logging
✔ route list
✔ health endpoint
```

---

## CLI Tools Aktif

```text
✔ Select-String debugging
✔ smoke test
✔ database CLI
```

---

# 🧠 5. DAMPAK STEP 4.1

---

## BEFORE

```text
❌ random bug
❌ DB tidak konsisten
❌ tidak bisa trace error
```

---

## AFTER

```text
✅ deterministic system
✅ reproducible state
✅ debug-friendly
```

---

# 🏁 6. STATUS AKHIR

```text
Phase 4 — Step 4.1

STATUS: ✅ COMPLETED
```

---

# 🚀 7. TRANSISI KE STEP 4.2

Step 4.1 menghasilkan:

```text
FOUNDATION READY FOR REFACTOR
```

Sehingga Step 4.2 bisa dilakukan dengan aman:

```text
✔ tanpa merusak sistem
✔ tanpa guessing
✔ dengan visibility penuh
```

---

# 🧩 8. FLOW BESAR TRANSFORMASI

```text
Step 4.1:
Stabilize System
        ↓
Step 4.2:
Refactor Architecture
```

---

# 🧠 PENUTUP (PRINCIPAL ENGINEER VIEW)

Step 4.1 adalah:

```text
THE MOST UNDERRATED BUT MOST CRITICAL PHASE
```

Karena tanpa ini:

```text
refactor = gambling
```

Dengan ini:

```text
refactor = deterministic engineering
```

---

