// routes/admin.js

const express = require("express");

const coursePlanController = require("../controllers/coursePlanController");
const coursePlanLecturerController = require("../controllers/coursePlanLecturerController");
const courseLoDetailController = require("../controllers/courseLoDetailController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Authentication + Authorization
|--------------------------------------------------------------------------
*/

router.use(authMiddleware);
router.use(roleMiddleware("T")); // T = Admin

/*
|--------------------------------------------------------------------------
| Course Plan Management
|--------------------------------------------------------------------------
*/

router.get(
  "/coursesPlan",
  coursePlanController.coursesAdmin
);

router.get(
  "/coursesPlan/:id/:rev",
  coursePlanLecturerController.getDosen
);

router.post(
  "/tambahDosen",
  coursePlanLecturerController.tambahDosen
);

router.delete(
  "/hapusdosen/:id",
  coursePlanLecturerController.hapusDosen
);

router.get(
  "/coursesPlan/:id/:rev/cetakRps",
  coursePlanController.getCourseAdmin
);

/*
|--------------------------------------------------------------------------
| RPS Analytics
|--------------------------------------------------------------------------
*/

router.get("/persentaseRps", (req, res) => {
  res.render("admin/persentaseRps");
});

/*
|--------------------------------------------------------------------------
| CPL CPMK Mapping
|--------------------------------------------------------------------------
*/

router.get(
  "/petaCplCpmk/:id/:rev",
  courseLoDetailController.getPeta
);

router.get(
  "/cetakCplCpmk/:id/:rev",
  courseLoDetailController.cetak
);

/*
|--------------------------------------------------------------------------
| Print
|--------------------------------------------------------------------------
*/

router.get(
  "/cetakListRps",
  coursePlanController.cetakListRps
);

module.exports = router;