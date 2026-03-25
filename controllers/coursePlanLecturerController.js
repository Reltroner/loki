// controllers/coursePlanLecturerController.js

const coursePlanLecturerService = require("../services/coursePlanLecturerService");

const getDosen = async (req, res) => {
  try {
    const { id, rev } = req.params;

    const data = await coursePlanLecturerService.getDosen({ id, rev });

    return res.render("admin/dosenPengampu", { data });

  } catch (err) {
    console.error("getDosen error:", err);

    return res.status(500).render("err500", {
      error: err.message
    });
  }
};

const tambahDosen = async (req, res) => {
  try {
    const result = await coursePlanLecturerService.tambahDosen(req.body);

    return res.json(result);

  } catch (err) {
    console.error("tambahDosen error:", err);

    return res.status(500).json({
      error: err.message
    });
  }
};

const hapusDosen = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await coursePlanLecturerService.hapusDosen(id);

    return res.json(result);

  } catch (err) {
    console.error("hapusDosen error:", err);

    return res.status(500).json({
      error: err.message
    });
  }
};

module.exports = {
  getDosen,
  tambahDosen,
  hapusDosen
};