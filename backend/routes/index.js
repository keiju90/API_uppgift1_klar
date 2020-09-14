const express = require('express');
const student = require('./student.js');
const router = express.Router();

router.get('/students', student.get);
router.get('/students/:id', student.getById);
router.post('/students', student.post);
router.delete('/students/:id', student.deleteById);

module.exports = router;