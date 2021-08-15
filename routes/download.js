// const router = require('express').Router();
// const File = require('../models/file');
// const path = require('path');

// router.get('/:uuid', async (req, res) => {
//    console.log('download route mai');
   
//     try {
//        console.log('try mai header se pehle');
//          res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
//     res.setHeader('Access-Control-Allow-Credentials', true); // If needed
//        console.log('header ke baad');
//         const file = await File.findOne({ uuid: req.params.uuid });
//        console.log('file lene ke baad');
//         // Link expired
//         if(!file) {
//             return res.render('download', { error: 'Link has been expired.'});
//         } 
        
//         // path.join(__dirname,'/..//')
//        console.log('filepath lene se pehle');
      
//             const filepath=`${__dirname}/../${file.path}`;
//         console.log('file path lene ke baad');
//        console.log(filepath);
//             res.download(filepath);
//         } catch(err) {
//             return res.render('download', { error: 'Something went wrong.'});
//         }
//     });
//     module.exports=router;
const router = require('express').Router();
const File = require('../models/file');

router.get('/:uuid', async (req, res) => {
   // Extract link and get file from storage send download stream 
   const file = await File.findOne({ uuid: req.params.uuid });
   // Link expired
   if(!file) {
        return res.render('download', { error: 'Link has been expired.'});
   } 
//    const response = await file.save();
   const filePath = `${__dirname}/../${file.path}`;
   res.download(filePath);
});


module.exports = router;
