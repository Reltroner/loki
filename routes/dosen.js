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

router.get("/:dosenId/courses", coursesController.getAllCourses);

router.get("/add-course", coursesController.getMatkul);

router.post("/add-course", coursesController.createCourse);

/*
|--------------------------------------------------------------------------
| Course Plan
|--------------------------------------------------------------------------
*/

router.get("/coursesPlan/:coursePlanId/:rev", coursePlanController.getCourses);

router.put("/coursesPlan/:coursePlanId/:rev/edit", coursePlanController.updateCoursePlan);

router.get("/coursesPlan/:coursePlanId/:rev/edit", coursePlanController.editCoursePlan);

router.post("/coursesPlan/:coursePlanId/:rev/revisi", coursePlanController.revisi);

router.get("/coursesPlan/:coursePlanId/:rev/revisi", coursePlanController.revisiRps);

router.get("/:coursePlanId/:rev/cetakRps", coursePlanController.cetakRps);

/*
|--------------------------------------------------------------------------
| CPMK
|--------------------------------------------------------------------------
*/

router.get("/:coursePlanId/:rev/CPMK", courseLosController.getCourseLos);

router.get("/:coursePlanId/:rev/add-cpmk", (req, res) => {
  res.render("dosen/add_cpmk");
});

router.post("/:coursePlanId/:rev/add-cpmk", courseLosController.createCourseLos);

router.get(
  "/:coursePlanId/:rev/edit-cpmk/:cpmkId",
  courseLosController.getCourseLosById
);

router.put(
  "/:coursePlanId/:rev/edit-cpmk/:cpmkId",
  courseLosController.updateCourseLos
);

router.delete(
  "/:coursePlanId/:rev/CPMK/:cpmkId",
  courseLosController.deleteCourseLos
);

/*
|--------------------------------------------------------------------------
| CPL
|--------------------------------------------------------------------------
*/

router.get("/:coursePlanId/:rev/cpl/:clId", courseLoDetailController.getCurriculumLos);

router.delete("/cpl/:mappingId", courseLoDetailController.hapusCP);

router.post("/cpl/tambah", courseLoDetailController.tambahCP);

/*
|--------------------------------------------------------------------------
| Pertemuan Mingguan
|--------------------------------------------------------------------------
*/

router.get("/:coursePlanId/:rev/pertemuan", coursePlanDetailController.getDetail);

router.get("/:coursePlanId/:rev/add-pertemuan", (req, res) => {
  res.render("dosen/add_pertemuan");
});

router.post("/:coursePlanId/:rev/add-pertemuan", coursePlanDetailController.createDetail);

router.delete(
  "/:coursePlanId/:rev/pertemuan/:detailId",
  coursePlanDetailController.deleteDetail
);

router.get(
  "/:coursePlanId/:rev/edit-pertemuan/:detailId",
  coursePlanDetailController.getDetailById
);

router.put(
  "/:coursePlanId/:rev/edit-pertemuan/:detailId",
  coursePlanDetailController.updateDetail
);

/*
|--------------------------------------------------------------------------
| Reference
|--------------------------------------------------------------------------
*/

router.get("/:coursePlanId/:rev/referensi", coursePlanReferenceController.getReferences);

router.get("/:coursePlanId/:rev/add-referensi", (req, res) => {
  res.render("dosen/add_referensi");
});

router.post("/:coursePlanId/:rev/add-referensi", coursePlanReferenceController.createReference);

router.delete(
  "/:coursePlanId/:rev/referensi/:referenceId",
  coursePlanReferenceController.deleteReference
);

router.get(
  "/:coursePlanId/:rev/edit-referensi/:referenceId",
  coursePlanReferenceController.getReferenceById
);

router.put(
  "/:coursePlanId/:rev/edit-referensi/:referenceId",
  coursePlanReferenceController.updateReference
);

/*
|--------------------------------------------------------------------------
| Penilaian
|--------------------------------------------------------------------------
*/

router.get("/:coursePlanId/:rev/penilaian", coursePlanAssessmentController.getAssessments);

router.get("/:coursePlanId/:rev/add-penilaian", (req, res) => {
  res.render("dosen/add_penilaian");
});

router.post("/:coursePlanId/:rev/add-penilaian", coursePlanAssessmentController.createAssessments);

router.delete(
  "/:coursePlanId/:rev/penilaian/:assessmentId",
  coursePlanAssessmentController.deleteAssessments
);

router.get(
  "/:coursePlanId/:rev/edit-penilaian/:assessmentId",
  coursePlanAssessmentController.getAssessmentsById
);

router.put(
  "/:coursePlanId/:rev/edit-penilaian/:assessmentId",
  coursePlanAssessmentController.updateAssessments
);

module.exports = router;