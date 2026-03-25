// controllers/courseLoDetailController.js

const courseLoDetailService = require("../services/courseLoDetailService");

const getPeta = async (req, res) => {
  try {
    const { id, rev } = req.params;

    const data = await courseLoDetailService.getPeta({ id, rev });

    return res.render("admin/cplToCpmk", { data });

  } catch (err) {
    console.error("getPeta error:", err);

    return res.status(500).render("err500", {
      error: err.message
    });
  }
};

const cetak = async (req, res) => {
  try {
    const { id, rev } = req.params;

    const data = await courseLoDetailService.cetak({ id, rev });

    return res.render("admin/cetakCplCPmk", { data });

  } catch (err) {
    console.error("cetak error:", err);

    return res.status(500).render("err500", {
      error: err.message
    });
  }
};

const getCurriculumLos = async (req, res) => {
  try {
    const { coursePlanId, rev, clId } = req.params;

    const data = await courseLoDetailService.getCurriculumLos({
      coursePlanId,
      rev,
      clId
    });

    return res.json(data);

  } catch (err) {
    console.error("getCurriculumLos error:", err);

    return res.status(500).json({
      error: err.message
    });
  }
};

const hapusCP = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await courseLoDetailService.hapusCP(id);

    return res.json(result);

  } catch (err) {
    console.error("hapusCP error:", err);

    return res.status(500).json({
      error: err.message
    });
  }
};

const tambahCP = async (req, res) => {
  try {
    const result = await courseLoDetailService.tambahCP(req.body);

    return res.json(result);

  } catch (err) {
    console.error("tambahCP error:", err);

    return res.status(500).json({
      error: err.message
    });
  }
};

module.exports = {
  getPeta,
  cetak,
  getCurriculumLos,
  hapusCP,
  tambahCP
};