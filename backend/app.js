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
import path from 'path';
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(cors());

const PORT = process.env.PORT || 5000
const __dirname = path.resolve()

mongoose
  .connect(process.env.MONGODB_URI)
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
      to:emails.map(email=>{
        return (
          email
        )
      }),
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



if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}


app.listen(PORT, () => {
  console.log('Your app litening on port:' + PORT);
});
