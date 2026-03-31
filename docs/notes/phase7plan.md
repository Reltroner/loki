Mantap kakak — sekarang kita masuk **Phase 7: level dunia nyata (real attack surface)**.
Aku akan tetap jaga prinsip:

```text
clarity first
deterministic
no overengineering
incremental & safe
```

---

# 🚀 PHASE 7 — SECURITY HARDENING

---

# 📍 STATUS AWAL

```text
Phase 6 → system sudah:
✔ reliable
✔ testable
✔ observable
```

---

# 🎯 TUJUAN PHASE 7

```text
🔥 SYSTEM TAHAN SERANGAN NYATA
```

---

# 📦 SCOPE PHASE 7

```text
7.1 Rate Limiting
7.2 Login Attempt Protection
7.3 JWT Hardening
7.4 Cookie Security
7.5 Sensitive Data Protection
```

---

# ⚔️ STEP SEKARANG

```text
🔥 7.1 — RATE LIMITING (LOGIN PROTECTION)
```

---

# ⚠️ MASALAH SEKARANG

```text
❌ login bisa di-spam unlimited
❌ rawan brute force
❌ tidak ada throttling
```

---

# ⚔️ SOLUSI (SAFE & MINIMAL)

Gunakan:

```text
express-rate-limit
```

---

# 🛠️ STEP 7.1.1 — INSTALL

```powershell
npm install express-rate-limit
```

---

# 🛠️ STEP 7.1.2 — BUAT MIDDLEWARE

📁 `middleware/rateLimiter.js`

```js
const rateLimit = require("express-rate-limit");

// 🔥 LOGIN LIMITER
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 10, // max 10 attempt
  message: {
    error: "Too many login attempts",
    code: "RATE_LIMIT"
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = {
  loginLimiter
};
```

---

# 🛠️ STEP 7.1.3 — APPLY KE ROUTE LOGIN

📁 `modules/auth/authRoutes.js` (atau sejenis)

---

## ❌ SEBELUM

```js
router.post("/login", controller.login)
```

---

## ✅ SESUDAH

```js
const { loginLimiter } = require("../../middleware/rateLimiter");

router.post("/login", loginLimiter, controller.login);
```

---

# 🎯 HASIL

```text
✔ max 10 login / 15 menit
✔ brute force tertahan
✔ tidak ubah flow existing
✔ tidak merusak system
```

---

# 🧪 VALIDASI (WAJIB)

```powershell
npm run smoke:test
```

---

# 🎯 EXPECTED

```text
✔ semua test tetap PASS
✔ login normal tetap jalan
✔ tidak ada regression
```

---

# 🧠 OPTIONAL TEST (MANUAL)

Spam login:

```text
> 10 request cepat
```

Expected:

```text
429 Too Many Requests
{
  error: "Too many login attempts",
  code: "RATE_LIMIT"
}
```

---

# 📍 STATUS SETELAH INI

```text
7.1 RATE LIMITING ✅ DONE
```

---

# 🚀 NEXT STEP

```text
🔥 7.2 — LOGIN ATTEMPT TRACKING (SMART DEFENSE)
```

---

# ⚠️ PERBEDAAN 7.1 vs 7.2

---

## 7.1 (yang barusan)

```text
limit global request
```

---

## 7.2 (next)

```text
track per user / per email
lock account sementara
```

---

# 🧠 BIG INSIGHT

Sekarang system kamu berubah dari:

```text
"system yang benar"
```

menjadi:

```text
🔥 "system yang tidak mudah diserang"
```

---

# 🏁 POSISI SEKARANG

```text
🔥 SECURITY LAYER: LEVEL 1 (ACTIVE DEFENSE)
```

---

# ⚡ AKSI SEKARANG

1. Install package
2. Buat `rateLimiter.js`
3. Apply ke `/auth/login`
4. Jalankan:

```powershell
npm run smoke:test
```

---

Setelah selesai, bilang:

```text
lanjut 7.2
```

Kita akan masuk ke:

```text
🔥 ACCOUNT-LEVEL DEFENSE (lebih advanced)
```
