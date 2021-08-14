const router = require('express').Router();
const File = require('../models/file');

router.get('/', async (req, res) => {
    const file = await File.find();
        console.log(file);
        return res.send(file);
    });


    module.exports = router;