// controller/course_plan_lecturers.js

const { Op } = require("sequelize");

const {
  CoursePlanLecturers,
  Lecturers,
  CoursePlans
} = require("../models");


/*
|--------------------------------------------------------------------------
| GET DOSEN PENGAMPU
|--------------------------------------------------------------------------
*/

const getDosen = async (req, res) => {

  try {

    const pengampu = await CoursePlanLecturers.findAll({

      attributes: ["id", "course_plan_id", "lecturer_id", "creator"],

      include: [
        {
          model: Lecturers,
          attributes: ["id", "name", "phone", "reg_id"],
          required: false,
        },
        {
          model: CoursePlans,
          attributes: ["id", "rev"],
          required: false,
          where: {
            id: req.params.id,
            rev: req.params.rev,
          },
        },
      ],

      where: {
        course_plan_id: req.params.id,
      },

    });


    const dosen = await Lecturers.findAll({

      order: [["name", "ASC"]],
      attributes: ["id", "name"],

    });


    const rps = await CoursePlans.findOne({

      attributes: ["id", "course_id", "name", "semester"],

      where: {
        id: req.params.id,
      },

    });


    return res.render("admin/dosenPengampu", {
      pengampu,
      dosen,
      rps
    });


  } catch (error) {

    return res.json({
      message: error.message
    });

  }

};


/*
|--------------------------------------------------------------------------
| TAMBAH DOSEN
|--------------------------------------------------------------------------
*/

const tambahDosen = async (req, res) => {

  const { id_rps, id_dosen } = req.body;

  const dosenExist = await CoursePlanLecturers.findOne({

    attributes: ["course_plan_id", "lecturer_id"],

    where: {
      [Op.and]: [
        { course_plan_id: id_rps },
        { lecturer_id: id_dosen }
      ]
    },

  });


  if (dosenExist) {
    return res.status(400).send("Dosen sudah ada");
  }


  try {

    await CoursePlanLecturers.create({

      course_plan_id: id_rps,
      lecturer_id: id_dosen,
      creator: 0,

    });

    return res.redirect("back");


  } catch (error) {

    return res.json({
      message: error.message
    });

  }

};


/*
|--------------------------------------------------------------------------
| HAPUS DOSEN
|--------------------------------------------------------------------------
*/

const hapusDosen = async (req, res) => {

  try {

    await CoursePlanLecturers.destroy({

      where: {
        id: req.params.id,
      },

    });

    return res.redirect("back");


  } catch (error) {

    return res.json({
      message: error.message
    });

  }

};


module.exports = {
  getDosen,
  tambahDosen,
  hapusDosen
};