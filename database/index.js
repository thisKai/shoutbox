const { connect } = require('camo');

let database;

async function init() {
  database = connect(`nedb://${__dirname}/.data`);
}
async function get() {
  if(!database) {
    init();
  }
  return database
}

module.exports = get;
