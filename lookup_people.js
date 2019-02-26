// Require postgress and database settings file
const pg = require("pg");
const settings = require("./settings"); // settings.json

// Applies settings to the db
const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

// Connect to database
client.connect();

// Accepts name from the command line
var personName = process.argv[2];

// Function that takes in name and a callback
// and uses the name to find and output famous people by their first or last name.
var findPerson = function (name, callback) {
  // SQL query checks for input name in famous_people db as first or last name
  client.query("SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text", [name], (err, result) => {
    // Outputs the result as - [record]: [first_name last_name], born '[birthdate]' for each row
    // Set the number of results
    let num = 1;
    let output = []
    result.rows.forEach ((row) => {
      // Converts date format
      let date = (row.birthdate).toISOString().split('T')[0].split('-').join('-')
      output.push(`- ${num}: ${row.first_name} ${row.last_name}, born '${date}'\n`);
      num++;
    });
    // Results found, formatted
    let found = (`Found ${result.rows.length} person(s) by the name '${name}': \n ${output.join(" ")}`);
    // Pass error and records found to the callback
    callback(err, found);
  });
}

// Search for the person name, and handle errors
findPerson(personName, (err, result) => {
  // Searching ...
  console.log(`Searching ...`);
  // Handels the error
  if (err) {
    console.log(err);
  }
  // If no errors, return results
  console.log(result);
  // Close the connection
  client.end();
});
