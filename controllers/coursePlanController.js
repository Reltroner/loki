// controllers/coursePlanController.js

const service = require("../services/coursePlanService");
const asyncHandler = require("../utils/asyncHandler");

/*
|--------------------------------------------------------------------------
| HELPER (deterministic param extraction)
|--------------------------------------------------------------------------
*/

const getParams = (req) => ({
  id: req.params.id || req.params.coursePlanId,
  rev: req.params.rev
});

/*
|--------------------------------------------------------------------------
| DOSEN
|--------------------------------------------------------------------------
*/

const getCourses = asyncHandler(async (req, res) => {

  const { id, rev } = getParams(req);

  const result = await service.getCoursePlan(id, rev);

  if (!result) {
    return res.status(404).render("err404", {
      error: "data tidak ada"
    });
  }

  return res.render("dosen/course_plan", { items: result });

});

/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

const coursesAdmin = asyncHandler(async (req, res) => {

  const result = await service.getCoursesAdmin();

  return res.render("admin/coursesPlan", { items: result });

});

const getCourseAdmin = asyncHandler(async (req, res) => {

  const { id, rev } = getParams(req);

  const result = await service.getCoursePlan(id, rev);

  return res.render("admin/lihatRps", { items: result });

});

const cetakListRps = asyncHandler(async (req, res) => {

  const result = await service.getCoursesAdmin();

  return res.render("admin/cetakListRps", { items: result });

});

/*
|--------------------------------------------------------------------------
| MAHASISWA
|--------------------------------------------------------------------------
*/

const getCourseMahasiswa = asyncHandler(async (req, res) => {

  const { id, rev } = getParams(req);

  const result = await service.getCoursePlan(id, rev);

  return res.render("mahasiswa/course_plan", { item: result });

});

const getAllCoursePlan = asyncHandler(async (req, res) => {

  const result = await service.getCoursesAdmin();

  return res.render("mahasiswa/courses", { items: result });

});

const cetakRpsMahasiswa = asyncHandler(async (req, res) => {

  const { id, rev } = getParams(req);

  const result = await service.getCoursePlan(id, rev);

  return res.render("mahasiswa/cetakRps", { items: result });

});

const cetakRps = asyncHandler(async (req, res) => {

  const { id, rev } = getParams(req);

  const result = await service.getCoursePlan(id, rev);

  return res.render("dosen/cetakRps", { items: result });

});

/*
|--------------------------------------------------------------------------
| SEARCH
|--------------------------------------------------------------------------
*/

const search = asyncHandler(async (req, res) => {

  const { term } = req.query;

  const result = await service.searchCoursePlan(term);

  return res.render("mahasiswa/search", { items: result });

});

/*
|--------------------------------------------------------------------------
| UPDATE
|--------------------------------------------------------------------------
*/

const updateCoursePlan = asyncHandler(async (req, res) => {

  const { id, rev } = getParams(req);

  const payload = {
    code: req.body.code,
    name: req.body.name,
    course_id: req.body.course_id,
    alias_name: req.body.alias_name,
    credit: req.body.credit,
    semester: req.body.semester,
    description: req.body.description
  };

  await service.updateCoursePlan(id, rev, payload);

  return res.redirect("back");

});

/*
|--------------------------------------------------------------------------
| STUB (safe placeholder)
|--------------------------------------------------------------------------
*/

const editCoursePlan = asyncHandler(async (req, res) => {
  return res.send("editCoursePlan stub");
});

const revisi = asyncHandler(async (req, res) => {
  return res.send("revisi stub");
});

const revisiRps = asyncHandler(async (req, res) => {
  return res.send("revisiRps stub");
});

/*
|--------------------------------------------------------------------------
| EXPORT
|--------------------------------------------------------------------------
*/

module.exports = {
  getCourses,
  coursesAdmin,
  getCourseAdmin,
  getCourseMahasiswa,
  getAllCoursePlan,
  updateCoursePlan,
  cetakRpsMahasiswa,
  cetakListRps,
  search,
  editCoursePlan,
  revisi,
  revisiRps,
  cetakRps
};