// services/coursePlanDetailService.js

const repository = require("../repositories/coursePlanDetailRepository");

exports.getDetail = async ({ coursePlanId, rev }) => {

  if (!coursePlanId || rev === undefined) {
    throw new Error("INVALID_PARAMS");
  }

  const data = await repository.findDetails({ coursePlanId, rev });

  if (!Array.isArray(data)) {
    return [];
  }

  return data;
};

exports.getDetailById = async (id) => {

  if (!id) {
    throw new Error("ID_REQUIRED");
  }

  const data = await repository.findDetailById(id);

  if (!data) {
    return null;
  }

  return data;
};

exports.createDetail = async (data) => {

  if (!data) {
    throw new Error("DATA_REQUIRED");
  }

  return repository.createDetail(data);
};

exports.updateDetail = async (id, data) => {

  if (!id) {
    throw new Error("ID_REQUIRED");
  }

  return repository.updateDetail(id, data);
};

exports.deleteDetail = async (id) => {

  if (!id) {
    throw new Error("ID_REQUIRED");
  }

  return repository.deleteDetail(id);
};