// controllers/coursePlanDetailController.js

const coursePlanDetailService = require("../services/coursePlanDetailService");

const getDetail = async (req, res) => {
  try {
    const { coursePlanId, rev } = req.params;

    const data = await coursePlanDetailService.getDetail({
      coursePlanId,
      rev
    });

    return res.render("dosen/pertemuan", { data });

  } catch (err) {
    console.error("getDetail error:", err);

    return res.status(500).render("err500", {
      error: err.message
    });
  }
};

const getDetailById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await coursePlanDetailService.getDetailById(id);

    return res.render("dosen/edit_pertemuan", { data });

  } catch (err) {
    console.error("getDetailById error:", err);

    return res.status(500).render("err500", {
      error: err.message
    });
  }
};

const createDetail = async (req, res) => {
  try {
    const { coursePlanId, rev } = req.params;

    const result = await coursePlanDetailService.createDetail({
      ...req.body,
      coursePlanId,
      rev
    });

    return res.json(result);

  } catch (err) {
    console.error("createDetail error:", err);

    return res.status(500).json({
      error: err.message
    });
  }
};

const updateDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await coursePlanDetailService.updateDetail(id, req.body);

    return res.json(result);

  } catch (err) {
    console.error("updateDetail error:", err);

    return res.status(500).json({
      error: err.message
    });
  }
};

const deleteDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await coursePlanDetailService.deleteDetail(id);

    return res.json(result);

  } catch (err) {
    console.error("deleteDetail error:", err);

    return res.status(500).json({
      error: err.message
    });
  }
};

module.exports = {
  getDetail,
  getDetailById,
  createDetail,
  updateDetail,
  deleteDetail
};