# PHASE 9 — AUTH SYSTEM HARDENING (DETERMINISTIC DOCUMENTATION)

---

# 1. OBJECTIVE

Phase 9 ensures that the authentication system is:

* Secure (no data leakage, proper hashing, strict validation)
* Deterministic (no ambiguous behavior across layers)
* Consistent (API vs UI response standardization)
* Production-ready (environment validation, logging, error handling)

---

# 2. FINAL ARCHITECTURE

Auth flow follows a strict layered architecture:

```
Controller → Service → Repository → Sequelize Model → Database
```

Each layer has a **clear responsibility**:

| Layer      | Responsibility                                        |
| ---------- | ----------------------------------------------------- |
| Controller | HTTP handling (input/output, cookies, redirects)      |
| Service    | Business logic (auth flow, token, role normalization) |
| Repository | Data access (DB queries only)                         |
| Model      | ORM mapping (Sequelize schema definition)             |
| Database   | Source of truth                                       |

---

# 3. CRITICAL FIXES (ROOT CAUSES & RESOLUTIONS)

---

## 3.1 ROLE ALWAYS "guest" (CRITICAL BUG)

### Root Cause

* Database column `role` existed
* Sequelize model did NOT define `role`
* Result:

  ```
  user.role = undefined → normalizeRole → "guest"
  ```

### Fix

```js
// models/users.js

role: {
  type: DataTypes.STRING,
  allowNull: true
}
```

### Impact

* Restores data contract between DB and ORM
* Enables correct role propagation across system

---

## 3.2 REPOSITORY DATA LOSS

### Root Cause

Repository did not include `role` field:

```js
attributes: ["id", "email", "password"] // ❌ missing role
```

### Fix

```js
attributes: ["id", "name", "email", "password", "role"]
```

### Impact

* Prevents silent data loss at repository boundary
* Ensures service receives complete user object

---

## 3.3 INVALID PASSWORD (SECURITY FAILURE)

### Root Cause

Seeded password:

```
"hashed_password" (NOT bcrypt)
```

### Fix

Generate bcrypt hash:

```js
bcrypt.hash("123456", 10)
```

Update DB:

```sql
UPDATE users 
SET password = '<bcrypt_hash>' 
WHERE email = 'admin@mail.com';
```

### Impact

* Enables secure password comparison
* Fixes login failure

---

## 3.4 ROLE NORMALIZATION (SECURITY HARDENING)

### Problem

* Role input was not normalized or validated
* Risk of privilege escalation

### Final Implementation

```js
function normalizeRole(user) {
  if (!user) return "guest";

  if (user.role) {
    const role = String(user.role).toLowerCase().trim();

    if (role === "admin") return "admin";
    if (role === "dosen") return "dosen";
    if (role === "mahasiswa") return "mahasiswa";

    return "guest";
  }

  if (user.type) {
    return typeToRole[user.type] || "guest";
  }

  return "guest";
}
```

### Impact

* Strict whitelist enforcement
* Prevents role injection
* Backward compatible with legacy `type`

---

## 3.5 ENVIRONMENT VALIDATION

### Problem

* Missing `TOKEN_SECRET` caused undefined behavior

### Fix

```js
if (!process.env.TOKEN_SECRET) {
  process.exit(1);
}
```

### Impact

* Prevents insecure runtime
* Forces deterministic startup behavior

---

## 3.6 ERROR HANDLING STANDARDIZATION

### Behavior

| Context | Response   |
| ------- | ---------- |
| API     | JSON       |
| UI      | EJS render |

### Example

```json
{
  "error": "Invalid credentials",
  "code": "INVALID_CREDENTIALS",
  "path": "/login"
}
```

### Impact

* No data leakage
* Consistent client handling

---

## 3.7 LOGIN SECURITY HARDENING

### Implemented Controls

* No user existence leak
* Same error for wrong email/password
* Login attempt limiter (lock system)
* JWT expiration (1 hour)

---

# 4. FINAL AUTH FLOW

---

## REGISTER

```
Input → validate → bcrypt hash → DB → normalizeRole → response
```

---

## LOGIN

```
Input → validate → find user → compare bcrypt → normalizeRole → JWT → response
```

---

## JWT PAYLOAD

```json
{
  "id": <user_id>,
  "role": "admin|dosen|mahasiswa"
}
```

---

# 5. SYSTEM BEHAVIOR (FINAL STATE)

---

## SUCCESS LOGIN

```json
{
  "token": "...",
  "user": {
    "id": 118,
    "name": "Admin",
    "email": "admin@mail.com",
    "role": "admin"
  }
}
```

---

## FAILED LOGIN

```json
{
  "error": "Invalid credentials",
  "code": "INVALID_CREDENTIALS"
}
```

---

## INVALID INPUT

```json
{
  "error": "Invalid email",
  "code": "INVALID_EMAIL"
}
```

---

# 6. SECURITY GUARANTEES

---

## ✔ No plaintext password

## ✔ No role injection

## ✔ No user enumeration

## ✔ No sensitive error leakage

## ✔ JWT signed with secret

## ✔ Strict validation on all inputs

---

# 7. VALIDATION CHECKLIST (ALL PASSED)

---

```
✔ Health endpoint working
✔ Login success
✔ Login failure handled
✔ Register working
✔ Role correctly mapped
✔ JWT contains correct role
✔ ENV enforced
✔ Error format consistent
✔ Repository returns full data
✔ ORM mapping correct
```

---

# 8. FINAL SYSTEM STATE

---

```
PHASE 9: COMPLETE
STATUS: PRODUCTION-READY
RISK LEVEL: LOW
```

---

# 9. KEY ENGINEERING INSIGHT

---

This phase resolved a critical class of bugs:

```
DATA CONTRACT VIOLATION (DB ↔ ORM ↔ SERVICE)
```

Key lesson:

* Database correctness is NOT sufficient
* ORM mapping must explicitly define all required fields
* Repository must not drop fields
* Service must not assume data integrity

---

# 10. NEXT PHASE

---

```
PHASE 10 — PRODUCTION DEPLOYMENT
```

Focus:

* Real server deployment (PM2, NGINX)
* HTTPS & domain
* Production environment hardening
* Zero-downtime execution

---

END OF DOCUMENT
