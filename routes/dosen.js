// routes/dosen.js

const express = require("express");

const coursesController = require("../controllers/coursesController");
const courseLoDetailController = require("../controllers/courseLoDetailController");
const coursePlanController = require("../controllers/coursePlanController");
const courseLosController = require("../controllers/courseLosController");
const coursePlanDetailController = require("../controllers/coursePlanDetailController");
const coursePlanReferenceController = require("../controllers/coursePlanReferenceController");
const coursePlanAssessmentController = require("../controllers/coursePlanAssessmentController");

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
router.use(authorize("dosen"));

/*
|--------------------------------------------------------------------------
| COURSE
|--------------------------------------------------------------------------
*/

router.get("/:dosenId/courses", coursesController.getAllCourses);
router.get("/add-course", coursesController.getMatkul);
router.post("/add-course", coursesController.createCourse);

/*
|--------------------------------------------------------------------------
| COURSE PLAN (NEW STANDARD)
|--------------------------------------------------------------------------
*/

router.get(
  "/course-plans/:coursePlanId/revisions/:rev",
  coursePlanController.getCourses
);

router.put(
  "/course-plans/:coursePlanId/revisions/:rev",
  coursePlanController.updateCoursePlan
);

router.get(
  "/course-plans/:coursePlanId/revisions/:rev/edit",
  coursePlanController.editCoursePlan
);

router.post(
  "/course-plans/:coursePlanId/revisions/:rev/revisions",
  coursePlanController.revisi
);

router.get(
  "/course-plans/:coursePlanId/revisions/:rev/revisions",
  coursePlanController.revisiRps
);

router.get(
  "/course-plans/:coursePlanId/revisions/:rev/print",
  coursePlanController.cetakRps
);

// ⚠️ LEGACY (TEMPORARY)
router.get(
  "/coursesPlan/:coursePlanId/:rev",
  coursePlanController.getCourses
);

router.put(
  "/coursesPlan/:coursePlanId/:rev/edit",
  coursePlanController.updateCoursePlan
);

/*
|--------------------------------------------------------------------------
| CPMK (CourseLos)
|--------------------------------------------------------------------------
*/

router.get(
  "/course-plans/:coursePlanId/cpmk",
  courseLosController.getCourseLos
);

router.post(
  "/course-plans/:coursePlanId/cpmk",
  courseLosController.createCourseLos
);

router.put(
  "/course-plans/:coursePlanId/cpmk/:cpmkId",
  courseLosController.updateCourseLos
);

router.delete(
  "/course-plans/:coursePlanId/cpmk/:cpmkId",
  courseLosController.deleteCourseLos
);

router.get(
  "/course-plans/:coursePlanId/cpmk/:cpmkId",
  courseLosController.getCourseLosById
);

// ⚠️ LEGACY
router.get("/:coursePlanId/:rev/CPMK", courseLosController.getCourseLos);

/*
|--------------------------------------------------------------------------
| CPL
|--------------------------------------------------------------------------
*/

router.get(
  "/course-plans/:coursePlanId/cpl/:clId",
  courseLoDetailController.getCurriculumLos
);

router.delete("/cpl/:mappingId", courseLoDetailController.hapusCP);
router.post("/cpl/tambah", courseLoDetailController.tambahCP);

/*
|--------------------------------------------------------------------------
| PERTEMUAN
|--------------------------------------------------------------------------
*/

router.get(
  "/course-plans/:coursePlanId/details",
  coursePlanDetailController.getDetail
);

router.post(
  "/course-plans/:coursePlanId/details",
  coursePlanDetailController.createDetail
);

router.put(
  "/course-plans/:coursePlanId/details/:detailId",
  coursePlanDetailController.updateDetail
);

router.delete(
  "/course-plans/:coursePlanId/details/:detailId",
  coursePlanDetailController.deleteDetail
);

router.get(
  "/course-plans/:coursePlanId/details/:detailId",
  coursePlanDetailController.getDetailById
);

/*
|--------------------------------------------------------------------------
| REFERENCES
|--------------------------------------------------------------------------
*/

router.get(
  "/course-plans/:coursePlanId/references",
  coursePlanReferenceController.getReferences
);

router.post(
  "/course-plans/:coursePlanId/references",
  coursePlanReferenceController.createReference
);

router.put(
  "/course-plans/:coursePlanId/references/:referenceId",
  coursePlanReferenceController.updateReference
);

router.delete(
  "/course-plans/:coursePlanId/references/:referenceId",
  coursePlanReferenceController.deleteReference
);

router.get(
  "/course-plans/:coursePlanId/references/:referenceId",
  coursePlanReferenceController.getReferenceById
);

/*
|--------------------------------------------------------------------------
| ASSESSMENTS
|--------------------------------------------------------------------------
*/

router.get(
  "/course-plans/:coursePlanId/assessments",
  coursePlanAssessmentController.getAssessments
);

router.post(
  "/course-plans/:coursePlanId/assessments",
  coursePlanAssessmentController.createAssessments
);

router.put(
  "/course-plans/:coursePlanId/assessments/:assessmentId",
  coursePlanAssessmentController.updateAssessments
);

router.delete(
  "/course-plans/:coursePlanId/assessments/:assessmentId",
  coursePlanAssessmentController.deleteAssessments
);

router.get(
  "/course-plans/:coursePlanId/assessments/:assessmentId",
  coursePlanAssessmentController.getAssessmentsById
);

module.exports = router;