Berikut blueprint **clarity-first, deterministic, no-overengineering** untuk:

# 📘 Phase 4 — Step 4.3

# **Legacy System Cleanup (System Purification Phase)**

---

# 🎯 0. DEFINISI STEP 4.3

Step 4.3 adalah:

```text
“menghapus semua sisa masa lalu agar sistem menjadi clean, final, dan maintainable”
```

Ini bukan refactor lagi.
Ini adalah:

```text
🔥 PURIFICATION PHASE
```

---

# 📍 1. POSISI SAAT INI

Setelah Step 4.2:

```text
✔ Architecture sudah benar
✔ Auth sudah centralized
✔ Layer sudah enforced
✔ System stabil
```

Masalah yang tersisa:

```text
❌ masih ada legacy code
❌ masih ada folder tidak terpakai
❌ masih ada duplicate structure (backup, legacy)
❌ masih ada noise dalam project
```

---

# 🎯 2. OBJECTIVE STEP 4.3

```text
✔ remove dead code
✔ remove legacy structure
✔ reduce cognitive load
✔ enforce final architecture shape
✔ eliminate ambiguity
```

---

# 🧠 3. PRINCIPLES (WAJIB DIPATUHI)

---

## 3.1 Deterministic Cleanup

```text
DELETE hanya jika:
✔ tidak direference
✔ sudah digantikan
✔ sudah tervalidasi via CLI
```

---

## 3.2 No Blind Deletion

```text
❌ jangan delete berdasarkan feeling
✔ selalu gunakan grep / audit
```

---

## 3.3 Low Blast Radius

```text
hapus bertahap, bukan sekaligus
```

---

## 3.4 Always Validate

Setiap delete:

```powershell
node server.js
npm run smoke:test
```

---

# 🧩 4. SCOPE STEP 4.3

Step 4.3 dibagi menjadi:

```text
4.3.1 — Legacy Folder Removal
4.3.2 — Dead File Cleanup
4.3.3 — Unused Dependency Cleanup
4.3.4 — Structure Enforcement
4.3.5 — Final Sanity Audit
```

---

# 🔹 4.3.1 — Legacy Folder Removal

## 🎯 Target

Folder yang pasti legacy:

```text
legacy/
backup/
```

---

## 🔍 Audit

```powershell
Test-Path legacy
Test-Path backup
```

---

## ⚠️ Rule

```text
✔ hanya delete jika tidak dipakai runtime
```

---

## 🎯 Outcome

```text
✔ tidak ada shadow code
✔ tidak ada duplicate system
```

---

# 🔹 4.3.2 — Dead File Cleanup

---

## 🎯 Target

Folder mencurigakan:

```text
frontend/
template/
js/
img/
```

---

## 🔍 Audit

```powershell
Get-ChildItem -Recurse -Include *.js,*.ejs | Select-String "frontend"
Get-ChildItem -Recurse -Include *.js,*.ejs | Select-String "template"
```

---

## Rule

```text
✔ kalau tidak direference → delete
```

---

## Outcome

```text
✔ hanya code yang benar-benar dipakai tersisa
```

---

# 🔹 4.3.3 — Unused Dependency Cleanup

---

## 🎯 Tujuan

```text
hapus import / dependency tidak terpakai
```

---

## 🔍 Audit

```powershell
Get-ChildItem -Recurse -Include *.js | Select-String "require("
```

Lalu cek manual:

```text
apakah semua require dipakai?
```

---

## Outcome

```text
✔ no unused require
✔ no hidden dependency
```

---

# 🔹 4.3.4 — Structure Enforcement

---

## 🎯 Target Structure FINAL

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

---

## 🔍 Audit

```powershell
Get-ChildItem -Directory
```

---

## Rule

```text
❌ tidak boleh ada:
- controller/ (old)
- controllers duplicate
- random folders
```

---

## Outcome

```text
✔ clean mental model
✔ predictable navigation
```

---

# 🔹 4.3.5 — Final Sanity Audit

---

## 🎯 Tujuan

memastikan sistem:

```text
✔ benar-benar bersih
✔ tidak ada hidden issue
✔ siap production-level development
```

---

## 🔍 Checklist

### 1. Auth

```text
✔ hanya modules/auth
✔ tidak ada verifyToken
✔ tidak ada roleMiddleware
```

---

### 2. DB Access

```text
✔ hanya di repository
✔ service tidak akses model
✔ controller tidak akses model
```

---

### 3. Route

```text
✔ semua route pakai controller
✔ tidak ada inline logic
```

---

### 4. Logging

```text
✔ request logger aktif
✔ debug log tidak berlebihan
```

---

### 5. Smoke Test

```powershell
npm run smoke:test
```

---

## Outcome

```text
✔ zero ambiguity system
✔ deterministic behavior
✔ clean baseline for future development
```

---

# 🧪 5. VALIDATION STRATEGY

Setiap perubahan:

```powershell
node server.js
npm run smoke:test
```

Jika gagal:

```text
ROLLBACK langsung
```

---

# ⚠️ 6. ANTI-PATTERN YANG HARUS DIHINDARI

---

## ❌ Over-cleaning

```text
hapus file yang masih dipakai
```

---

## ❌ Batch delete tanpa audit

```text
langsung remove banyak folder
```

---

## ❌ Refactor ulang

```text
Step 4.3 bukan refactor
Step 4.3 = cleanup ONLY
```

---

# 🧠 7. DAMPAK STEP 4.3

---

## BEFORE

```text
system works but messy
```

---

## AFTER

```text
system is:
✔ clean
✔ minimal
✔ maintainable
✔ scalable
```

---

# 🏁 8. END STATE

Setelah Step 4.3:

```text
🔥 FINAL FORM ARCHITECTURE
```

---

# 🚀 9. TRANSISI BERIKUTNYA

Setelah ini, kamu siap masuk:

```text
Phase 5 — Feature Development / Scaling
```

tanpa:

```text
❌ tech debt
❌ architecture confusion
```

---

# 🧩 SUMMARY SINGKAT

```text
Step 4.1 → Stabilize system
Step 4.2 → Fix architecture
Step 4.3 → Clean everything

Result:
🔥 production-grade system
```

---

Kalau siap, kirim:

```text
Get-ChildItem -Directory
Test-Path legacy
Test-Path backup
```

Aku akan guide **Step 4.3.1 secara surgical (no mistake, no rollback needed)** 🚀

next plan:
🔥 Step 4.4 — Service normalization (remove stub → real logic)
🔥 Step 4.5 — Repository expansion
🔥 Step 4.6 — System-wide validation & cleanup

PHASE 5 — SCALING & FEATURE ENGINEERING