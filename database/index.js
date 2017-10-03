const path = require('path');
const { connect } = require('camo');

let database;

async function init() {
  const url = path.resolve(__dirname, '..');
  database = connect(`nedb://${url}/.data`);
}
async function get() {
  if(!database) {
    init();
  }
  return database
}

module.exports = get;
