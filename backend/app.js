import express from 'express';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import nodemailer from 'nodemailer'
import bodyParser from 'body-parser';
import data from './data.js';
import ArticleRoute from './routes/ArticleRoute.js';
import SeedRoute from './routes/SeedRoute.js';
import UserRoute from './routes/UserRoute.js';
import SermonRoute from './routes/SermonRoute.js';
import BookRoute from './routes/BookRoute.js';
import multer from 'multer'
import BookCoverImageRoute from './routes/BookCoverImageRoute.js';
import AuthorRoute from './routes/AuthorRoute.js';
dotenv.config();
const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json({limit:'50mb'}));
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(cors());
// app.use(ExpressFormidable)
// /////

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
/////



const port = process.env.port || 4000;
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log('Db connected');
  });

const db = mongoose.connection;

app.use('/api/articles', ArticleRoute);
app.use('/api/seed', SeedRoute);
app.use('/api/users', UserRoute);
app.use('/api/sermons', SermonRoute);
app.use('/api/books', BookRoute);
app.use('/api/bookCover', BookCoverImageRoute);
app.use('/api/authors', AuthorRoute);
app.get('/api/data', (req, res) => {
  res.send(data);
});


function sendEmail({emails, subject, message}){
  return new Promise((resolve, reject)=>{
    var transport = nodemailer.createTransport({
      service:'gmail',
      auth:{
        user:'amanuel.tamirat22@gmail.com',
        pass:'bxzv itge pvdx wxpi'
      },
    })
    const mail_configs = {
      from:'amanuel.tamirat22@gmail.com',
      to:emails,
      subject: subject,
      html:`${message}`
    };
    transport.sendMail(mail_configs, function(error, info){
      if(error){
        console.log(error)
        return reject({message:`An error has occured:${error} `})
      }
      return resolve({message:`Email sent successfully`})
    })
  })
}

app.post('/sendmail', (req, res)=>{
  sendEmail(req.body).then(response=>res.send(response.message)).catch(err=>res.send({message:err}))
})
app.get('/sendmail', (req, res)=>{
  sendEmail(req.query).then(response=>res.send(response.message)).catch(err=>res.send({message:err}))
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log('Your app litening on port:' + port);
});
// npm install mongodb@5.9.1
//  "mongodb": "^6.3.0",