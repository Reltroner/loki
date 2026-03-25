// controllers/coursePlanReferenceController.js

const coursePlanReferenceService = require("../services/coursePlanReferenceService");

const getReferences = async (req, res) => {
  try {
    const { coursePlanId, rev } = req.params;

    const data = await coursePlanReferenceService.getReferences({
      coursePlanId,
      rev
    });

    return res.render("dosen/referensi", { data });

  } catch (err) {
    console.error("getReferences error:", err);

    return res.status(500).render("err500", {
      error: err.message
    });
  }
};

const createReference = async (req, res) => {
  try {
    const { coursePlanId, rev } = req.params;

    const result = await coursePlanReferenceService.createReference({
      ...req.body,
      coursePlanId,
      rev
    });

    return res.json(result);

  } catch (err) {
    console.error("createReference error:", err);

    return res.status(500).json({
      error: err.message
    });
  }
};

const getReferenceById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await coursePlanReferenceService.getReferenceById(id);

    return res.render("dosen/edit_referensi", { data });

  } catch (err) {
    console.error("getReferenceById error:", err);

    return res.status(500).render("err500", {
      error: err.message
    });
  }
};

const updateReference = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await coursePlanReferenceService.updateReference(id, req.body);

    return res.json(result);

  } catch (err) {
    console.error("updateReference error:", err);

    return res.status(500).json({
      error: err.message
    });
  }
};

const deleteReference = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await coursePlanReferenceService.deleteReference(id);

    return res.json(result);

  } catch (err) {
    console.error("deleteReference error:", err);

    return res.status(500).json({
      error: err.message
    });
  }
};

module.exports = {
  getReferences,
  createReference,
  getReferenceById,
  updateReference,
  deleteReference
};