//scripts/seed-users.js

const models = require("../models");
const User = models.Users;

async function seed() {
  await User.bulkCreate([
    {
      name: "Admin",
      email: "admin@mail.com",
      password: "hashed_password",
      role: "admin"
    },
    {
      name: "Dosen",
      email: "dosen@mail.com",
      password: "hashed_password",
      role: "dosen"
    },
    {
      name: "Mahasiswa",
      email: "mhs@mail.com",
      password: "hashed_password",
      role: "mahasiswa"
    }
  ]);

  console.log("✔ users seeded");
  process.exit();
}

seed();