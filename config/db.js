require('dotenv').config();
const mongoose=require('mongoose');

function connectDB(){
mongoose.connect(process.env.MONGO_CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log('we are connected');
}).catch(err=>console.log("connection failed"));
}
module.exports=connectDB;