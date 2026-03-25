// controllers/coursePlanAssessmentController.js

const coursePlanAssessmentService = require("../services/coursePlanAssessmentService");

const getAssessments = async (req, res) => {
  try {
    const { coursePlanId, rev } = req.params;

    const data = await coursePlanAssessmentService.getAssessments({
      coursePlanId,
      rev
    });

    return res.render("dosen/penilaian", { data });

  } catch (err) {
    console.error("getAssessments error:", err);

    return res.status(500).render("err500", {
      error: err.message
    });
  }
};

const getAssessmentsById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await coursePlanAssessmentService.getAssessmentsById(id);

    return res.render("dosen/edit_penilaian", { data });

  } catch (err) {
    console.error("getAssessmentsById error:", err);

    return res.status(500).render("err500", {
      error: err.message
    });
  }
};

const createAssessments = async (req, res) => {
  try {
    const { coursePlanId, rev } = req.params;

    const result = await coursePlanAssessmentService.createAssessments({
      ...req.body,
      coursePlanId,
      rev
    });

    return res.json(result);

  } catch (err) {
    console.error("createAssessments error:", err);

    return res.status(500).json({
      error: err.message
    });
  }
};

const updateAssessments = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await coursePlanAssessmentService.updateAssessments(id, req.body);

    return res.json(result);

  } catch (err) {
    console.error("updateAssessments error:", err);

    return res.status(500).json({
      error: err.message
    });
  }
};

const deleteAssessments = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await coursePlanAssessmentService.deleteAssessments(id);

    return res.json(result);

  } catch (err) {
    console.error("deleteAssessments error:", err);

    return res.status(500).json({
      error: err.message
    });
  }
};

module.exports = {
  getAssessments,
  getAssessmentsById,
  createAssessments,
  updateAssessments,
  deleteAssessments
};