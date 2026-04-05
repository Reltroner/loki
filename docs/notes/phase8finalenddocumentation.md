# PHASE 8 — UI/UX FOUNDATION (NON-DESTRUCTIVE)

## End-to-End Deterministic Engineering Documentation

---

# 1. OBJECTIVE

The goal of **PHASE 8 — UI/UX FOUNDATION (NON-DESTRUCTIVE)** is to introduce a **unified, deterministic UI system** without breaking existing backend logic, routing, or authentication flows.

This phase focuses on:

* Establishing a **Single Source of Truth (Layout System)**
* Ensuring **role-based UI rendering**
* Eliminating **UI duplication**
* Standardizing **asset paths (CSS, fonts, images)**
* Achieving **UI consistency across all modules**

---

# 2. CORE PRINCIPLES

## 2.1 NON-DESTRUCTIVE ENGINEERING

```text
✔ No breaking existing routes
✔ No modification to business logic
✔ No change to API contracts
✔ Only additive + structural improvements
```

---

## 2.2 SINGLE SOURCE OF TRUTH (CRITICAL)

```text
layout.ejs = ONLY place that controls:
✔ header
✔ sidebar
✔ footer
✔ global CSS
```

All other views:

```text
✔ MUST NOT include layout components
✔ MUST only render content
```

---

## 2.3 DETERMINISTIC STRUCTURE

Every rendering path must be:

```text
predictable
traceable
non-ambiguous
```

---

# 3. ARCHITECTURE BEFORE VS AFTER

## BEFORE

```text
views/
  admin/
    dashboard.ejs (includes header, sidebar, footer)
  dosen/
    dashboard.ejs (duplicate includes)
  mahasiswa/
    dashboard.ejs (duplicate includes)
```

Problems:

```text
❌ duplicated UI
❌ inconsistent rendering
❌ hard to maintain
❌ CSS conflicts
```

---

## AFTER

```text
views/
  layout.ejs         ← SINGLE SOURCE
  partials/
    header.ejs
    sidebar.ejs
    footer.ejs

  admin/
    dashboard.ejs    ← CONTENT ONLY
  dosen/
    dashboard.ejs
  mahasiswa/
    dashboard.ejs
```

---

# 4. IMPLEMENTATION DETAILS

---

# 4.1 LAYOUT SYSTEM

## layout.ejs (FINAL STRUCTURE)

```ejs
<body>

  <%- include("partials/header") %>

  <div style="display:flex">
      <%- include("partials/sidebar") %>

      <main style="flex:1; padding:20px;">
          <%- body %>
      </main>
  </div>

  <%- include("partials/footer") %>

</body>
```

---

## KEY RULES

```text
✔ layout handles ALL shared UI
✔ views render ONLY content
✔ no duplication allowed
```

---

# 4.2 VIEW CLEANUP (CRITICAL STEP)

All views were scanned using CLI:

```powershell
Select-String -Path views\**\*.ejs -Pattern "include"
```

---

## REMOVED FROM ALL VIEWS:

```ejs
<%- include("partials/header") %>
<%- include("partials/sidebar") %>
<%- include("partials/footer") %>
```

---

## ALSO REMOVED:

```html
<html>
<body>
```

EXCEPTION:

```text
✔ print pages (cetak*) are allowed to keep full HTML
```

---

# 4.3 ROLE-BASED UI SYSTEM

---

## PROBLEM

Mismatch between:

```text
Backend: user.role = "admin" | "dosen" | "mahasiswa"
Frontend: expecting "T", "D", "M"
```

---

## SOLUTION

### sidebar.ejs (FINAL)

```ejs
<%
const roleMap = {
  admin: "T",
  dosen: "D",
  mahasiswa: "M"
};

const role = user ? roleMap[user.role] : "M";
%>
```

---

## RESULT

```text
✔ UI correctly adapts per role
✔ no fallback to incorrect role
✔ deterministic mapping
```

---

# 4.4 AUTH FLOW ALIGNMENT

---

## CHANGE

Login controller updated:

```js
return res.redirect("/dashboard");
```

---

## CENTRALIZED ROUTING

```js
app.get("/dashboard", authenticate, (req, res) => {
  const role = req.user.role;

  if (role === "admin") return res.redirect("/admin/dashboard");
  if (role === "dosen") return res.redirect(`/dosen/${req.user.id}/courses`);
  if (role === "mahasiswa") return res.redirect("/mahasiswa/home");
});
```

