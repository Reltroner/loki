// scripts/seed-data.js

const {
  sequelize,
  Curricula,
  Courses,
  Lecturers,
  CoursePlans,
  Users
} = require("../models");

const bcrypt = require("bcrypt");

async function seed() {
  const transaction = await sequelize.transaction();

  try {
    console.log("Seeding database...");

    // 🔐 Ensure connection
    await sequelize.authenticate();

    // 🔥 CRITICAL: ensure tables exist BEFORE any query
    await sequelize.sync();

    // 🔍 Check if already seeded (SAFE now because tables exist)
    const userCount = await Users.count({ transaction });

    if (userCount > 0) {
      console.log("Database already seeded");
      await transaction.rollback();
      return;
    }

    // 📚 Create curriculum
    const curriculum = await Curricula.create({
      name: "Computer Science",
      active: "1",
      year_start: 2024,
      year_end: 2028,
      description: "Computer Science Curriculum"
    }, { transaction });

    // 📘 Create course
    const course = await Courses.create({
      curriculum_id: curriculum.id,
      code: "CS101",
      name: "Introduction to Computer Science",
      alias_name: "Intro CS"
    }, { transaction });

    // 👨‍🏫 Create lecturer
    await Lecturers.create({
      name: "Dr. Ahmad",
      reg_id: "REG001",
      phone: "08123456789",
      status: 1
    }, { transaction });

    // 📄 Create course plan
    await CoursePlans.create({
      course_id: course.id,
      rev: 1,
      code: "CS101",
      name: "Intro CS Plan",
      credit: 3,
      semester: 1
    }, { transaction });

    // 🔐 Create admin user (SOURCE OF TRUTH)
    await Users.create({
      name: "Admin",
      email: "admin@unand.ac.id",
      password: await bcrypt.hash("12345", 10),
      role: "admin"
    }, { transaction });

    // ✅ Commit all
    await transaction.commit();

    console.log("✅ Seed completed successfully");

  } catch (err) {
    console.error("❌ Seed error:", err);

    await transaction.rollback();

  } finally {
    await sequelize.close();
  }
}

seed();