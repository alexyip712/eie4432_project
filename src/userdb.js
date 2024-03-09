import fs from 'fs/promises';
import client from './dbclient.js';
import bcrypt from 'bcrypt';

// Initialize the user database
async function init_db() {
  try {
    const users = client.db('projectdb').collection('users');
    const usersCount = await users.countDocuments();
    console.log(Date().toLocaleString('en-HK'));

    if (usersCount == 0) {
      const data = await fs.readFile('users.json', 'utf-8');
      const usersData = JSON.parse(data);
      const collect = await users.insertMany(usersData);
      console.log(`Added ${collect.insertedCount} users`);
    }
  } catch (err) {
    console.error('Unable to initialize the database!');
  }
}

// Validate a user's credentials
async function validate_user(username, password) {
  if (!username || !password) {
    return false;
  }

  try {
    const users = client.db('projectdb').collection('users');
    const usersFound = await users.findOne({ username });
    console.log(Date().toLocaleString('en-HK'));

    if (usersFound && (await bcrypt.compare(password, usersFound.password))) {
      return usersFound;
    } else {
      return false;
    }
  } catch (err) {
    console.error('Unable to fetch from database!');
  }
}

// Update a user's information
async function update_user(username, nickname, password, email, gender, birthdate, role, enabled) {
  try {
    const users = client.db('projectdb').collection('users');

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const usersUpdated = await users.updateOne(
      { username },
      {
        $set: {
          username,
          password: hashedPassword,
          nickname,
          email,
          gender,
          birthdate,
          role,
          enabled,
        },
      },
      { upsert: true }
    );
    console.log(Date().toLocaleString('en-HK'));

    if (usersUpdated.upsertedCount == 0) {
      console.log('Added 0 user');
      return true;
    } else {
      console.log('Added 1 user');
      return true;
    }
  } catch (err) {
    console.error('Unable to update the database!');
    return false;
  }
}

async function fetch_user(username) {
  try {
    const users = client.db('projectdb').collection('users');
    const usersFound = await users.findOne({ username });
    console.log(Date().toLocaleString('en-HK'));

    if (usersFound) {
      return usersFound;
    } else {
      return null;
    }
  } catch (err) {
    console.error('Unable to fetch from database!');
  }
}

async function username_exist(username) {
  try {
    const user = await fetch_user(username);

    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error('Unable to fetch from database!');
  }
}

//init_db().catch(console.dir);

//validate_user('alice', 'ecila').then((res) => console.log(res));

//update_user('21089804D', '21089804D', 'marcus', 'abc@gmail.com', 'male', '2002/12/06', 'user', false).then((res) =>
//  console.log(res)
//);

//fetch_user('21089804D').then((res) => console.log(res));

//username_exist('abc').then((res) => console.log(res));

export { validate_user, update_user, fetch_user, username_exist };
