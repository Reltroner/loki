// controllers/coursesController.js

const coursesService = require("../services/coursesService");

const getAllCourses = async (req, res) => {
  try {
    const data = await coursesService.getAllCourses();

    return res.render("dosen/courses", {
      data
    });

  } catch (err) {
    console.error("getAllCourses error:", err);

    return res.status(500).render("err500", {
      error: err.message
    });
  }
};

const createCourse = async (req, res) => {
  try {
    const result = await coursesService.createCourse(req.body);

    return res.json(result);

  } catch (err) {
    console.error("createCourse error:", err);

    return res.status(500).json({
      error: err.message
    });
  }
};

const getMatkul = async (req, res) => {
  try {
    const data = await coursesService.getMatkul();

    return res.render("dosen/add_rps", {
      data
    });

  } catch (err) {
    console.error("getMatkul error:", err);

    return res.status(500).render("err500", {
      error: err.message
    });
  }
};

module.exports = {
  getAllCourses,
  createCourse,
  getMatkul
};