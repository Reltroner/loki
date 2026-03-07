// controller/course_los.js

const { Op } = require("sequelize");

const {
  CourseLos,
  CoursePlans
} = require("../models");


/*
|--------------------------------------------------------------------------
| GET COURSE LOS
|--------------------------------------------------------------------------
*/

const getCourseLos = async (req, res) => {

  try {

    const result = await CoursePlans.findAll({

      attributes: ["id", "rev", "course_id", "name", "semester"],

      include: [
        {
          model: CourseLos,
          attributes: ["id", "course_plan_id", "code", "name"],
        },
      ],

      where: {
        rev: req.params.rev,
        id: req.params.id,
      },

    });


    if (result.length > 0) {

      return res.render("dosen/cpmk", { items: result });

    }

    return res.render("dosen/add_cpmk", { items: result });


  } catch (error) {

    return res.status(404).json({
      message: error.message,
    });

  }

};


/*
|--------------------------------------------------------------------------
| GET COURSE LOS BY ID
|--------------------------------------------------------------------------
*/

const getCourseLosById = async (req, res) => {

  try {

    const result = await CourseLos.findOne({

      attributes: ["id", "code", "name", "parent_id"],

      where: {
        id: req.params.id,
      },

    });


    if (result) {

      return res.render("dosen/edit_cpmk", { items: result });

    }


    return res.status(200).json({

      message: "data tidak ada",
      data: [],

    });


  } catch (error) {

    return res.status(404).json({

      message: error.message,

    });

  }

};


/*
|--------------------------------------------------------------------------
| CREATE COURSE LOS
|--------------------------------------------------------------------------
*/

const createCourseLos = async (req, res) => {

  try {

    const course_plan_id = req.params.id;

    const { code, name, parent_id } = req.body;


    await CourseLos.create({

      course_plan_id: course_plan_id,
      type: 1,
      code: code,
      name: name,
      parent_id: parent_id,

    });


  } catch (error) {

    return res.json({ message: error.message });

  }

};


/*
|--------------------------------------------------------------------------
| UPDATE COURSE LOS
|--------------------------------------------------------------------------
*/

const updateCourseLos = async (req, res) => {

  try {

    const { code, name, parent_id } = req.body;


    await CourseLos.update(

      {
        type: 1,
        code: code,
        name: name,
        parent_id: parent_id,
      },

      {
        where: {
          id: req.params.id,
        },
      }

    );

  } catch (error) {

    return res.json({ message: error.message });

  }

};


/*
|--------------------------------------------------------------------------
| DELETE COURSE LOS
|--------------------------------------------------------------------------
*/

const deleteCourseLos = async (req, res) => {

  try {

    await CourseLos.destroy({

      where: {
        id: req.params.id,
      },

    });

  } catch (error) {

    return res.json({ message: error.message });

  }

};


module.exports = {
  getCourseLos,
  createCourseLos,
  updateCourseLos,
  deleteCourseLos,
  getCourseLosById
};