//scripts/seed-users.js

const models = require("../models");
const bcrypt = require("bcrypt");

const User = models.Users;

async function seed() {

  const passwordHash = await bcrypt.hash("123456", 10);

  await User.bulkCreate([
    {
      name: "Admin",
      email: "admin@mail.com",
      password: passwordHash,
      role: "admin"
    },
    {
      name: "Dosen",
      email: "dosen@mail.com",
      password: passwordHash,
      role: "dosen"
    },
    {
      name: "Mahasiswa",
      email: "mhs@mail.com",
      password: passwordHash,
      role: "mahasiswa"
    }
  ]);

  console.log("✔ users seeded");
  process.exit();
}

seed();