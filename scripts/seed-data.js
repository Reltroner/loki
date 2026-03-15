// scripts/seed-data.js

const { Curricula, Courses, Lecturers, CoursePlans } = require("../models");

async function seed() {

  const curriculum = await Curricula.create({
    name: "Computer Science",
    active: "1",
    year_start: 2024,
    year_end: 2028,
    description: "Computer Science Curriculum"
  });

  const course = await Courses.create({
    curriculum_id: curriculum.id,
    code: "CS101",
    name: "Introduction to Computer Science",
    alias_name: "Intro CS"
  });

  const lecturer = await Lecturers.create({
    name: "Dr. Ahmad",
    reg_id: "REG001",
    phone: "08123456789",
    status: 1
  });

  await CoursePlans.create({
    course_id: course.id,
    rev: 1,
    code: "CS101",
    name: "Intro CS Plan",
    credit: 3,
    semester: 1
  });

  console.log("Seed completed.");

}

seed();