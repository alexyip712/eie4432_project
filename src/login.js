import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';
import { validate_user, update_user, fetch_user, username_exist } from './userdb.js';

// Declare the users variable as a Map
const users = new Map();
const route = express.Router();
const form = multer();

route.use(express.urlencoded({ extended: true }));

route.post('/login', form.none(), async (req, res) => {
  req.session.logged = false;

  const user = await validate_user(req.body.username, req.body.password);

  if (!user) {
    res.status(401).json({ status: 'failed', message: 'Incorrect username and password' });
    return;
  }
  if (!user.enabled) {
    res.status(401).json({ status: 'failed', message: `User '${user.username}' is currently disabled` });
    return;
  }

  req.session.user = {
    username: user.username,
    role: user.role,
  };

  req.session.logged = true;
  req.session.timestamp = Date.now();

  res.json({
    status: 'success',
    user: req.session.user,
  });
});

route.post('/logout', async (req, res) => {
  if (req.session.logged) {
    req.session.logged = false;
    req.session.username = null;
    req.session.role = null;
    req.session.destroy();
    res.end();
  } else {
    res.status(401).json({ status: 'failed', message: 'Unauthorized' });
  }
});

route.get('/me', (req, res) => {
  if (req.session.logged) {
    res.json({
      status: 'success',
      user: req.session.user,
    });
  } else {
    res.status(401).json({
      status: 'error',
      message: 'User not authenticated',
    });
  }
});

route.post('/register', form.none(), async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const nickname = req.body.nickname;
  const email = req.body.email;
  const gender = req.body.gender;
  const birthdate = req.body.birthdate;
  const role = req.body.role;
  const enabled = true;

  if (!username || !password) {
    res.status(400).json({ status: 'failed', message: 'Missing fields' });
    return;
  }

  if (username.length < 3) {
    res.status(400).json({ status: 'failed', message: 'Username must be at least 3 characters' });
    return;
  }

  if (await username_exist(username)) {
    res.status(400).json({ status: 'failed', message: `Username ${username} already exists` });
    return;
  }

  if (password.length < 8) {
    res.status(400).json({ status: 'failed', message: 'Password must be at least 8 characters' });
    return;
  }

  if (role != 'user') {
    res.status(400).json({ status: 'failed', message: 'Role can only be user' });
    return;
  }

  const success = await update_user(username, nickname, password, email, gender, birthdate, role, enabled);

  if (success) {
    res.json({
      status: 'success',
      user: {
        username: username,
        nickname: nickname,
        email: email,
        gender: gender,
        birthdate: birthdate,
        role: role,
        enabled: enabled,
      },
    });
  } else {
    res.status(500).json({ status: 'failed', message: 'Account created but unable to save into the database' });
    return;
  }
});

export default route;
