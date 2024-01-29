const { queryDatabase } = require("../utils/utils");

const createUserInDB = ({ name, email, password, phone_no }) => {
  const query = `INSERT INTO users(name, email, password, phone_no)
                  VALUES( '${name}','${email}','${password}','${phone_no}') `;
  return queryDatabase(query);
};
const updateUserInDB = (id, keys, data, updateTime) => {
  const updateCols = keys.reduce((prev, currKey) => {
    return `${prev} ${currKey} = '${data[currKey]}',`;
  }, "");

  const query = `UPDATE users
                   SET ${updateCols} updated_at = '${updateTime}'
                   WHERE id = '${id}'
                   RETURNING id, name, email, phone_no
                  `;

  return queryDatabase(query);
};

function createUserTable() {
  const query = `CREATE TABLE IF NOT EXISTS users(
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
                name VARCHAR NOT NULL,
                email VARCHAR NOT NULL,
                password VARCHAR NOT NULL,
                phone_no VARCHAR NOT NULL,
                created_at TIMESTAMP DEFAULT current_timestamp NOT NULL,
                updated_at TIMESTAMP DEFAULT NULL
                )`;
 return queryDatabase(query);
}

const searchUserById = (id) => {
  const query = `SELECT * from users WHERE id='${id}'`;
  return queryDatabase(query);
};

const searchAllUsers = (limit = 10, offset = 0) => {
  const query = `SELECT * from users
                   ORDER BY name  
                   LIMIT ${limit} OFFSET ${offset}
                 `;
  return queryDatabase(query);
};

module.exports = {
  createUserTable,
  createUserInDB,
  updateUserInDB,
  searchUserById,
  searchAllUsers,
};
