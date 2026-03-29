Siap kakak — ini aku dokumentasikan **PHASE 6 end-to-end** dengan prinsip:

```text
✔ clarity first
✔ deterministic
✔ tanpa gap
✔ tanpa overengineering
✔ bisa di-replay dari awal
```

---

# 🚀 PHASE 6 — RELIABILITY & AUTOMATION (FINAL DOCUMENTATION)

---

# 🎯 0. DEFINISI PHASE 6

```text
PHASE 5 → system sudah benar (functionally working)
PHASE 6 → system harus:

✔ predictable
✔ testable
✔ observable
✔ stable terhadap error
```

---

# 🧠 GOAL UTAMA

```text
🔥 SYSTEM YANG BISA DIPERCAYA
```

---

# 📦 SCOPE PHASE 6

```text
6.1 Auth Hardening
6.2 Request Validation
6.3 Error System (Deterministic)
6.4 Edge Case Mapping
6.5 Automation Testing
6.6 Observability (Logging)
```

---

# ⚔️ 6.1 — AUTH HARDENING

---

## 🎯 TUJUAN

```text
✔ semua request auth predictable
✔ tidak ada silent failure
✔ semua error auth = jelas
```

---

## 🛠️ IMPLEMENTASI

### middleware/authenticate.js

```js
const token = req.cookies?.jwt;

if (!token) {
  return res.status(401).render("err401");
}

try {
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  req.user = decoded;
  next();
} catch (err) {
  return res.status(401).render("err401");
}
```

---

## ✅ HASIL

```text
✔ no token → 401
✔ invalid token → 401
✔ expired token → 401
✔ valid → next()
```

---

# ⚔️ 6.2 — REQUEST VALIDATION

---

## 🎯 TUJUAN

```text
✔ tidak ada input liar masuk ke system
✔ semua input tervalidasi di controller
```

---

## 🛠️ IMPLEMENTASI

---

### LOGIN

```js
if (!email || typeof email !== "string") {
  return res.status(400).render("login", { error: "Invalid email" });
}

if (!password || typeof password !== "string") {
  return res.status(400).render("login", { error: "Invalid password" });
}
```

---

### REGISTER

```js
if (!name || typeof name !== "string") {
  return res.status(400).json({ error: "Invalid name" });
}

if (!email || typeof email !== "string") {
  return res.status(400).json({ error: "Invalid email" });
}

if (!password || typeof password !== "string") {
  return res.status(400).json({ error: "Invalid password" });
}
```

---

## ✅ HASIL

```text
✔ invalid input → 400
✔ tidak ada data liar ke service
✔ behavior deterministic
```

---

# ⚔️ 6.3 — ERROR SYSTEM (DETERMINISTIC)

---

## 🎯 TUJUAN

```text
✔ semua error punya struktur
✔ semua error bisa dipetakan
✔ tidak ada error random
```

---

## 🔹 6.3.1 Controller Error Structure

```js
return res.status(500).json({
  error: err.message,
  code: "REGISTER_FAILED",
  path: req.path
});
```

---

## 🔹 6.3.2 Service Error Normalization

```js
const error = new Error("DATA_REQUIRED");
error.code = "DATA_REQUIRED";
throw error;
```

---

## 🔹 6.3.3 Controller Error Mapping

```js
let status = 500;

if (err.code === "DATA_REQUIRED" || err.code === "INVALID_PARAMS") {
  status = 400;
}

return res.status(status).json({
  error: err.message,
  code: err.code || "REGISTER_FAILED",
  path: req.path
});
```

---

## ✅ HASIL

```text
✔ error punya identity (code)
✔ controller mengerti error
✔ response predictable
```

---

# ⚔️ 6.4 — EDGE CASE MAPPING

---

## 🎯 TUJUAN

```text
✔ semua kemungkinan failure didefinisikan
✔ tidak ada “unknown behavior”
```

---

## 📊 AUTH

```text
no token        → 401
invalid token   → 401
expired token   → 401
```

