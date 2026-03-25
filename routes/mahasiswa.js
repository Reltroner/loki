// routes/mahasiswa.js

const express = require("express");

const coursePlanController = require("../controllers/coursePlanController");

// ✅ NEW (MODULE-BASED AUTH)
const { authenticate } = require("../modules/auth/middleware/authenticate");
const { authorize } = require("../modules/auth/middleware/authorize");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Security Layer (MODULE BASED — CLEAN)
|--------------------------------------------------------------------------
*/

router.use(authenticate);
router.use(authorize("mahasiswa"));

/*
|--------------------------------------------------------------------------
| Pages
|--------------------------------------------------------------------------
*/

router.get("/mahasiswa", (req, res) => {
  res.send("ini Halaman mahasiswa");
});

router.get("/home", (req, res) => {
  res.render("mahasiswa/home");
});

/*
|--------------------------------------------------------------------------
| Course Plans
|--------------------------------------------------------------------------
*/

router.get("/cari", coursePlanController.search);

router.get(
  "/coursesPlan/:id/:rev",
  coursePlanController.getCourseMahasiswa
);

router.get(
  "/coursesPlan",
  coursePlanController.getAllCoursePlan
);

router.get(
  "/:id/:rev/cetakRps",
  coursePlanController.cetakRpsMahasiswa
);

module.exports = router;