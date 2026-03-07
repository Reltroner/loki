# 📦 PROJECT CONTINUATION BRIEF

## Backend Architecture Tooling & Audit

Project: **loki_a2-master**

---

# 1️⃣ Environment

### OS

Windows

### Shell

PowerShell

### Node

Node.js v22.14.0

### Package Manager

npm

### Database

SQLite

```text
database.sqlite
```

### ORM

Sequelize v6

---

# 2️⃣ Backend Stack

Framework:

```text
Express 5.2.1
```

Libraries:

```text
bcrypt
body-parser
cookie-parser
dotenv
ejs
express-session
jsonwebtoken
method-override
mysql2
sequelize
sqlite3
nodemon
```

---

# 3️⃣ Project Architecture

Root structure (simplified):

```text
config/
controller/
controllers/
middleware/
models/
repositories/
routes/
services/
scripts/
views/
public/
frontend/
docs/
database.sqlite
server.js
index.js
```

Important note:

Project contains **two controller directories**:

```text
controller/
controllers/
```

Both are currently used.

---

# 4️⃣ Express Server Architecture

Main server file:

```text
server.js
```

Pattern used:

### App Factory

```javascript
function createApp()
```

Purpose:

* CLI scripts can import Express instance
* server does not auto start

Server start condition:

```javascript
if (require.main === module)
```

Export:

```javascript
module.exports = app
```

---

# 5️⃣ Routing Structure

Routes located in:

```text
routes/admin.js
routes/auth.js
routes/dosen.js
routes/mahasiswa.js
```

Mounted in:

```javascript
app.use("/auth", authRoutes)
app.use("/mahasiswa", mahasiswaRoutes)
app.use("/dosen", dosenRoutes)
app.use("/admin", adminRoutes)
```

---

# 6️⃣ Middleware

```text
middleware/authMiddleware.js
middleware/roleMiddleware.js
middleware/verifyToken.js
```

JWT authentication system.

---

# 7️⃣ Database Models

Detected tables:

```text
Courses
CourseLos
CourseLoDetails
CoursePlans
CoursePlanAssessments
CoursePlanDetails
CoursePlanDetailAssessments
CoursePlanDetailOutcomes
CoursePlanDetailRefs
CoursePlanLecturers
CoursePlanReferences
CourseRequirements
Curricula
CurriculumLos
CurriculumProfiles
Lecturers
Users
```

Database:

```text
SQLite
```

---

# 8️⃣ Sequelize Associations

ERD relationships discovered:

```text
Courses ────< CoursePlans
Courses ────< CourseRequirements

CoursePlans ────< CoursePlanDetails
CoursePlans ────< CoursePlanAssessments
CoursePlans ────< CoursePlanReferences
CoursePlans >────< Lecturers

Curricula ────< Courses
Curricula ────< CurriculumLos
Curricula ────< CurriculumProfiles

CourseLos >────< CurriculumLos
CourseLos >────< CoursePlanDetails
```

---

# 9️⃣ CLI Engineering Tooling Added

A full CLI diagnostic toolkit has been implemented.

Scripts folder:

```text
scripts/
```

---

## Dependency Inspection

```bash
npm run dependency-check
```

Script:

```text
scripts/dependency-check.js
```

Purpose:

Inspect dependency tree and security issues.

---

## Query Analyzer

```bash
npm run query:analyze
```

Script:

```text
scripts/query-inspector.js
```

Purpose:

Analyze Sequelize query efficiency.

---

## Database Schema Inspector

```bash
npm run db:inspect
```

Script:

```text
scripts/db-schema.js
```

Purpose:

Print database schema.

---

## ERD Generator

```bash
npm run erd
```

Script:

```text
scripts/erd-generator.js
```

Output:

```text
console ERD
```

---

## ERD Graph Generator

```bash
npm run erd:graph
```

Script:

```text
scripts/erd-graph.js
```

Generates:

```text
database-erd.dot
```

Graphviz then generates:

