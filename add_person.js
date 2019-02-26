// Require postgress and database settings file
const pg = require("pg");
const settings = require("./settings"); // settings.json

// Applies settings to the db
const options = {
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database
  }
};

// Connect to database
const knex = require('knex')(options);

// Accepts name from the command line
var newPerson = process.argv.slice(2);

// const newRecord = { first_name: 'Audi', last_name: '52642', birthdate: 0000-00-00 }

const newRecord = {};
newRecord.first_name = newPerson[0];
newRecord.last_name = newPerson[1];
newRecord.birthdate = newPerson[2];

knex('famous_people').insert(newRecord).then(() => console.log("data inserted"))
  .catch((err) => { console.log(err); throw err })
  .finally(() => {
    knex.destroy();
  });


