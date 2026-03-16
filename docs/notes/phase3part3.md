# Phase 3 Part 3 — Database Determinism, Seeding, and Infrastructure Stabilization

## 1. Context

Pada akhir **Phase 3 Part 2**, sistem backend sudah mencapai kondisi berikut:

* Express server dapat berjalan
* Sequelize terhubung dengan SQLite
* Repository layer mulai digunakan
* Admin dashboard dapat memuat statistik dasar

Namun selama pengujian ditemukan beberapa masalah penting:

1. **Dashboard menampilkan nilai 0** karena database kosong
2. **Seed data tidak tersedia**
3. **SQLite CLI belum terinstall**
4. **Database lifecycle tidak deterministic**
5. **Route parameter collision pada `routes/dosen.js`**
6. **Environment debugging menjadi berulang (loop debugging)**

Phase ini berfokus pada stabilisasi **database lifecycle** dan **infrastructure debugging workflow**.

---

# 2. Installing SQLite CLI for Debugging

Untuk memungkinkan inspeksi database secara langsung, dilakukan instalasi SQLite CLI melalui PowerShell.

Command:

```powershell
winget install SQLite.SQLite
```

Verifikasi:

```powershell
sqlite3 --version
```

Output:

```text
3.52.x
```

Setelah CLI tersedia, debugging database dapat dilakukan langsung dari terminal.

---

# 3. Database Inspection

Database awal ternyata **kosong**.

Verifikasi menggunakan:

```powershell
sqlite3 database.sqlite "SELECT COUNT(*) FROM courses;"
sqlite3 database.sqlite "SELECT COUNT(*) FROM lecturers;"
sqlite3 database.sqlite "SELECT COUNT(*) FROM course_plans;"
```

Output:

```text
courses = 0
lecturers = 0
course_plans = 0
```

Ini menjelaskan mengapa dashboard menampilkan:

```text
Total Courses: 0
Total Lecturers: 0
```

---

# 4. Database Schema Inspection

Struktur tabel diperiksa menggunakan:

```powershell
sqlite3 database.sqlite ".schema courses"
sqlite3 database.sqlite ".schema lecturers"
sqlite3 database.sqlite ".schema course_plans"
```

dan:

```powershell
sqlite3 database.sqlite "PRAGMA table_info(courses);"
sqlite3 database.sqlite "PRAGMA table_info(lecturers);"
```

Hasilnya menunjukkan bahwa beberapa kolom memiliki constraint:

```text
NOT NULL
FOREIGN KEY
```

Contoh pada tabel `curricula`:

```text
name
active
year_start
year_end
description
```

Semua kolom tersebut **wajib diisi**.

---

# 5. Manual Data Injection for Initial Testing

Sebelum seed script tersedia, beberapa data dimasukkan secara manual menggunakan SQLite CLI.

Contoh:

```powershell
sqlite3 database.sqlite "
INSERT INTO courses (curriculum_id, code, name, alias_name)
VALUES (1,'CS101','Introduction to Computer Science','Intro CS');
"
```

dan:

```powershell
sqlite3 database.sqlite "
INSERT INTO lecturers
(name,reg_id,phone,status,created_at,updated_at)
VALUES ('Dr. Ahmad','REG001','08123456789',1,datetime('now'),datetime('now'));
"
```

Setelah data dimasukkan, dashboard mulai menampilkan nilai yang benar.

---

# 6. Implementing Seed Script

Untuk menghindari manual insert di masa depan dibuat script:

```text
scripts/seed-data.js
```

Seed ini membuat:

```text
Curricula
Courses
Lecturers
CoursePlans
Users
```

Struktur dasar seed:

```javascript
await Curricula.create(...)
await Courses.create(...)
await Lecturers.create(...)
await CoursePlans.create(...)
await Users.create(...)
```

Seed script juga menambahkan proteksi:

```javascript
if (await Users.count() > 0) {
  console.log("Database already seeded");
  return;
}
```

Tujuannya mencegah **duplicate seed**.

---

# 7. Database Lifecycle Scripts

Untuk membuat sistem deterministik ditambahkan beberapa script.

### Reset Database

```text
scripts/reset-db.js
```

Function:

```text
delete database.sqlite
```

Command:

```powershell
npm run db:reset
```

---

### Initialize Database

```text
scripts/init-db.js
```

Function:

```text
sequelize.sync()
```

Command:

```powershell
npm run db:init
```

---

### Seed Database

```text
scripts/seed-data.js
```

Command:

```powershell
npm run db:seed
```

---

# 8. Deterministic Database Pipeline

Setelah stabilisasi, lifecycle database menjadi:

```text
npm run db:reset
npm run db:init
npm run db:seed
node server.js
```

Pipeline ini memastikan database selalu berada pada kondisi yang konsisten.

---

# 9. Route Collision Bug Discovery

Selama audit route ditemukan bug pada:

```text
routes/dosen.js
```

Contoh route:

```text
/:id/:rev/edit-cpmk/:id
```

Masalah:

Express hanya mempertahankan **parameter terakhir**.

Akibatnya:

```text
req.params.id
```

tidak lagi berisi `course id`.

Solusi:

Mengganti parameter menjadi unik.

Contoh:

```text
/:coursePlanId/:rev/edit-cpmk/:cpmkId
```

Perubahan ini menghilangkan **parameter shadowing bug**.

---

# 10. Infrastructure Debugging Tools

Project menyediakan beberapa script diagnostik.

### System Doctor

```powershell
node scripts/doctor.js
```

Fungsi:

```text
check TOKEN_SECRET
check database connection
detect tables
```

---

### Smoke Test

```powershell
npm run smoke:test
```

Memverifikasi:

```text
server health
login endpoint
register endpoint
```

---

### Route Listing

```powershell
node scripts/routes-list.js
```

Digunakan untuk melihat semua endpoint yang terdaftar.

---

# 11. Infrastructure Stability Result

Setelah Phase 2.5 selesai, komponen berikut telah diverifikasi:

| Layer                     | Status |
| ------------------------- | ------ |
| Environment               | OK     |
| SQLite CLI                | OK     |
| Sequelize connection      | OK     |
| Database schema           | OK     |
| Seed pipeline             | OK     |
| Admin dashboard           | OK     |
| Route parameter collision | Fixed  |

---

# 12. Phase 2.5 Outcome

Phase ini berhasil:

1. Menghilangkan **manual database debugging**
2. Membuat **database lifecycle deterministic**
3. Menambahkan **seed pipeline**
4. Mengaktifkan **SQLite CLI debugging**
5. Memperbaiki **route parameter collision**
6. Menyiapkan **diagnostic scripts**

Dengan demikian sistem siap untuk masuk ke fase berikutnya:

```text
Phase 3 Part 3
Authentication & Database Lifecycle Debugging
```

yang berfokus pada analisis layer autentikasi.

---

# End of Phase 3 Part 3
