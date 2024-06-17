const express = require('express');
const jwt = require('jsonwebtoken');
const users = require('../data/users');

const router = express.Router();

const JWT_SECRET = 'your_jwt_secret_key';

router.post('/signin', (req, res) => {
  const { login, password } = req.body;
  const user = users.find(u => u.login === login && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid login or password' });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ user, token });
});

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  });
};

router.post('/createUser', authenticateToken, (req, res) => {
  // Check for necessary role
  if (!req.user.role.includes('administrator')) {
    return res.status(403).json({ message: 'Access denied, insufficient permissions' });
  }

  // Implement user creation logic
  // ...

  res.status(201).json({ message: 'User created' });
});

router.put('/editUser/:id', authenticateToken, (req, res) => {
  // Check for necessary role
  if (!req.user.role.includes('administrator')) {
    return res.status(403).json({ message: 'Access denied, insufficient permissions' });
  }

  // Implement user editing logic
  // ...

  res.json({ message: 'User edited' });
});

router.delete('/deleteUser/:id', authenticateToken, (req, res) => {
  // Check for necessary role
  if (!req.user.role.includes('administrator')) {
    return res.status(403).json({ message: 'Access denied, insufficient permissions' });
  }

  // Implement user deletion logic
  // ...

  res.json({ message: 'User deleted' });
});

module.exports = router;
