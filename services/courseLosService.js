// services/courseLosService.js

const repository = require("../repositories/courseLosRepository");

exports.getCourseLos = async ({ coursePlanId, rev }) => {

  if (!coursePlanId || rev === undefined) {
    throw new Error("INVALID_PARAMS");
  }

  const data = await repository.findCourseLos({ coursePlanId, rev });

  if (!Array.isArray(data)) {
    return [];
  }

  return data;
};

exports.getCourseLosById = async (id) => {

  if (!id) {
    throw new Error("ID_REQUIRED");
  }

  const data = await repository.findCourseLosById(id);

  if (!data) {
    return null;
  }

  return data;
};

exports.createCourseLos = async (data) => {

  if (!data) {
    throw new Error("DATA_REQUIRED");
  }

  return repository.createCourseLos(data);
};

exports.updateCourseLos = async (id, data) => {

  if (!id) {
    throw new Error("ID_REQUIRED");
  }

  return repository.updateCourseLos(id, data);
};

exports.deleteCourseLos = async (id) => {

  if (!id) {
    throw new Error("ID_REQUIRED");
  }

  return repository.deleteCourseLos(id);
};