const fs = require("fs");
const data = require('../../data.json')

module.exports = (client) => {
  client.fetchJSON = () => {
    return data
  };
};
