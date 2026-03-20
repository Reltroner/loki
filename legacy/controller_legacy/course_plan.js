// controller/course_plan.js

const { CoursePlans } = require("../models");
const { baseAttributes, baseInclude } = require("../services/coursePlanQuery");


/*
|--------------------------------------------------------------------------
| GET COURSE PLAN (DOSEN VIEW)
|--------------------------------------------------------------------------
*/

const getCourses = async (req, res) => {

  try {

    const result = await CoursePlans.findAll({

      attributes: baseAttributes,
      include: baseInclude(),

      where: {
        course_id: req.params.id,
        rev: req.params.rev,
      },

    });


    if (!result.length) {

      return res.status(200).json({
        message: "data tidak ada",
        data: [],
      });

    }


    return res.render("dosen/course_plan", { items: result });


  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }

};


/*
|--------------------------------------------------------------------------
| CETAK RPS
|--------------------------------------------------------------------------
*/

const cetakRps = async (req, res) => {

  try {

    const result = await CoursePlans.findAll({

      attributes: baseAttributes,
      include: baseInclude(),

      where: {
        course_id: req.params.id,
        rev: req.params.rev,
      },

    });


    if (!result.length) {

      return res.status(200).json({
        message: "data tidak ada",
        data: [],
      });

    }


    return res.render("dosen/cetakRps", { items: result });


  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }

};


/*
|--------------------------------------------------------------------------
| ADMIN COURSES PLAN
|--------------------------------------------------------------------------
*/

const coursesAdmin = async (req, res) => {

  try {

    const result = await CoursePlans.findAll({

      attributes: [
        "id",
        "course_id",
        "rev",
        "name",
        "semester",
        "code",
        "credit"
      ],

      include: baseInclude(),

      order: [["rev", "DESC"]],

    });


    const unique = Object.values(

      result.reduce((acc, item) => {

        if (!acc[item.course_id]) {
          acc[item.course_id] = item;
        }

        return acc;

      }, {})

    );


    return res.render("admin/coursesPlan", { items: unique });


  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }

};


module.exports = {
  getCourses,
  cetakRps,
  coursesAdmin
};