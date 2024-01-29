const clients = {};

const addConn = (userID, conn) => {
  if (clients[userID]) {
    clients[userID].push(conn);
  } else {
    clients[userID] = [conn];
  }
};

const removeConn = (userID, index) => {
  // clients[userID].splice(0, index);
};

module.exports = {
  addConn,
  removeConn,
  clients
};
