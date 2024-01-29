const express = require('express')
const router = express.Router();
const { createUser, updateUser, getUserById, getAllUsers } = require('./controller');

router.post('/create', createUser);
router.patch('/:id', updateUser);
router.get('/list',getAllUsers);
router.get('/:id',getUserById);

module.exports = router