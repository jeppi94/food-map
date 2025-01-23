const { pool } = require("../../config/database");

exports.selectRestautants = async function (connection, category) {
  const selectAllRestautantsQuery = `select title, address, category, videoUrl, mapUrl from Restaurants where status = 'A';`;
  const selectCategorizedRestautantsQuery = `select title, address, category, videoUrl, mapUrl from Restaurants where status = 'A' and category = ?;`;
  const Params = [category];

  const Query = category ? selectCategorizedRestautantsQuery : selectAllRestautantsQuery;

  const rows = await connection.query(Query, Params);

  return rows;
};

exports.exampleDao = async function (connection, params) {
  const Query = `SELECT * FROM Studnts`;
  const Params = [];

  const rows = await connection.query(Query, Params);

  return rows;
};

exports.selectStudents = async function (connection, studentIdx) {
  const Query = `select * from Studnts where studenIdx = ?;`;
  const Params = [studentIdx];

  const rows = await connection.query(Query, Params);

  return rows;
};

exports.insertStudents = async function (connection, studentName, major, address) {
  const Query = `insert into Studnts(studentName, major, address) values(?, ?, ?);`;
  const Params = [studentName, major, address];

  const rows = await connection.query(Query, Params);

  return rows;
};

exports.isValidStudentIdx = async function (connection, studentIdx) {
  const Query = `select * from Studnts where studenIdx = ? and status = 'A';`;
  const Params = [studentIdx];

  const [rows] = await connection.query(Query, Params);

  if(rows.length < 1){
    return false;
  }
  return true;
};

exports.updateStudents = async function (connection, studentIdx, studentName, major, address) {
  const Query = `update Studnts set studentName = ifnull(?, studentName), major = ifnull(?, major), address = ifnull(?, address) where studenIdx = ?;`;
  const Params = [studentName, major, address, studentIdx];

  const rows = await connection.query(Query, Params);

  return rows;
};

exports.deleteStudents = async function (connection, studentIdx) {
  const Query = `update Studnts set status = "D" where studenIdx = ?;`;
  const Params = [studentIdx];

  const rows = await connection.query(Query, Params);

  return rows;
};