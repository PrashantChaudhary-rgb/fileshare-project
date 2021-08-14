const router = require('express').Router();
const File = require('../models/file');
const path = require('path');

router.get('/:uuid', async (req, res) => {
   console.log('download route mai');
   
    try {
       console.log('try mai header se pehle');
         res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
       console.log('header ke baad');
        const file = await File.findOne({ uuid: req.params.uuid });
       console.log('file lene ke baad');
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
