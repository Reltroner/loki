// controllers/coursePlanController.js

const service = require("../services/coursePlanService");

/*
|--------------------------------------------------------------------------
| DOSEN
|--------------------------------------------------------------------------
*/

const getCourses = async (req, res) => {
  try {

    const result = await service.getCoursePlan(
      req.params.id,
      req.params.rev
    );

    if (!result) {
      return res.status(404).json({
        message: "data tidak ada"
      });
    }

    res.render("dosen/course_plan", { items: result });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

const coursesAdmin = async (req, res) => {
  try {

    const result = await service.getCoursesAdmin();

    res.render("admin/coursesPlan", {
      items: result
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const getCourseAdmin = async (req, res) => {
  try {

    const result = await service.getCoursePlan(
      req.params.id,
      req.params.rev
    );

    res.render("admin/lihatRps", {
      items: result
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const cetakListRps = async (req, res) => {
  try {

    const result = await service.getCoursesAdmin();

    res.render("admin/cetakListRps", {
      items: result
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


/*
|--------------------------------------------------------------------------
| MAHASISWA
|--------------------------------------------------------------------------
*/

const getCourseMahasiswa = async (req, res) => {
  try {

    const result = await service.getCoursePlan(
      req.params.id,
      req.params.rev
    );

    res.render("mahasiswa/course_plan", {
      item: result
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const getAllCoursePlan = async (req, res) => {
  try {

    const result = await service.getCoursesAdmin();

    res.render("mahasiswa/courses", {
      items: result
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const cetakRpsMahasiswa = async (req, res) => {
  try {

    const result = await service.getCoursePlan(
      req.params.id,
      req.params.rev
    );

    res.render("mahasiswa/cetakRps", {
      items: result
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const cetakRps = async (req, res) => {
  try {

    const result = await service.getCoursePlan(
      req.params.id,
      req.params.rev
    );

    res.render("dosen/cetakRps", {
      items: result
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

/*
|--------------------------------------------------------------------------
| SEARCH
|--------------------------------------------------------------------------
*/

const search = async (req, res) => {

  try {

    const term = req.query.term;

    const result = await service.searchCoursePlan(term);

    res.render("mahasiswa/search", {
      items: result
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


/*
|--------------------------------------------------------------------------
| UPDATE
|--------------------------------------------------------------------------
*/

const updateCoursePlan = async (req, res) => {

  try {

    const payload = {
      code: req.body.code,
      name: req.body.name,
      course_id: req.body.course_id,
      alias_name: req.body.alias_name,
      credit: req.body.credit,
      semester: req.body.semester,
      description: req.body.description
    };

    await service.updateCoursePlan(
      req.params.id,
      req.params.rev,
      payload
    );

    res.redirect("back");

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const editCoursePlan = async (req, res) => {
  res.send("editCoursePlan stub");
};

const revisi = async (req, res) => {
  res.send("revisi stub");
};

const revisiRps = async (req, res) => {
  res.send("revisiRps stub");
};

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