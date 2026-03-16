# Phase 3 Part 4 — Authentication & Database Lifecycle Debugging

## 1. Context

Pada Phase 3 sebelumnya, sistem telah berhasil:

* menjalankan **SQLite + Sequelize**
* mengimplementasikan **Repository Layer**
* membuat **Admin Dashboard statistics**
* menjalankan **seed script**

Namun setelah stabilisasi database lifecycle (`db:reset → db:init → db:seed`), muncul masalah pada layer autentikasi:

```
User not found
```

ketika login melalui:

```
http://localhost:8000/auth/login
```

Walaupun user sudah ada di database.

---

# 2. Current System State

### Dashboard

Admin login sebelumnya pernah berhasil dan menampilkan:

```
Admin Dashboard
Total Courses: 1
Total Lecturers: 1
```

### Database Content

Query dari CLI:

```
sqlite3 database.sqlite "SELECT id,name,email FROM users;"
```

Output:

```
1 | Admin | admin@example.com
```

Artinya:

```
users table tidak kosong
```

Namun login tetap gagal.

---

# 3. Database Lifecycle Commands

Project menyediakan lifecycle command berikut:

### Reset Database

```
npm run db:reset
```

Script:

```
scripts/reset-db.js
```

Function:

```
delete database.sqlite
```

Namun terkadang muncul error:

```
EBUSY: resource busy or locked
```

### Root Cause

SQLite file sedang digunakan oleh:

```
node server.js
```

### Solution

Server harus dihentikan terlebih dahulu:

```
Ctrl + C
```

Kemudian jalankan kembali pipeline:

```
npm run db:reset
npm run db:init
npm run db:seed
```

---

# 4. Database Initialization

Command:

```
npm run db:init
```

Output:

```
Initializing SQLite database...
Database initialized successfully.
```

Script:

```
scripts/init-db.js
```

Function:

```
sequelize.sync()
```

yang membuat semua tabel dari model Sequelize.

---

# 5. Seed Script Behavior

Command:

```
npm run db:seed
```

Script:

```
scripts/seed-data.js
```

Seed membuat:

```
Curricula
Courses
Lecturers
CoursePlans
Users
```

Output:

```
Seed completed
```

Namun seed sekarang memiliki proteksi:

```
if (await Users.count() > 0) {
  console.log("Database already seeded");
  return;
}
```

Sehingga jika user sudah ada:

```
Database already seeded
```

---

# 6. Observed Login Behavior

Server log menunjukkan request berikut:

```
POST /auth/login
GET /auth/login
POST /auth/login
```

Namun tidak ada redirect ke:

```
/admin/dashboard
```

Sebaliknya halaman login kembali dengan pesan:

```
User not found
```

---

# 7. Authentication Layer Overview

Authentication berada pada modul:

```
modules/auth
```

Struktur:

```
authController.js
authService.js
authRepository.js
authRoutes.js
```

Flow login:

```
POST /auth/login
      ↓
authController.login()
      ↓
authService.loginUser()
      ↓
authRepository.findUserByEmail()
      ↓
Users.findOne()
```

Jika query tidak menemukan user:

```
throw Error("User not found")
```

---

# 8. Architecture Observations

Dari struktur project ditemukan beberapa **architecture inconsistencies**.

### 1. Duplicate Controller Layer

Project memiliki dua folder:

```
controller/
controllers/
```

Ini menunjukkan sistem berada dalam **transisi refactor**.

### 2. Mixed Architecture

Project menggunakan tiga pola sekaligus:

```
Legacy Controller Pattern
controller/

Refactored MVC Pattern
controllers/

Modular Pattern
modules/auth
```

Hal ini meningkatkan kompleksitas debugging.

### 3. Service Layer Inconsistency

Sebagian route menggunakan:

```
routes → controllers → models
```

Sebagian menggunakan:

```
routes → services → repositories → models
```

Ini membuat behaviour sistem tidak konsisten.

---

# 9. Confirmed Working Components

Berikut komponen yang telah diverifikasi bekerja:

| Layer                | Status |
| -------------------- | ------ |
| Environment          | OK     |
| SQLite CLI           | OK     |
| Sequelize Connection | OK     |
| Database Schema      | OK     |
| Seed Script          | OK     |
| Admin Dashboard      | OK     |
| Route Logging        | OK     |
| Smoke Test           | OK     |

---

# 10. Remaining Issue

Masalah yang tersisa hanya pada:

```
authentication layer
```

gejala:

```
User exists in database
but login returns "User not found"
```

Kemungkinan penyebab:

1. email mismatch (case sensitive)
2. authRepository query mismatch
3. model attribute mismatch
4. password hashing mismatch
5. role/type column mapping

---

# 11. Current Operational Pipeline

Database lifecycle yang stabil saat ini:

```
npm run db:reset
npm run db:init
npm run db:seed
node server.js
```

Login menggunakan:

```
admin@example.com
admin123
```

---

# 12. Phase 3 Part 4 Conclusion

Pada tahap ini:

```
Infrastructure layer sudah stabil
Database lifecycle sudah deterministic
Seed pipeline sudah berfungsi
Dashboard statistics sudah berjalan
```

Masalah yang tersisa terbatas pada:

```
Authentication query layer
```

yang akan dianalisis pada **Phase 3 Part 4**.

---

# End of Phase 3 Part 4
