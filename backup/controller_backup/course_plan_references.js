// controller/course_plan_references.js

const { CoursePlans, CoursePlanReferences } = require("../models");

/*
|--------------------------------------------------------------------------
| GET REFERENCES
|--------------------------------------------------------------------------
*/

const getReferences = async (req, res) => {

  try {

    const result = await CoursePlans.findAll({

      attributes: ["id", "rev", "course_id", "name", "semester"],

      include: [
        {
          model: CoursePlanReferences,
          attributes: [
            "id",
            "course_plan_id",
            "title",
            "author",
            "publisher",
            "year",
            "description"
          ],
        },
      ],

      where: {
        rev: req.params.rev,
        id: req.params.id,
      },

    });


    if (result.length > 0) {
      return res.render("dosen/referensi", { items: result });
    }

    return res.render("dosen/add_referensi", { items: result });


  } catch (error) {

    return res.status(404).json({
      message: error.message,
    });

  }

};


/*
|--------------------------------------------------------------------------
| GET REFERENCE BY ID
|--------------------------------------------------------------------------
*/

const getReferenceById = async (req, res) => {

  try {

    const result = await CoursePlanReferences.findOne({

      attributes: [
        "id",
        "course_plan_id",
        "title",
        "author",
        "publisher",
        "year",
        "description"
      ],

      where: {
        id: req.params.id,
      },

    });


    if (result) {
      return res.render("dosen/edit_referensi", { items: result });
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
| CREATE REFERENCE
|--------------------------------------------------------------------------
*/

const createReference = async (req, res) => {

  try {

    const course_plan_id = req.params.id;

    const {
      title,
      author,
      publisher,
      year,
      description
    } = req.body;


    await CoursePlanReferences.create({

      course_plan_id,
      title,
      author,
      publisher,
      year,
      description,

    });

  } catch (error) {

    return res.json({
      message: error.message,
    });

  }

};


/*
|--------------------------------------------------------------------------
| UPDATE REFERENCE
|--------------------------------------------------------------------------
*/

const updateReference = async (req, res) => {

  try {

    const {
      title,
      author,
      publisher,
      year,
      description
    } = req.body;


    await CoursePlanReferences.update(

      {
        title,
        author,
        publisher,
        year,
        description,
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
| DELETE REFERENCE
|--------------------------------------------------------------------------
*/

const deleteReference = async (req, res) => {

  try {

    await CoursePlanReferences.destroy({

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
  getReferences,
  getReferenceById,
  createReference,
  updateReference,
  deleteReference
};