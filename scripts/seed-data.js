// scripts/seed-data.js

const { sequelize, Curricula, Courses, Lecturers, CoursePlans, Users } = require("../models");
const bcrypt = require("bcrypt");

async function seed() {
  try {

    await sequelize.authenticate();

    if (await Users.count() > 0) {
      console.log("Database already seeded");
      return;
    }

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

    await Lecturers.create({
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

    await Users.create({
      name: "Admin",
      email: "admin@example.com",
      password: await bcrypt.hash("admin123", 10),
      type: "admin"
    });

    console.log("Seed completed");

  } catch (err) {
    console.error(err);
  } finally {
    await sequelize.close();
  }
}

seed();