const express = require('express');
const { version } = require('mongoose');

const router = express.Router();

router.get('/api/v1', (req, res) => {
    res.status(200).send({
        success: true,
        message: 'Bem vindo!',
        version: '1.0.0',
    });
});

module.exports = router;