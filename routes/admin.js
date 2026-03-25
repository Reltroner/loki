// routes/admin.js

const express = require("express");

const coursePlanController = require("../controllers/coursePlanController");
const coursePlanLecturerController = require("../controllers/coursePlanLecturerController");
const courseLoDetailController = require("../controllers/courseLoDetailController");

const dashboardController = require("../controllers/dashboardController");

const { authenticate } = require("../modules/auth/middleware/authenticate");
const { authorize } = require("../modules/auth/middleware/authorize");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Security Layer (NEW — MODULE BASED)
|--------------------------------------------------------------------------
*/

router.use(authenticate);
router.use(authorize("admin"));

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

router.get("/dashboard", dashboardController.getAdminDashboard);

/*
|--------------------------------------------------------------------------
| Course Plan Management
|--------------------------------------------------------------------------
*/

router.get("/coursesPlan", coursePlanController.coursesAdmin);

router.get("/coursesPlan/:id/:rev", coursePlanLecturerController.getDosen);

router.post("/tambahDosen", coursePlanLecturerController.tambahDosen);

router.delete("/hapusdosen/:id", coursePlanLecturerController.hapusDosen);

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