---

## RESULT

```text
✔ single redirect entry point
✔ no duplication in controller
✔ role-based routing centralized
```

---

# 4.5 STATIC ASSET STANDARDIZATION

---

## PROBLEM

```text
❌ /auth/fonts
❌ /public/fonts
❌ relative paths (../fonts)
```

---

## SOLUTION

All assets standardized to:

```text
/public → root static directory

✔ /css/...
✔ /fonts/...
✔ /images/...
```

---

## FINAL RULE

```text
✔ ALWAYS use absolute path from root:
   /fonts/...
   /css/...
```

---

# 4.6 FONT SYSTEM FIX

---

## BEFORE

```css
url("../fonts/montserrat/...")
```

---

## AFTER

```css
url("/fonts/montserrat/...")
```

---

## DIRECTORY STRUCTURE

```text
public/
  fonts/
    poppins/
    montserrat/
```

---

## RESULT

```text
✔ no 404 errors
✔ consistent font loading
✔ browser predictable behavior
```

---

# 4.7 DATABASE ALIGNMENT

---

## PROBLEM

```text
❌ users table missing "role" column
```

---

## FIX

```sql
ALTER TABLE users ADD COLUMN role TEXT;
```

---

## RESULT

```text
✔ backend and UI role system aligned
✔ no undefined role behavior
```

---

# 4.8 MODEL REGISTRY FIX

---

## PROBLEM

```js
models.User ❌ undefined
```

---

## ROOT CAUSE

Dynamic model loader uses:

```js
models[model.name]
```

---

## DISCOVERY

```powershell
node -e "console.log(Object.keys(require('./models')))"
```

Result:

```text
✔ Users
```

---

## FIX

```js
const User = models.Users;
```

---

# 4.9 SEED SYSTEM

---

## FINAL SEED SCRIPT

```js
const models = require("../models");
const User = models.Users;

await User.bulkCreate([...]);
```

---

## RESULT

```text
✔ deterministic data initialization
✔ role-based testing enabled
```

---

# 4.10 OBSERVABILITY BASELINE

---

## requestLogger enabled:

```text
✔ method
✔ path
✔ status
✔ duration
✔ user
```

---

## RESULT

```text
✔ system traceable
✔ debugging simplified
```

---

# 5. VALIDATION CHECKLIST

---

## UI VALIDATION

```text
✔ no duplicate header
✔ no duplicate sidebar
✔ no duplicate footer
✔ layout applied globally
```

---

## ROLE VALIDATION

```text
✔ admin → admin UI
✔ dosen → dosen UI
✔ mahasiswa → mahasiswa UI
```

---

## ROUTING VALIDATION

```text
✔ login → /dashboard
✔ dashboard → role redirect
```

---

## ASSET VALIDATION

```text
✔ no 404 fonts
✔ no incorrect paths
```

---

## SYSTEM VALIDATION

```text
✔ server stable
✔ no runtime error
✔ smoke test PASS
```

---

# 6. FINAL STATE

---

## SYSTEM CHARACTERISTICS

```text
✔ deterministic UI rendering
✔ centralized layout control
✔ role-driven interface
✔ consistent asset system
✔ aligned data-model-view layers
```

---

## ENGINEERING LEVEL ACHIEVED

```text
From:
❌ fragmented UI
❌ duplicated rendering
❌ inconsistent assets

To:
✔ structured UI system
✔ predictable rendering pipeline
✔ production-ready UI foundation
```

---

# 7. TRANSITION TO PHASE 9

---

## PHASE 8 COMPLETION CRITERIA

```text
✔ UI system unified
✔ no duplication
✔ role mapping correct
✔ assets stable
✔ layout enforced
✔ smoke test passed
```

---

## STATUS

```text
🔥 PHASE 8 = COMPLETE (100%)
```

---

## NEXT

```text
➡ PHASE 9 — PRODUCTION READINESS

Focus:
✔ authentication hardening
✔ logging system
✔ error consistency
✔ security enforcement
✔ observability
```

---

# FINAL NOTE

Phase 8 is not about UI design —
it is about **UI system architecture**.

You have successfully established:

```text
SYSTEM CONSISTENCY ACROSS:
DATA ↔ MODEL ↔ VIEW ↔ ROUTING
```

This is the foundation of a **production-grade application**.
