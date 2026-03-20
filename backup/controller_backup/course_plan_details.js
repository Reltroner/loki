// controller/course_plan_details.js

const { CoursePlans, CoursePlanDetails } = require("../models");

/*
|--------------------------------------------------------------------------
| GET COURSE PLAN DETAILS
|--------------------------------------------------------------------------
*/

const getDetail = async (req, res) => {

  try {

    const result = await CoursePlans.findAll({

      attributes: ["id", "rev", "course_id", "name", "semester"],

      include: [
        {
          model: CoursePlanDetails,
          attributes: [
            "id",
            "course_plan_id",
            "week",
            "material",
            "method",
            "student_experience"
          ],
        },
      ],

      where: {
        rev: req.params.rev,
        id: req.params.id,
      },

    });


    if (result.length > 0) {
      return res.render("dosen/pertemuan", { items: result });
    }

    return res.render("dosen/add_pertemuan", { items: result });


  } catch (error) {

    return res.status(404).json({
      message: error.message,
    });

  }

};


/*
|--------------------------------------------------------------------------
| GET DETAIL BY ID
|--------------------------------------------------------------------------
*/

const getDetailById = async (req, res) => {

  try {

    const result = await CoursePlanDetails.findOne({

      attributes: [
        "id",
        "course_plan_id",
        "week",
        "material",
        "method",
        "student_experience"
      ],

      where: {
        id: req.params.id,
      },

    });


    if (result) {
      return res.render("dosen/edit_pertemuan", { items: result });
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
| CREATE DETAIL
|--------------------------------------------------------------------------
*/

const createDetail = async (req, res) => {

  try {

    const course_plan_id = req.params.id;

    const { week, material, method, student_experience } = req.body;


    await CoursePlanDetails.create({

      course_plan_id,
      week,
      material,
      method,
      student_experience,

    });

  } catch (error) {

    return res.json({
      message: error.message,
    });

  }

};


/*
|--------------------------------------------------------------------------
| UPDATE DETAIL
|--------------------------------------------------------------------------
*/

const updateDetail = async (req, res) => {

  try {

    const { week, material, method, student_experience } = req.body;


    await CoursePlanDetails.update(

      {
        week,
        material,
        method,
        student_experience,
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
| DELETE DETAIL
|--------------------------------------------------------------------------
*/

const deleteDetail = async (req, res) => {

  try {

    await CoursePlanDetails.destroy({

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
  getDetail,
  getDetailById,
  createDetail,
  updateDetail,
  deleteDetail
};