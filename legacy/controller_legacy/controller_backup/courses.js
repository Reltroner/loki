// controller/courses.js

const { Sequelize } = require("sequelize");

const {
  CoursePlans,
  Courses,
  Lecturers,
  Curricula
} = require("../models");


/*
|--------------------------------------------------------------------------
| GET ALL COURSES (DOSEN)
|--------------------------------------------------------------------------
*/

const getAllCourses = async (req, res) => {

  try {

    const result = await CoursePlans.findAll({

      attributes: [
        "id",
        "course_id",
        [Sequelize.fn("MAX", Sequelize.col("rev")), "rev"],
        "name",
        "semester"
      ],

      group: ["course_id"],

      include: [
        {
          model: Courses,
          attributes: ["name", "semester", "curriculum_id"],
          required: true,
        },
        {
          model: Lecturers,
          attributes: ["id", "name"],
          through: {
            attributes: ["updated_at", "created_at"],
          },
          required: true,
          where: {
            id: req.params.id,
          },
        },
      ],

    });


    if (result.length > 0) {
      return res.render("dosen/courses", { items: result });
    }

    return res.render("dosen/no_rps");


  } catch (error) {

    return res.status(404).json({
      message: error.message,
    });

  }

};


/*
|--------------------------------------------------------------------------
| GET MATA KULIAH
|--------------------------------------------------------------------------
*/

const getMatkul = async (req, res) => {

  try {

    const result = await Courses.findAll({

      attributes: [
        "id",
        "name",
        "semester",
        "code",
        "alias_name"
      ],

      include: [
        {
          model: Curricula,
          attributes: ["id", "name"],
          required: true,
        },
      ],

    });


    if (result.length > 0) {
      return res.render("dosen/add_rps", { items: result });
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
| CREATE COURSE PLAN
|--------------------------------------------------------------------------
*/

const createCourse = async (req, res) => {

  try {

    const {
      course_id,
      rev,
      code,
      name,
      alias_name,
      credit,
      semester,
      description
    } = req.body;


    await CoursePlans.create({

      course_id,
      rev,
      code,
      name,
      alias_name,
      credit,
      semester,
      description,

    });


  } catch (error) {

    return res.json({
      message: error.message,
    });

  }

};


module.exports = {
  getAllCourses,
  createCourse,
  getMatkul
};