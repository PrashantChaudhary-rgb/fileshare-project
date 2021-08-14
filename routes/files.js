const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/file');
const { v4: uuid4 } = require('uuid');

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploads/),//i chnaged this from upload/
    
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});


let upload = multer({ storage, limits: { fileSize: 1000000 * 100 }, }).single('myfile'); //100mb

router.post('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    upload(req, res, async (err) => {

        if (err) {
            return res.status(500).send({ error: err.message })
        }
        const file = new File({
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size
        });
        const response = await file.save();
        console.log(response);
        return res.json({ file: `${process.env.APP_BASED_URL}/files/${response.uuid}` })
    })


})


router.post('/send', async (req, res) => {
    const { uuid, sendto, sendfrom } = req.body;
    console.log(req.body);
    if (!uuid || !sendto || !sendfrom) {
        return res.status(422).send({ error: 'all fields are required' });
    }
    try {
        const file = await File.findOne({ uuid: uuid });
        if (file.sender) {
            return res.status(422).send({ error: 'Email already sent once.' });
                   }
        file.sender = sendfrom;
        file.reciever = sendto;
        const response = await file.save();
        console.log(response);
        const sendmail = require('../services/email');
        sendmail({
            from: sendform,
            to: sendto,
            subject: 'inShare file sharing',
            text: `${emailFrom} shared a file with you.`,
            html: require('../services/emailTemplate')({
                emailFrom,
                downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}?source=email`,
                size: parseInt(file.size / 1000) + ' KB',
                expires: '24 hours'
            })
        });
        return res.send({success: true});
    }

    catch (err) {
            return res.status(500).send({ error: 'Something went wrong.' });
        }

    });














module.exports = router;








