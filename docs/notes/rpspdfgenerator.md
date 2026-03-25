Siap kakak—kita bikin ini **step-by-step, deterministic, minim distraksi**, dan **langsung nempel ke arsitektur kamu sekarang** (Route → Controller → Service → Repository → Model).

Tujuan kita:

```text
RPS data → formatted → PDF → siap download / print
```

Tanpa ubah fondasi sistem kamu.

---

# 🧠 0. Prinsip implementasi (biar gak melenceng)

Kita jaga 4 hal:

```text
1. tidak ubah flow existing
2. hanya tambah layer output
3. reusable dari service existing
4. 1 endpoint = 1 responsibility
```

---

# 🧭 1. Tentukan scope (jangan overbuild)

## 🎯 MVP versi pertama:

PDF berisi:

```text
- Course info
- Lecturer
- CPL → CPMK mapping
- Weekly plan (Plan Details)
- Assessment
```

❌ jangan dulu:

* styling kompleks
* export banyak format
* multi template

---

# ⚙️ 2. Install dependency (ringan & stabil)

Pilih salah satu:

## ✅ Rekomendasi (deterministic + simple):

```bash
npm install pdfkit
```

Alternatif (kalau mau HTML render):

```bash
npm install puppeteer
```

➡️ Tapi untuk kamu:

```text
pdfkit lebih cocok (lebih deterministic, no browser overhead)
```

---

# 🧩 3. Struktur folder (tetap clean)

Tambahkan:

```text
services/pdf/
    rpsPdf.service.js

utils/
    pdfBuilder.js
```

---

# 🧠 4. Flow arsitektur (HARUS dijaga)

```text
Route
→ Controller
→ Service (RPS aggregation)
→ Service (PDF builder)
→ response (stream/download)
```

---

# ⚙️ 5. Step-by-step implementasi

---

## 🥇 Step 1 — Buat Service Aggregator (ambil data RPS)

File:

```bash
services/rpsAggregation.service.js
```

---

### Tujuan:

Gabungkan semua data jadi 1 object clean

---

### Contoh:

```js
async function getFullRpsData(courseId) {
  const course = await courseRepository.findById(courseId);
  const lecturer = await lecturerRepository.findByCourse(courseId);
  const plans = await planRepository.findByCourse(courseId);
  const assessments = await assessmentRepository.findByCourse(courseId);
  const cpl = await cplRepository.findAll();
  const cpmk = await cpmkRepository.findByCourse(courseId);

  return {
    course,
    lecturer,
    plans,
    assessments,
    cpl,
    cpmk
  };
}
```

---

## 🥈 Step 2 — Buat PDF Builder (core logic)

File:

```bash
utils/pdfBuilder.js
```

---

### Basic structure:

```js
const PDFDocument = require('pdfkit');

function buildRpsPdf(data, stream) {
  const doc = new PDFDocument();

  doc.pipe(stream);

  // Title
  doc.fontSize(16).text('RPS Document', { align: 'center' });

  // Course Info
  doc.moveDown();
  doc.fontSize(12).text(`Course: ${data.course.name}`);
  doc.text(`Lecturer: ${data.lecturer.name}`);

  // CPL → CPMK
  doc.moveDown();
  doc.text('CPL → CPMK Mapping');
  data.cpmk.forEach(item => {
    doc.text(`- ${item.description}`);
  });

  // Weekly Plan
  doc.moveDown();
  doc.text('Weekly Plan');
  data.plans.forEach((plan, i) => {
    doc.text(`${i + 1}. ${plan.topic}`);
  });

  // Assessment
  doc.moveDown();
  doc.text('Assessments');
  data.assessments.forEach(a => {
    doc.text(`${a.type}: ${a.weight}%`);
  });

  doc.end();
}
```

---

## 🥉 Step 3 — Buat PDF Service wrapper

File:

```bash
services/pdf/rpsPdf.service.js
```

---

```js
const { getFullRpsData } = require('../rpsAggregation.service');
const { buildRpsPdf } = require('../../utils/pdfBuilder');

async function generateRpsPdf(courseId, res) {
  const data = await getFullRpsData(courseId);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=rps.pdf');

  buildRpsPdf(data, res);
}
```

---

## 🧱 Step 4 — Controller

```js
async function downloadRpsPdf(req, res) {
  const { courseId } = req.params;

  await rpsPdfService.generateRpsPdf(courseId, res);
}
```

---

## 🌐 Step 5 — Route

```js
router.get('/rps/:courseId/pdf', rpsController.downloadRpsPdf);
```

---

# 🧪 6. Testing (wajib untuk kamu)

Gunakan:

```bash
curl http://localhost:8000/rps/1/pdf --output rps.pdf
```

---

Atau browser:

```text
http://localhost:8000/rps/1/pdf
```

---

# 🧠 7. Debugging layer (sesuai gaya kamu)

Kalau error:

```text
Layer check:
1. Route hit?
2. Controller param valid?
3. Aggregation data lengkap?
4. PDF builder crash?
```

---

Tambahkan log:

```js
console.log('[PDF] Generating RPS for:', courseId);
```

---

# ⚠️ 8. Pitfall yang HARUS kamu hindari

❌ jangan langsung styling kompleks
❌ jangan refactor service existing
❌ jangan tambah fitur lain

---

# 🔥 9. Upgrade nanti (bukan sekarang)

Kalau sudah jalan:

```text
- template versioning
- multi export (docx)
- branding kampus
- pagination proper
```

---

# 🧭 10. Kenapa ini powerful untuk kamu

Karena:

```text
1 endpoint → langsung value nyata
```

Ini versi kamu dari:

```text
Isometricon:
text → icon

Kamu:
RPS → PDF
```

---

# 💥 Insight terakhir (ini penting banget)

```text
ini bukan fitur tambahan
ini adalah "output layer" dari sistem kamu
```

---

# 🤝 Penutup

Kalau kamu jalankan ini:

* gak ganggu ERP
* gak ganggu RPS refactor
* tapi langsung punya “produk kecil”

---

Kalau kamu mau next step, aku bisa bantu:

* bikin template PDF lebih proper (table, layout akademik)
* atau mapping agar ini bisa jadi endpoint public (mini product)

Karena sekarang kamu sudah punya:

```text
fondasi → tinggal expose value
```
