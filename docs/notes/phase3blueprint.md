# 🌐 PHASE 3 — FRONTEND INTEGRATION ROADMAP

Project:

```text
loki_a2-master
```

Goal utama Phase 3:

```text
Integrate legacy frontend with modular backend architecture
while introducing authentication, authorization, and API-driven UI.
```

Domain yang difokuskan pertama:

```text
Auth
(Admin, Dosen, Mahasiswa)
```

---

# 🧭 Target Arsitektur

Backend (sudah selesai Phase 2):

```
modules/
   auth/
      authRoutes
      authController
      authService
      authRepository
```

Frontend target:

```
frontend/
   js/
      apiClient.js
      auth.js
      authGuard.js
```

Flow sistem:

```
Frontend UI
     ↓
API Client
     ↓
Auth Module (backend)
     ↓
Service Layer
     ↓
Repository
     ↓
Database
```

---

# STEP 3.1

# Standardize Auth API Contract

## Problem

Response login saat ini:

```json
{ "token": "..." }
```

Frontend membutuhkan data user.

## Target response

```json
{
  "token": "...",
  "user": {
    "id": 1,
    "name": "Admin",
    "role": "admin"
  }
}
```

## File yang diubah

```
modules/auth/authService.js
modules/auth/authController.js
```

Tujuan:

```
frontend mengetahui role user
```

---

# STEP 3.2

# Frontend API Client Layer

Create:

```
frontend/js/apiClient.js
```

Tujuan:

```
centralized HTTP client
```

Contoh:

```javascript
const API_BASE = "http://localhost:8000";

export async function apiFetch(path, options = {}) {

  const token = localStorage.getItem("token");

  const res = await fetch(API_BASE + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  return res.json();
}
```

Manfaat:

```
avoid repeated fetch code
centralize auth headers
```

---

# STEP 3.3

# Auth Client Module

Create:

```
frontend/js/auth.js
```

Responsibilities:

```
login
logout
session storage
```

Example:

```javascript
import { apiFetch } from "./apiClient.js";

export async function login(email, password) {

  const data = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data.user;
}
```

---

# STEP 3.4

# Login Page Integration

File:

```
frontend/login.html
```

Tambahkan login handler:

```javascript
async function handleLogin() {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = await login(email, password);

  redirectByRole(user.role);
}
```

---

# STEP 3.5

# Role-Based Redirect

Create helper:

```
frontend/js/roleRedirect.js
```

Example:

```javascript
export function redirectByRole(role){

  if(role === "admin")
    window.location="/frontend/admin/index.html";

  if(role === "dosen")
    window.location="/frontend/dosen/index.html";

  if(role === "mahasiswa")
    window.location="/frontend/mahasiswa/home.html";

}
```

---

# STEP 3.6

# Frontend Auth Guard

Create:

```
frontend/js/authGuard.js
```

Purpose:

```
protect frontend pages
```

Example:

```javascript
export function requireAuth(){

  const token = localStorage.getItem("token");

  if(!token){
    window.location="/frontend/login.html";
  }

}
```

Use in pages:

```
admin/index.html
dosen/index.html
mahasiswa/home.html
```

---

# STEP 3.7

# Backend Current User Endpoint

Add endpoint:

```
GET /auth/me
```

Controller:

```
modules/auth/authController.js
```

Purpose:

```
frontend refresh session
```

Example response:

```json
{
  "id": 1,
  "name": "Admin",
  "role": "admin"
}
```

---

# STEP 3.8

# Session Persistence

Frontend logic:

```
restore login session
```

Script:

```javascript
const user = JSON.parse(localStorage.getItem("user"));

if(user){
  console.log("Logged in:", user.role);
}
```

Benefit:

```
no forced re-login after refresh
```

---

# STEP 3.9

# Logout Integration

Frontend logout:

```javascript
export function logout(){

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location="/frontend/login.html";
}
```

Backend endpoint:

```
GET /auth/logout
```

---

# STEP 3.10

# Role Middleware Integration

Backend routes harus dilindungi.

Example:

```
routes/admin.js
routes/dosen.js
routes/mahasiswa.js
```

Apply middleware:

```
verifyToken
roleMiddleware
```

Example:

```javascript
router.get(
  "/admin",
  verifyToken,
  requireRole("admin"),
  controller.dashboard
);
```

---

# Final Auth Flow

```
Login Page
     ↓
POST /auth/login
     ↓
JWT issued
     ↓
Frontend stores token
     ↓
authGuard protects pages
     ↓
role redirect
```

---

# Phase 3 Deliverables

Frontend capability setelah selesai:

```
JWT authentication
role-based routing
session persistence
auth guards
logout flow
```

---

# Impact terhadap System Architecture

Before:

```
Static frontend
server-rendered pages
```

After:

```
API-driven frontend
JWT authentication
role-aware UI
```

---

# Recommended Next Domain (Phase 3.2)

Setelah auth stabil:

Domain berikutnya:

```
CoursePlan
```

Integrasi:

```
frontend/dosen/*
frontend/admin/*
```

API:

```
GET /coursesPlan
POST /coursesPlan
PUT /coursesPlan
DELETE /coursesPlan
```

---

# Engineering Perspective

Dengan Phase 3 nanti sistem menjadi:

```
Modular Backend
+ API Client Frontend
+ Role-based Auth
```

Ini sudah mendekati arsitektur:

```
modern LMS / enterprise web system
```

---
