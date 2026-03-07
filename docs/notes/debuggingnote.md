# 📘 DEBUGGING NOTE

## npm run erd:graph (Graphviz ERD Generator)

Project:

```text
loki_a2-master
```

Directory:

```text
C:\Projects\loki_a2-master
```

---

# 1️⃣ Tujuan Fitur

Menambahkan tooling CLI:

```bash
npm run erd:graph
```

untuk menghasilkan **diagram database otomatis**.

Output akhir yang diharapkan:

```text
database-erd.dot
database-erd.png
```

Lokasi target dokumentasi:

```text
docs/architecture/database-erd.png
```

---

# 2️⃣ Dependency yang Digunakan

Package installed:

```bash
npm install graphviz
```

Status install:

```text
added 2 packages
```

Catatan penting:

Package `graphviz` **tidak menyediakan binary `dot`**.

Binary `dot` berasal dari **Graphviz OS installation**.

---

# 3️⃣ Script yang Dibuat

File:

```text
scripts/erd-graph.js
```

Tujuan script:

1️⃣ membaca Sequelize models
2️⃣ membuat file Graphviz DOT
3️⃣ menghasilkan:

```text
database-erd.dot
```

Script menghasilkan log:

```text
✔ ERD DOT generated: database-erd.dot
Run: dot -Tpng database-erd.dot -o database-erd.png
```

---

# 4️⃣ Script Execution

Command:

```bash
npm run erd:graph
```

Output:

```text
✔ ERD DOT generated: database-erd.dot
Run: dot -Tpng database-erd.dot -o database-erd.png
```

---

# 5️⃣ Verifikasi File DOT

Command:

```powershell
dir *.dot
```

Output:

```text
database-erd.dot
Length: 1085
```

Kesimpulan:

DOT file **berhasil dibuat**.

---

# 6️⃣ Generate PNG Menggunakan Graphviz

Command yang digunakan:

```powershell
dot -Tpng database-erd.dot -o database-erd.png
```

Error yang muncul:

```text
dot : The term 'dot' is not recognized
```

Error type:

```text
CommandNotFoundException
```

Kesimpulan:

PowerShell **tidak mengenali Graphviz binary**.

---

# 7️⃣ Verifikasi Graphviz Installation

Graphviz dicek di Command Prompt.

Command:

```cmd
where dot
```

Output:

```text
C:\Program Files\Graphviz\bin\dot.exe
```

Verifikasi versi:

```cmd
dot -V
```

Output:

```text
dot - graphviz version 14.1.3
```

Kesimpulan:

Graphviz **terinstall dengan benar**.

---

# 8️⃣ Analisis Penyebab Error

Masalah **bukan pada project**.

Masalah berada pada:

```text
PowerShell PATH environment
```

PATH PowerShell diperiksa:

```powershell
$env:Path -split ";"
```

Output **tidak mengandung**:

```text
C:\Program Files\Graphviz\bin
```

Kesimpulan:

PowerShell session **tidak mengetahui lokasi Graphviz**.

---

# 9️⃣ Workaround yang Berhasil

PNG berhasil dibuat menggunakan **absolute path**.

Command:

```powershell
& "C:\Program Files\Graphviz\bin\dot.exe" `
-Tpng database-erd.dot `
-o database-erd.png
```

Verifikasi:

```powershell
dir database-erd.png
```

Output:

```text
database-erd.png
Length: 69481
```

Kesimpulan:

Graphviz **berfungsi dengan benar**.

---

# 🔟 Dokumentasi Diagram

File dipindahkan ke folder dokumentasi.

Command:

```powershell
mkdir docs
mkdir docs\architecture
move database-erd.png docs\architecture
```

Struktur repo:

```text
docs/
  architecture/
     database-erd.png
```

---

# 11️⃣ PATH Fix Attempt

Graphviz ditambahkan ke system PATH.

Command (PowerShell Admin):

```powershell
[Environment]::SetEnvironmentVariable(
"Path",
$env:Path + ";C:\Program Files\Graphviz\bin",
[EnvironmentVariableTarget]::Machine
)
```

PowerShell session kemudian diperiksa kembali.

---

# 12️⃣ PATH Verification

Command:

```powershell
$env:Path -split ";"
```

Output masih **tidak mengandung**:

```text
C:\Program Files\Graphviz\bin
```

Artinya:

```text
PowerShell session belum reload PATH
```

---

# 13️⃣ Verifikasi Command di PowerShell

Command:

```powershell
where dot
```

Output:

```text
(no result)
```

Command:

```powershell
dot -Tpng database-erd.dot -o database-erd.png
```

Error tetap:

```text
dot : The term 'dot' is not recognized
```

---

# 14️⃣ Kesimpulan Teknis

Status debugging saat ini:

### Berfungsi

✔ ERD generator script
✔ DOT file generation
✔ Graphviz installation
✔ PNG generation via absolute path

### Tidak berfungsi

```text
dot command di PowerShell
```

karena:

```text
Graphviz path tidak ada di PowerShell PATH
```

---

# 15️⃣ Solusi Yang Valid Saat Ini

Gunakan **absolute path execution**.

Command:

```powershell
& "C:\Program Files\Graphviz\bin\dot.exe" `
-Tpng database-erd.dot `
-o database-erd.png
```

Ini **100% berhasil**.

---

# 16️⃣ Perbaikan Permanen (Optional)

Tambahkan PATH:

```text
C:\Program Files\Graphviz\bin
```

ke:

```text
Windows Environment Variables
```

lalu restart terminal.

---

# 17️⃣ State Project Saat Ini

ERD system sudah berfungsi.

Artifacts:

```text
database-erd.dot
docs/architecture/database-erd.png
```

Toolchain yang terkait:

```bash
npm run erd
npm run erd:graph
```

---

# 18️⃣ Risiko yang Tidak Ada

Masalah **tidak berasal dari**:

```text
Node.js
npm
Sequelize
ERD generator script
```

Masalah hanya:

```text
PowerShell environment PATH
```

---

# 19️⃣ Status Debugging

```text
ERD generator: WORKING
Graphviz installation: WORKING
PowerShell PATH: MISCONFIGURED
```

Workaround sudah tersedia.

---

