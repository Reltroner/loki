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
  if (!user) return "guest";

  // 🔥 PRIORITY 1: role (database)
  if (user.role) {
    const role = String(user.role).toLowerCase().trim();

    if (role === "admin") return "admin";
    if (role === "dosen") return "dosen";
    if (role === "mahasiswa") return "mahasiswa";

    return "guest"; // 🔥 unknown role → fallback
  }

  // 🔥 PRIORITY 2: legacy type (T/D/M)
  if (user.type) {
    return typeToRole[user.type] || "guest";
  }

  // 🔥 fallback
  return "guest";
}

module.exports = {
  normalizeRole,
  typeToRole,
  roleToType
};