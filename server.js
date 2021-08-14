require('dotenv').config();
const express=require('express');
const app=express();
var path = require('path');
const PORT=process.env.PORT||3000;
const connectDB=require('./config/db');
connectDB();
 app.set('views',path.join(__dirname,'/views'))
 app.set('view engine','ejs');

app.use(express.static('public'));
app.use(express.json());

const cors=require('cors');
const corsOptions={
    origin:process.env.ALLOWED_CLIENTS.split(',')
}
app.use(cors(corsOptions));



app.use('/api/files',require('./routes/files'));
app.use('/files',require('./routes/show'));
app.use('/files/download',require('./routes/download'));
app.use('api/files',require('./routes/files'));
app.use('/sendall',require('./routes/sendall'));










app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})
