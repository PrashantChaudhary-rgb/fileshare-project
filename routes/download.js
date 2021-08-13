const router = require('express').Router();
const File = require('../models/file');
const path = require('path');

router.get('/:uuid', async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid });
        // Link expired
        if(!file) {
            return res.render('download', { error: 'Link has been expired.'});
        } 
        
        // path.join(__dirname,'/..//')
            const filepath=`${__dirname}/../${file.path}`;
            res.download(filepath);
        } catch(err) {
            return res.render('download', { error: 'Something went wrong.'});
        }
    });
    module.exports=router;