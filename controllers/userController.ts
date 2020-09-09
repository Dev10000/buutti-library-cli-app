const fs = require('fs');

const users = JSON.parse(fs.readFileSync('../users.json'));

// Get all users

const getAllUsers = () => {
  return users;
};



