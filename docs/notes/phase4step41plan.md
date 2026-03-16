# Phase 4 — Step 4.1

## Architecture Baseline Stabilization

---

# 1. Objective

Step 4.1 adalah langkah pertama dari **Phase 4 Master Plan** yang bertujuan membuat **baseline arsitektur yang stabil dan deterministik** sebelum refactor lebih dalam dilakukan.

Fokus utama Step 4.1 adalah:

```text
menghilangkan ambiguitas struktur project
menghapus layer legacy
membuat boundary arsitektur jelas
menetapkan execution path tunggal
```

Step ini **tidak mengubah fitur aplikasi**.

Perubahan hanya pada **struktur dan clarity**.

---

# 2. Current Structural Problems

Audit struktur project menunjukkan beberapa masalah fundamental.

## 2.1 Duplicate Controller Layer

Project memiliki dua folder:

```text
controller/
controllers/
```

Contoh:

```text
controller/courses.js
controllers/coursesController.js
```

Hal ini menciptakan dua kemungkinan execution path:

```text
routes → controller
routes → controllers
```

yang menyebabkan debugging menjadi tidak deterministik.

---

## 2.2 Mixed Module Boundaries

Project memiliki tiga gaya modularisasi:

```text
controller/
controllers/
modules/
```

Namun hanya `modules/auth` yang benar-benar modular.

Hal ini menciptakan boundary yang tidak jelas antara:

```text
auth logic
business logic
route layer
```

---

## 2.3 Folder Redundancy

Beberapa folder bersifat legacy dan tidak digunakan oleh Express runtime:

```text
frontend/
template/
js/
img/
```

Sementara Express sebenarnya menggunakan:

```text
views/
public/
```

Ini menambah kompleksitas navigasi project.

---

# 3. Step 4.1 Refactor Scope

Refactor pada Step 4.1 hanya mencakup:

```text
folder structure cleanup
controller layer unification
legacy folder quarantine
execution path clarification
```

Tidak ada perubahan pada:

```text
routes
services
repositories
database
authentication logic
```

Blast radius:

```text
LOW
```

---

# 4. Target Structure After Step 4.1

Struktur target menjadi:

```text
config/
controllers/
middleware/
models/
repositories/
routes/
services/
modules/
scripts/
utils/
views/
public/
docs/
```

Legacy folder akan dipindahkan atau dihapus.

---

# 5. Controller Layer Unification

Semua controller harus berada pada:

```text
controllers/
```

Folder berikut akan **dihapus**:

```text
controller/
```

Mapping file:

```text
controller/courses.js
→ controllers/coursesController.js

controller/course_plan.js
→ controllers/coursePlanController.js
```

Jika terdapat logic unik di folder `controller/`, maka logic tersebut dipindahkan ke controller baru.

---

# 6. Legacy Frontend Quarantine

Folder berikut bukan bagian dari runtime Express:

```text
frontend/
template/
```

Keduanya kemungkinan merupakan artefak dari prototyping.

Pada Step 4.1 folder tersebut akan dipindahkan ke:

```text
legacy/frontend
legacy/template
```

Tujuannya:

```text
mengurangi noise pada root project
memisahkan artefak lama dari sistem aktif
```

---

# 7. Public Asset Standardization

Semua asset frontend runtime harus berada pada:

```text
public/
```

Folder berikut akan dipindahkan:

```text
img/ → public/images
js/ → public/js
```

Jika file sudah ada di public maka folder lama akan dihapus.

---

# 8. Execution Path Clarification

Execution path Express harus jelas:

```text
server.js
   ↓
routes/
   ↓
controllers/
   ↓
services/
   ↓
repositories/
   ↓
models/
```

Tidak boleh ada direct call:

```text
routes → models
routes → repositories
```

Namun enforcement layer ini akan dilakukan pada Step berikutnya.

---

# 9. Infrastructure Verification

Setelah refactor struktur dilakukan, sistem harus diverifikasi menggunakan CLI tools yang sudah ada.

### Route Listing

```powershell
node scripts/routes-list.js
```

### System Doctor

```powershell
node scripts/doctor.js
```

### Smoke Test

```powershell
npm run smoke:test
```

Jika semua berhasil maka baseline dianggap stabil.

---

# 10. Success Criteria

Step 4.1 dianggap selesai jika kondisi berikut tercapai:

```text
folder controller/ tidak ada lagi
controllers/ menjadi satu-satunya controller layer
folder frontend/ dan template/ dipindahkan ke legacy/
asset publik berada di public/
server tetap berjalan tanpa error
```

---

# 11. Expected Result

Setelah Step 4.1 selesai:

```text
project structure lebih bersih
execution path lebih jelas
debugging complexity berkurang
foundation siap untuk deeper refactor
```

Ini menjadi dasar untuk Step berikutnya dalam Phase 4.

---

# End of Step 4.1
