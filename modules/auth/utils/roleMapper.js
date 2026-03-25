// modules/auth/utils/roleMapper.js

const typeToRole = {
  T: "admin",
  D: "dosen",
  M: "mahasiswa"
};

const roleToType = {
  admin: "T",
  dosen: "D",
  mahasiswa: "M"
};

function normalizeRole(user) {
  if (!user) return null;

  if (user.role) return user.role;

  if (user.type) return typeToRole[user.type] || "guest";

  return "guest";
}

module.exports = {
  normalizeRole,
  typeToRole,
  roleToType
};