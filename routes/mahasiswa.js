// routes/mahasiswa.js

const express = require("express");

const coursePlanController = require("../controllers/coursePlanController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/

router.use(authMiddleware);
router.use(roleMiddleware("M")); // Mahasiswa

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