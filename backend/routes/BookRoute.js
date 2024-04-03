import express from 'express'
import multer from 'multer'
import Books from '../models/BookModel.js'
import mongoose from 'mongoose'
import Grid from 'gridfs-stream'
import crypto from 'crypto'
import path from 'path'
import {GridFsStorage} from 'multer-gridfs-storage';
import mongodb from 'mongodb'
import expressAsyncHandler from 'express-async-handler'
import fs from 'fs'
import {ObjectId} from 'mongodb'
import {Types} from 'mongoose'
const BookRoute  = express.Router()
import { MongoClient }  from 'mongodb';
import { GridFSBucket }  from 'mongodb';
import { gridfs } from '../utils.js'

//////////////////////////////////////////////////////

// const mongoURI = 'mongodb://localhost:27017';
const mongoURI = 'mongodb+srv://amanueltamirat22:2JCfFJkwsRnmc7jV@cluster0.km4zucn.mongodb.net/sbc-app'
const conn = (mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}));

let gfs, gridFs;
conn.once('open', () => {
  gfs =new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads',
  });
  // gridFs=  new Grid(mongoose.connection, mongoose.mongo);
  gridFs=  new Grid(conn, mongoose.mongo);
  gridFs.collection('uploads');
  return gfs,gridFs;
});
/////////////////////////////////////////////////////

var storage = new GridFsStorage({
  // url:'mongodb://localhost:27017/sbc',
  url: 'mongodb+srv://amanueltamirat22:2JCfFJkwsRnmc7jV@cluster0.km4zucn.mongodb.net/sbc-app',
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err.message);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const originalname = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
          originalname:originalname
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage: storage,
 })


const uploadMiddleware = (req, res, next)=>{
  // const uploads = upload.single('file');
   const uploads = upload.fields([{name:'file', maxCount:2},{name:'coverimage', maxCount:1}])
uploads(req, res, function(err){
  try{

  if(err instanceof multer.MulterError){
    return res.status(404).send('file too large')
  } else if (err){
    if(err === 'filetype') return res.status(404).send('document file only');
    return res.sendStatus(500)
  }
  next()
}
 catch(err){
    res.json({err:err.message})
  }
  }
)
};

BookRoute.post("/createbook",uploadMiddleware, async (req, res) => {
 const file = req.files.file[0].filename

try{

const bookName = req.files.file[0].originalname
const author = req.body.author
const title = req.body.title
const overView = req.body.overView
const book = new Books({
  author:author,
  title:title,
  overView:overView,
  file:bookName,
  filename:file
})
const savedBook = await book.save()
res.send(savedBook);
} catch(err){
res.json({err:err.message})
}
})

BookRoute.get('/getallbooks', async(req, res)=>{
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 2;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
  try {
    const books = await Books.find({
        // ...(req.query.userId && { userId: req.query.userId }),
       ...(req.query.category && { category: req.query.category }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalBooks = await Books.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthBooks = await Books.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      books,
      totalBooks,
      lastMonthBooks,
    });
  } catch (error) {
    console.log(error)
  }
})

BookRoute.get("/files", async (req, res) => {
  
   try {
       let files = await gridFs.files.find().toArray((err, files) => {
    if (err) return res.status(400).json({ err });
    return files
  });
       res.json({files})
   } catch (err) {
       res.json({err:err.message})
   }
});

BookRoute.get('/bookdata', async(req, res)=>{
  const booksName = await Books.find({})
  res.send(booksName)
})

BookRoute.get('/bookdata/:filename', async(req, res)=>{
  const filename = req.params.filename
  const booksName = await Books.find({filename})
  res.send(booksName)
})

BookRoute.get('/bookNames', async(req, res)=>{
  const booksName = await Books.find({})
  try{
    const books =   booksName.map((book)=>{
      if(book.file===undefined) {
    console.log('No Book Name');
    // res.json('No file') 
    return '';
  } else{
     return book
  }
 
    })
   res.send(books)
  } catch(err){
res.json({err:err.message})
  }
 
});



BookRoute.get('/document/:filename', async (req, res) => {
  const filename = req.params.filename
  const id = req.params.id
  const _id = new mongoose.Types.ObjectId(id);
 try{

 let file = await gridFs.files.find({filename:filename}).toArray((err, file)=>{
      if (err) return res.status(400).json({ err :'Error'});
    return file;
    
    })
  const readstream = gfs.openDownloadStream(file[0]._id);
    readstream.pipe(res);

  }  catch (err) {
       res.json({err:err.message});
   }
  });

BookRoute.get('/alldata', async(req, res)=>{
  const allData = await Books.find({})
  res.json(allData)
});


BookRoute.delete('/bookname/:filename', async(req, res)=>{
  const filename = req.params.filename
try{
  await Books.findOneAndDelete({filename})
    res.json('file delete')
  
} catch(err){
  res.json({err:err.message})
}
})

BookRoute.delete('/files/:filename', async (req, res) => {
  const filename = req.params.filename;
 try{
    let file = await gridFs.files.find({ filename:filename }).toArray((err, file)=>{
      if (err) return res.status(400).json({ err });
    return file
    })
    const fileId = file[0]._id;
     await gfs.delete(fileId);
  }  catch (err) {
       console.log(`${err}`)
   }
  res.send('deleted');
  });

export default BookRoute