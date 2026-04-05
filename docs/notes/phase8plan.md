# 🚀 PHASE 8 — UI/UX FOUNDATION (NON-DESTRUCTIVE)

---

# 0. DEFINITION

## 🎯 Tujuan Phase 8

Mengubah system dari:

```text
backend system (engine)
```

menjadi:

```text
usable system (entry-level product)
```

---

## ⚠️ Constraint Utama (NON-NEGOTIABLE)

```text
❌ tidak mengubah core logic
❌ tidak menyentuh service / repository / DB
❌ tidak mengubah security behavior
❌ tidak mengubah API contract
```

```text
✔ hanya presentation layer
✔ routing behavior (non-breaking)
✔ controller (view logic only)
✔ EJS templates
```

---

## 🧠 Filosofi

```text
Phase 4–7 = system correctness
Phase 8   = system usability
```

---

# 1. PROBLEM STATEMENT (CURRENT STATE)

---

## ❌ Kondisi sekarang

```text
GET / → 401 Unauthorized
```

---

## ❌ Dampak

```text
❌ first impression buruk
❌ tidak ada onboarding flow
❌ user journey tidak ada
❌ system terasa “rusak” padahal benar
```

---

## 🧠 Root Problem

```text
system tidak punya entry layer
```

---

# 2. TARGET STATE (EXPLICIT & FINAL)

---

## 🎯 ENTRY FLOW

### GUEST USER

```text
GET /
→ landing page (public)
```

---

### AUTHENTICATED USER

```text
GET /
→ redirect /dashboard
```

---

## 🎯 DASHBOARD FLOW

```text
GET /dashboard
→ protected (authenticate)
→ role-based redirect
```

---

## 🎯 LOGIN FLOW

```text
login success → /dashboard
```

---

## 🎯 ERROR FLOW

```text
401 hanya untuk protected route
❌ bukan entry point
```

---

# 3. ARCHITECTURE RULE (VERY IMPORTANT)

---

## 🔒 Layer Boundary

```text
UI Layer = VIEW + ROUTING ONLY
```

---

## ❌ Dilarang

```text
controller → DB access
view → business logic
UI → auth logic modification
```

---

## ✅ Diizinkan

```text
controller → decide render / redirect
view → display only
route → entry flow control
```

---

# 4. IMPLEMENTATION PLAN (STEP-BY-STEP)

---

# 🔥 STEP 8.1 — PUBLIC ENTRY POINT

---

## 🎯 Goal

```text
"/" tidak boleh protected
```

---

## ✅ FINAL IMPLEMENTATION

```js
app.get("/", (req, res) => {

  const hasToken = !!req.cookies?.jwt;

  if (!hasToken) {
    return res.render("landing");
  }

  return res.redirect("/dashboard");
});
```

---

## 🧠 Behavior Matrix

| State      | Result             |
| ---------- | ------------------ |
| no cookie  | landing page       |
| has cookie | redirect dashboard |

---

## 🎯 Result

```text
✔ no more 401 as first impression
✔ clear entry layer
```

---

# 🔥 STEP 8.2 — DASHBOARD ROUTE (CENTRALIZED)

---

## 🎯 Goal

```text
single source of post-login routing
```

---

## ✅ IMPLEMENTATION

```js
app.get("/dashboard", authenticate, (req, res) => {

  const role = req.user.role;

  if (role === "admin") {
    return res.redirect("/admin/dashboard");
  }

  if (role === "dosen") {
    return res.redirect(`/dosen/${req.user.id}/courses`);
  }

  if (role === "mahasiswa") {
    return res.redirect("/mahasiswa/home");
  }

  return res.render("home");
});
```

---

## 🧠 Why this matters

```text
✔ remove duplication from controller
✔ deterministic navigation
✔ single routing brain
```

---

# 🔥 STEP 8.3 — LOGIN FLOW NORMALIZATION

---

## 🎯 Goal

```text
semua login redirect ke /dashboard
```

---

## ✅ UPDATE

```js
return res.redirect("/dashboard");
```

---

## ❌ REMOVE

```text
role-based redirect di controller
```

---

## 🧠 Reason

```text
routing logic ≠ controller responsibility
```

---

# 🔥 STEP 8.4 — LANDING PAGE (MINIMAL UI)

---

## 📁 views/landing.ejs

```html
<!DOCTYPE html>
<html>
<head>
  <title>RPS Management System</title>
</head>
<body>

  <h1>RPS Management System</h1>

  <p>Centralized Academic Course Plan Platform</p>

  <a href="/auth/login">Login</a>
  <a href="/auth/register">Register</a>

</body>
</html>
```

---

## 🎯 Rule

```text
✔ static
✔ no logic
✔ clear CTA
```

---

# 🔥 STEP 8.5 — OPTIONAL UX IMPROVEMENT (SAFE)

---

## Auto redirect

```js
if (req.cookies?.jwt) {
  return res.redirect("/dashboard");
}
```

---

# 5. VALIDATION (MANDATORY)

---

## 🧪 MANUAL FLOW

```text
1. open "/"
→ landing

2. click login
→ works

3. login success
→ /dashboard

4. access /dashboard without login
→ 401
```

---

## 🧪 AUTOMATION

```bash
npm run smoke:test
```

---

## 🎯 EXPECTATION

```text
✔ ALL PASS
✔ zero regression
```

---

# 6. BLAST RADIUS (FINAL CONFIRMATION)

---

## 🟢 SAFE ZONE

```text
✔ views/
✔ controller render logic
✔ root route
✔ dashboard route
```

---

## 🔴 UNTOUCHED

```text
✔ services
✔ repositories
✔ DB
✔ auth system
✔ JWT
✔ rate limiting
✔ security layer
```

---

# 7. RESULT STATE

---

## BEFORE

```text
"/" → 401
no entry flow
no UX
```

---

## AFTER

```text
"/" → landing
clear entry
login → dashboard
usable system
```

---

# 8. SYSTEM LEVEL UPGRADE

---

```text
FROM:
secure backend system

TO:
usable product foundation
```

---

# 9. NEXT PHASE (CLEAR PATH)

---

## 🔜 PHASE 8.1 (UI SYSTEM)

```text
✔ layout system (header/footer)
✔ navigation consistency
✔ reusable EJS partials
```

---

## 🔜 PHASE 9

```text
🔥 PRODUCTION READINESS
```

---

# 🧠 FINAL INSIGHT

Ini bukan sekadar:

```text
“nambah landing page”
```

Ini adalah:

```text
🔥 membangun ENTRY LAYER dalam sistem
```

---

🔧 OPSI B (PERFECT CLEAN)
❌ ../fonts/montserrat/...
✅ /fonts/montserrat/...

Dan buat:

public/fonts/montserrat/*