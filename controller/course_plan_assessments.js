// controller/course_plan_assessments.js

const { Op } = require("sequelize");

const {
  CoursePlanAssessments,
  CoursePlans
} = require("../models");


/*
|--------------------------------------------------------------------------
| GET ASSESSMENTS
|--------------------------------------------------------------------------
*/

const getAssessments = async (req, res) => {

  try {

    const result = await CoursePlans.findAll({

      attributes: ["id", "rev", "course_id", "name", "semester"],

      include: [
        {
          model: CoursePlanAssessments,
          attributes: ["id", "course_plan_id", "name", "percentage"],
        },
      ],

      where: {
        rev: req.params.rev,
        id: req.params.id,
      },

    });


    if (result.length > 0) {

      return res.render("dosen/penilaian", { items: result });

    }

    return res.render("dosen/add_penilaian", { items: result });


  } catch (error) {

    return res.status(404).json({
      message: error.message,
    });

  }

};


/*
|--------------------------------------------------------------------------
| GET ASSESSMENT BY ID
|--------------------------------------------------------------------------
*/

const getAssessmentsById = async (req, res) => {

  try {

    const result = await CoursePlanAssessments.findOne({

      attributes: ["id", "course_plan_id", "name", "percentage"],

      where: {
        id: req.params.id,
      },

    });


    if (result) {

      return res.render("dosen/edit_penilaian", { items: result });

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
| CREATE ASSESSMENT
|--------------------------------------------------------------------------
*/

const createAssessments = async (req, res) => {

  try {

    const course_plan_id = req.params.id;

    const { name, percentage } = req.body;


    await CoursePlanAssessments.create({

      course_plan_id,
      name,
      percentage,
      flag: 1,

    });


  } catch (error) {

    return res.json({

      message: error.message,

    });

  }

};


/*
|--------------------------------------------------------------------------
| UPDATE ASSESSMENT
|--------------------------------------------------------------------------
*/

const updateAssessments = async (req, res) => {

  try {

    const { name, percentage } = req.body;


    await CoursePlanAssessments.update(

      {
        name,
        percentage,
      },

      {
        where: {
          id: req.params.id,
        },
      }

    );

  } catch (error) {

    return res.json({

      message: error.message,

    });

  }

};


/*
|--------------------------------------------------------------------------
| DELETE ASSESSMENT
|--------------------------------------------------------------------------
*/

const deleteAssessments = async (req, res) => {

  try {

    await CoursePlanAssessments.destroy({

      where: {
        id: req.params.id,
      },

    });

  } catch (error) {

    return res.json({

      message: error.message,

    });

  }

};


module.exports = {
  getAssessments,
  getAssessmentsById,
  createAssessments,
  updateAssessments,
  deleteAssessments,
};