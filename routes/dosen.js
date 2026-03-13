// routes/dosen.js

const express = require("express");

const coursesController = require("../controllers/coursesController");
const courseLoDetailController = require("../controllers/courseLoDetailController");
const coursePlanController = require("../controllers/coursePlanController");
const courseLosController = require("../controllers/courseLosController");
const coursePlanDetailController = require("../controllers/coursePlanDetailController");
const coursePlanReferenceController = require("../controllers/coursePlanReferenceController");
const coursePlanAssessmentController = require("../controllers/coursePlanAssessmentController");

const { authenticateToken } = require("../middleware/verifyToken");
const requireRole = require("../middleware/roleMiddleware");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Security Layer
|--------------------------------------------------------------------------
| JWT authentication + dosen authorization
*/

router.use(authenticateToken);
router.use(requireRole("dosen"));

/*
|--------------------------------------------------------------------------
| Course
|--------------------------------------------------------------------------
*/

router.get("/:id/courses", coursesController.getAllCourses);

router.get("/add-course", coursesController.getMatkul);

router.post("/add-course", coursesController.createCourse);

/*
|--------------------------------------------------------------------------
| Course Plan
|--------------------------------------------------------------------------
*/

router.get("/coursesPlan/:id/:rev", coursePlanController.getCourses);

router.put("/coursesPlan/:id/:rev/edit", coursePlanController.updateCoursePlan);

router.get("/coursesPlan/:id/:rev/edit", coursePlanController.editCoursePlan);

router.post("/coursesPlan/:id/:rev/revisi", coursePlanController.revisi);

router.get("/coursesPlan/:id/:rev/revisi", coursePlanController.revisiRps);

router.get("/:id/:rev/cetakRps", coursePlanController.cetakRps);

/*
|--------------------------------------------------------------------------
| CPMK
|--------------------------------------------------------------------------
*/

router.get("/:id/:rev/CPMK", courseLosController.getCourseLos);

router.get("/:id/:rev/add-cpmk", (req, res) => {
  res.render("dosen/add_cpmk");
});

router.post("/:id/:rev/add-cpmk", courseLosController.createCourseLos);

router.get("/:id/:rev/edit-cpmk/:id", courseLosController.getCourseLosById);

router.put("/:id/:rev/edit-cpmk/:id", courseLosController.updateCourseLos);

router.delete("/:id/:rev/CPMK/:id", courseLosController.deleteCourseLos);

/*
|--------------------------------------------------------------------------
| CPL
|--------------------------------------------------------------------------
*/

router.get("/:id/:rev/cpl/:cl", courseLoDetailController.getCurriculumLos);

router.delete("/cpl/:id", courseLoDetailController.hapusCP);

router.post("/cpl/tambah", courseLoDetailController.tambahCP);

/*
|--------------------------------------------------------------------------
| Pertemuan Mingguan
|--------------------------------------------------------------------------
*/

router.get("/:id/:rev/pertemuan", coursePlanDetailController.getDetail);

router.get("/:id/:rev/add-pertemuan", (req, res) => {
  res.render("dosen/add_pertemuan");
});

router.post("/:id/:rev/add-pertemuan", coursePlanDetailController.createDetail);

router.delete("/:id/:rev/pertemuan/:id", coursePlanDetailController.deleteDetail);

router.get("/:id/:rev/edit-pertemuan/:id", coursePlanDetailController.getDetailById);

router.put("/:id/:rev/edit-pertemuan/:id", coursePlanDetailController.updateDetail);

/*
|--------------------------------------------------------------------------
| Reference
|--------------------------------------------------------------------------
*/

router.get("/:id/:rev/referensi", coursePlanReferenceController.getReferences);

router.get("/:id/:rev/add-referensi", (req, res) => {
  res.render("dosen/add_referensi");
});

router.post("/:id/:rev/add-referensi", coursePlanReferenceController.createReference);

router.delete("/:id/:rev/referensi/:id", coursePlanReferenceController.deleteReference);

router.get("/:id/:rev/edit-referensi/:id", coursePlanReferenceController.getReferenceById);

router.put("/:id/:rev/edit-referensi/:id", coursePlanReferenceController.updateReference);

/*
|--------------------------------------------------------------------------
| Penilaian
|--------------------------------------------------------------------------
*/

router.get("/:id/:rev/penilaian", coursePlanAssessmentController.getAssessments);

router.get("/:id/:rev/add-penilaian", (req, res) => {
  res.render("dosen/add_penilaian");
});

router.post("/:id/:rev/add-penilaian", coursePlanAssessmentController.createAssessments);

router.delete("/:id/:rev/penilaian/:id", coursePlanAssessmentController.deleteAssessments);

router.get("/:id/:rev/edit-penilaian/:id", coursePlanAssessmentController.getAssessmentsById);

router.put("/:id/:rev/edit-penilaian/:id", coursePlanAssessmentController.updateAssessments);

module.exports = router;