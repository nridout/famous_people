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
var personName = process.argv[2];

// Uses the input name to find and output famous people by their first or last name.
knex('famous_people').where('first_name', personName).orWhere("last_name", personName)
  .then((rows) => {
    console.log(`Searching ...`);
    console.log(`Found ${rows.length} person(s) by the name '${personName}':`)
    // Counts number of result records
    let count = 1;
    for (row of rows) {
      // Formats the date
      let date = (row.birthdate).toISOString().split('T')[0].split('-').join('-')
      // Log each result
      console.log(`- ${count}: ${row['first_name']} ${row['last_name']}, born '${date}'`);
      count++;
    }
  // Handle errors
  }).catch((err) => { console.log(err); throw err })
  .finally(() => {
    // Kill the DB connection
    knex.destroy();
  });

