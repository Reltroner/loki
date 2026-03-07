// services/coursePlanService.js

const repository = require("../repositories/coursePlanRepository");

/*
|--------------------------------------------------------------------------
| INTERNAL HELPERS
|--------------------------------------------------------------------------
*/

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const normalizeTerm = (term) => {
  if (!term) return null;
  const value = String(term).trim();
  return value.length === 0 ? null : value;
};


/*
|--------------------------------------------------------------------------
| GET SINGLE COURSE PLAN
|--------------------------------------------------------------------------
*/

const getCoursePlan = async (courseId, rev) => {

  assert(courseId, "courseId is required");
  assert(rev, "rev is required");

  const result = await repository.findCoursePlan(courseId, rev);

  if (!Array.isArray(result) || result.length === 0) {
    return null;
  }

  return result;

};


/*
|--------------------------------------------------------------------------
| GET ALL COURSE PLANS (ADMIN / MAHASISWA)
|--------------------------------------------------------------------------
*/

const getCoursesAdmin = async () => {

  const results = await repository.findAllCoursePlans();

  if (!Array.isArray(results) || results.length === 0) {
    return [];
  }

  /*
  Deduplicate berdasarkan course_id
  karena satu course memiliki banyak revision
  */

  const map = new Map();

  for (const item of results) {

    if (!map.has(item.course_id)) {
      map.set(item.course_id, item);
    }

  }

  return Array.from(map.values());

};


/*
|--------------------------------------------------------------------------
| SEARCH COURSE PLAN
|--------------------------------------------------------------------------
*/

const searchCoursePlan = async (term) => {

  const normalized = normalizeTerm(term);

  if (!normalized) {
    return [];
  }

  const results = await repository.searchCoursePlan(normalized);

  if (!Array.isArray(results)) {
    return [];
  }

  return results;

};


/*
|--------------------------------------------------------------------------
| UPDATE COURSE PLAN
|--------------------------------------------------------------------------
*/

const updateCoursePlan = async (courseId, rev, payload = {}) => {

  assert(courseId, "courseId is required");
  assert(rev, "rev is required");

  return repository.updateCoursePlan(
    courseId,
    rev,
    payload
  );

};


/*
|--------------------------------------------------------------------------
| CREATE REVISION
|--------------------------------------------------------------------------
*/

const createRevision = async (payload = {}) => {

  assert(payload.course_id, "course_id is required");
  assert(payload.rev !== undefined, "rev is required");

  const revision = Number(payload.rev);

  assert(!Number.isNaN(revision), "rev must be numeric");

  payload.rev = revision + 1;

  return repository.createRevision(payload);

};


/*
|--------------------------------------------------------------------------
| EXPORT
|--------------------------------------------------------------------------
*/

module.exports = {
  getCoursePlan,
  getCoursesAdmin,
  searchCoursePlan,
  updateCoursePlan,
  createRevision
};