// services/coursePlanDetailService.js

const repository = require("../repositories/coursePlanDetailRepository");

exports.getDetail = async ({ coursePlanId, rev }) => {

  if (!coursePlanId || rev === undefined) {
    const error = new Error("INVALID_PARAMS");
    error.code = "INVALID_PARAMS";
    throw error;
  }

  const data = await repository.findDetails({ coursePlanId, rev });

  if (!Array.isArray(data)) {
    return [];
  }

  return data;
};

exports.getDetailById = async (id) => {

  if (!id) {
    const error = new Error("ID_REQUIRED");
    error.code = "ID_REQUIRED";
    throw error;
  }

  const data = await repository.findDetailById(id);

  if (!data) {
    return null;
  }

  return data;
};

exports.createDetail = async (data) => {

  if (!data) {
    const error = new Error("DATA_REQUIRED");
    error.code = "DATA_REQUIRED";
    throw error;
  }

  return repository.createDetail(data);
};

exports.updateDetail = async (id, data) => {

  if (!id) {
    const error = new Error("ID_REQUIRED");
    error.code = "ID_REQUIRED";
    throw error;
  }

  return repository.updateDetail(id, data);
};

exports.deleteDetail = async (id) => {

  if (!id) {
    const error = new Error("ID_REQUIRED");
    error.code = "ID_REQUIRED";
    throw error;
  }

  return repository.deleteDetail(id);
};