```text
database-erd.png
```

Location:

```text
docs/architecture/database-erd.png
```

---

## Route List CLI

```bash
npm run route:list
```

Script:

```text
scripts/routes-list.js
```

Reads Express router stack.

Output example:

```text
GET /register
POST /register
GET /login
POST /login
GET /logout
GET /mahasiswa
GET /coursesPlan
GET /coursesPlan/:id/:rev
...
GET /
GET /about
GET /health
```

---

## System Doctor

```bash
npm run doctor
```

Script:

```text
scripts/doctor.js
```

Checks:

```text
JWT secret
database connection
existing tables
```

---

## Database Check

```bash
npm run db:check
```

Script:

```text
scripts/db-check.js
```

Outputs:

```text
database.sqlite found
database connection OK
registered models
```

---

## Sequelize Index Analyzer

```bash
npm run index:audit
```

Script:

```text
scripts/index-analyzer.js
```

Detected missing indexes:

```text
Courses.curriculum_id
CourseLos.course_plan_id
CoursePlans.course_id
CoursePlanAssessments.course_plan_id
CoursePlanDetails.course_plan_id
CoursePlanReferences.course_plan_id
CourseRequirements.course_id
CourseRequirements.required_course_id
CurriculumLos.curriculum_id
CurriculumProfiles.curriculum_id
```

---

## Architecture Scanner

```bash
npm run arch:scan
```

Script:

```text
scripts/architecture-scan.js
```

Current output:

```text
Controller dependency: admin.js
Controller dependency: dosen.js
Controller dependency: mahasiswa.js
Model dependency: coursePlanQuery.js
Model dependency: coursePlanRepository.js
```

Purpose:

Detect:

```text
controller dependencies
model dependencies
```

---

# 🔟 Graphviz Setup

Graphviz installed:

```text
C:\Program Files\Graphviz\bin\dot.exe
```

Verified:

```bash
dot -V
```

Version:

```text
graphviz 14.1.3
```

---

# 11️⃣ Windows PATH Issue

PowerShell PATH does not include:

```text
C:\Program Files\Graphviz\bin
```

Current PATH inspection:

```powershell
$env:Path -split ";"
```

Graphviz not listed.

Workaround used:

```powershell
& "C:\Program Files\Graphviz\bin\dot.exe"
```

PNG successfully generated using absolute path.

---

# 12️⃣ Generated Architecture Artifacts

```text
docs/architecture/database-erd.png
```

Contains full database ERD diagram.

---

# 13️⃣ Observed Architectural Issues

From CLI route inspection:

Duplicate routes detected:

```text
/coursesPlan/:id/:rev
```

Routes using dynamic prefixes:

```text
/:id/:rev/CPMK
/:id/:rev/pertemuan
/:id/:rev/referensi
/:id/:rev/penilaian
```

Potential issues:

```text
route shadowing
route ambiguity
```

---

# 14️⃣ Current CLI Toolset

Project now supports:

```bash
npm run doctor
npm run route:list
npm run db:check
npm run erd
npm run erd:graph
npm run query:analyze
npm run index:audit
npm run arch:scan
```

These tools provide:

```text
database inspection
route inspection
dependency analysis
architecture scanning
query analysis
ERD visualization
```

---

# 15️⃣ Pending Improvements

Future tooling planned:

### Backend Architecture Visualizer

Goal:

Generate diagram:

```text
routes
 ↓
controllers
 ↓
services
 ↓
repositories
 ↓
models
```

Output:

```text
docs/architecture/backend-architecture.png
```

---

### Duplicate Route Detector

Detect:

```text
duplicate routes
route conflicts
```

---

### N+1 Query Risk Scanner

Detect patterns like:

```javascript
for (...) {
 await Model.findAll()
}
```

---

# 16️⃣ Current Status

System is **stable and fully operational**.

All CLI tools work.

Architecture documentation partially generated.

Next stage:

```text
architecture visualization tooling
performance auditing
route conflict detection
```

---

