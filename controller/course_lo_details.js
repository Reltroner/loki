// controller/course_lo_details.js

const { Op } = require("sequelize");

const {
  CourseLoDetails,
  CourseLos,
  CurriculumLos,
  CoursePlans,
} = require("../models");


/*
|--------------------------------------------------------------------------
| GET CURRICULUM LOS
|--------------------------------------------------------------------------
*/

const getCurriculumLos = async (req, res) => {

  const cld = await CourseLoDetails.findAll({

    attributes: ["id", "curriculum_lo_id", "course_lo_id"],

    include: [
      {
        model: CurriculumLos,
        attributes: ["id", "code", "name"],
        required: false,
      },
      {
        model: CourseLos,
        attributes: ["id", "course_plan_id", "code", "name"],
        required: false,
        where: {
          id: req.params.id,
        },
      },
    ],

    where: {
      course_lo_id: req.params.cl,
    },

  });


  const course_plan = await CoursePlans.findAll({

    attributes: ["id", "rev"],

    where: {
      id: req.params.id,
      rev: req.params.rev,
    },

  });


  const cp = await CurriculumLos.findAll({

    order: [["id", "ASC"]],

    attributes: ["id", "curriculum_id", "code", "name"],

  });


  const id = req.params.cl;

  const cpmk = await CourseLos.findOne({

    attributes: ["id", "course_plan_id", "code", "name"],

    where: {
      id: id,
    },

  });


  res.render("dosen/cpl", { course_plan, cld, cp, cpmk });

};


/*
|--------------------------------------------------------------------------
| TAMBAH CP
|--------------------------------------------------------------------------
*/

const tambahCP = async (req, res) => {

  const { id_cpmk, id_cpl } = req.body;

  const cplExist = await CourseLoDetails.findOne({

    attributes: ["curriculum_lo_id", "course_lo_id"],

    where: {
      [Op.and]: [
        { curriculum_lo_id: id_cpl },
        { course_lo_id: id_cpmk }
      ]
    },

  });


  if (cplExist) return res.status(400).send("CP sudah ada");


  try {

    await CourseLoDetails.create({

      curriculum_lo_id: id_cpl,
      course_lo_id: id_cpmk,

    });

    res.redirect("back");

  } catch (error) {

    res.json({ message: error.message });

  }

};


/*
|--------------------------------------------------------------------------
| HAPUS CP
|--------------------------------------------------------------------------
*/

const hapusCP = async (req, res) => {

  try {

    await CourseLoDetails.destroy({

      where: {
        id: req.params.id,
      },

    });

    res.redirect("back");

  } catch (error) {

    res.json({ message: error.message });

  }

};


/*
|--------------------------------------------------------------------------
| GET PETA CPL → CPMK
|--------------------------------------------------------------------------
*/

const getPeta = async (req, res) => {

  const course_plan = await CoursePlans.findOne({

    attributes: ["id", "rev", "name"],

    where: {
      id: req.params.id,
      rev: req.params.rev,
    },

  });


  const cp = await CurriculumLos.findAll({

    order: [["id", "ASC"]],

    attributes: ["id", "curriculum_id", "code", "name"],

  });


  const course_plan_id = req.params.id;


  const cpmkAll = await CourseLos.findAll({

    attributes: ["id", "course_plan_id", "code", "name"],

    include: [
      {
        model: CurriculumLos,
        attributes: ["id", "code", "name"],
        required: false,
      },
    ],

    where: {
      course_plan_id: course_plan_id,
    },

  });


  res.render("admin/cplToCpmk", { course_plan, cp, cpmkAll });

};


/*
|--------------------------------------------------------------------------
| CETAK PETA CPL → CPMK
|--------------------------------------------------------------------------
*/

const cetak = async (req, res) => {

  const course_plan = await CoursePlans.findOne({

    attributes: ["id", "rev", "name"],

    where: {
      id: req.params.id,
      rev: req.params.rev,
    },

  });


  const cp = await CurriculumLos.findAll({

    order: [["id", "ASC"]],

    attributes: ["id", "curriculum_id", "code", "name"],

  });


  const course_plan_id = req.params.id;


  const cpmkAll = await CourseLos.findAll({

    attributes: ["id", "course_plan_id", "code", "name"],

    include: [
      {
        model: CurriculumLos,
        attributes: ["id", "code", "name"],
        required: false,
      },
    ],

    where: {
      course_plan_id: course_plan_id,
    },

  });


  res.render("admin/cetakCplCPmk", { course_plan, cp, cpmkAll });

};


module.exports = {
  cetak,
  getPeta,
  getCurriculumLos,
  tambahCP,
  hapusCP,
};