// controllers/courseLosController.js

const courseLosService = require("../services/courseLosService");

const getCourseLos = async (req, res) => {
  try {
    const { coursePlanId, rev } = req.params;

    const data = await courseLosService.getCourseLos({ coursePlanId, rev });

    return res.render("dosen/cpmk", {
      data
    });

  } catch (err) {
    console.error("getCourseLos error:", err);

    return res.status(500).render("err500", {
      error: err.message
    });
  }
};

const createCourseLos = async (req, res) => {
  try {
    const { coursePlanId, rev } = req.params;

    const result = await courseLosService.createCourseLos({
      ...req.body,
      coursePlanId,
      rev
    });

    return res.json(result);

  } catch (err) {
    console.error("createCourseLos error:", err);

    return res.status(500).json({
      error: err.message
    });
  }
};

const updateCourseLos = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await courseLosService.updateCourseLos(id, req.body);

    return res.json(result);

  } catch (err) {
    console.error("updateCourseLos error:", err);

    return res.status(500).json({
      error: err.message
    });
  }
};

const deleteCourseLos = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await courseLosService.deleteCourseLos(id);

    return res.json(result);

  } catch (err) {
    console.error("deleteCourseLos error:", err);

    return res.status(500).json({
      error: err.message
    });
  }
};

const getCourseLosById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await courseLosService.getCourseLosById(id);

    return res.render("dosen/edit_cpmk", {
      data
    });

  } catch (err) {
    console.error("getCourseLosById error:", err);

    return res.status(500).render("err500", {
      error: err.message
    });
  }
};

module.exports = {
  getCourseLos,
  createCourseLos,
  updateCourseLos,
  deleteCourseLos,
  getCourseLosById
};