---

## 📊 LOGIN

```text
email kosong    → 400
password kosong → 400
user tidak ada  → 401
password salah  → 401
```

---

## 📊 REGISTER

```text
field kosong    → 400
type salah      → 400
duplicate email → (future → 409)
```

---

## ✅ HASIL

```text
✔ semua flow predictable
✔ siap automation test
```

---

# ⚔️ 6.5 — AUTOMATION TEST

---

## 🎯 TUJUAN

```text
🔥 HAPUS TEST MANUAL
```

---

## 🛠️ IMPLEMENTASI

### scripts/smoke-test.js

---

## ✅ SCENARIO

```text
✔ Server health
✔ Login page
✔ Login success
✔ Login wrong password → 401
✔ Login missing email → 400
✔ Register invalid → 400
✔ Register success
```

---

## 🔹 PATTERN (AXIOS)

```js
try {
  await axios.post(...)
  throw new Error("Expected 400")
} catch (err) {
  if (err.response?.status !== 400) {
    throw new Error("Expected 400")
  }
}
```

---

## ✅ HASIL

```text
✔ semua test PASS
✔ behavior terverifikasi otomatis
✔ tidak perlu manual testing
```

---

# ⚔️ 6.6 — OBSERVABILITY (LOGGING)

---

## 🎯 TUJUAN

```text
✔ system bisa dianalisa
✔ tidak debugging dengan tebak-tebakan
```

---

## 🛠️ IMPLEMENTASI

### middleware/requestLogger.js

```js
module.exports = (req, res, next) => {

  const start = Date.now();

  res.on("finish", () => {
    console.log({
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      duration: `${Date.now() - start}ms`,
      user: req.user?.id || null
    });
  });

  next();
};
```

---

## 🧹 CLEANUP

```text
❌ hapus semua console.log debug
✔ hanya sisakan structured log
✔ gunakan console.error untuk error penting
```

---

## ✅ HASIL

```text
✔ semua request tercatat
✔ ada status
✔ ada durasi
✔ tidak noisy
✔ production mindset
```

---

# 🏁 FINAL SYSTEM STATE (SETELAH PHASE 6)

---

## ❌ BEFORE

```text
✔ system jalan
❌ error tidak jelas
❌ test manual
❌ sulit debug
❌ tidak predictable
```

---

## ✅ AFTER

```text
✔ system deterministic
✔ error structured
✔ input tervalidasi
✔ automation test tersedia
✔ log bisa dianalisa
✔ tidak ada silent failure
```

---

# 🧠 SYSTEM CAPABILITY

```text
✔ reliable
✔ testable
✔ observable
✔ stable
```

---

# 🏆 LEVEL YANG DICAPAI

```text
🔥 PRODUCTION-READY FOUNDATION
```

---

# 🚀 TRANSISI

```text
Phase 5 → “system bisa jalan”
Phase 6 → 🔥 “system bisa dipercaya”
```

---

# ⚠️ RULE GLOBAL (YANG KAMU SUDAH IKUTI)

```text
✔ tidak overengineering
✔ perubahan incremental
✔ selalu test setelah perubahan
✔ tidak merusak existing flow
✔ deterministic setiap step
```

---

# 🚀 NEXT PHASE

```text
🔥 PHASE 7 — SECURITY HARDENING
```

---

## ISI

```text
7.1 Rate limiting
7.2 Brute force protection
7.3 JWT hardening
7.4 Cookie security
7.5 Data protection
```

---

# 🧠 BIG INSIGHT FINAL

Yang kamu bangun bukan:

```text
“backend yang jalan”
```

tapi:

```text
🔥 SYSTEM YANG:
- bisa diuji
- bisa diprediksi
- bisa dianalisa
- bisa dipercaya
```

---

Kalau kamu siap lanjut:

```text
lanjut phase 7
```

kita akan masuk ke:

```text
🔥 REAL SECURITY ENGINEERING (LEVEL NEXT)
```
