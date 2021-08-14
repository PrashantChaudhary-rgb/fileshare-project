const router = require('express').Router();
const File = require('../models/file');
const path = require('path');

router.get('/:uuid', async (req, res) => {
   
    try {
         res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
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
