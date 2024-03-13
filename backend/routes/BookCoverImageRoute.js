import express from 'express'
import multer from 'multer'
import expressAsyncHandler from 'express-async-handler'
import BookCover from '../models/BookCoverModel.js'
import mongoose from 'mongoose'
import Grid from 'gridfs-stream'
import crypto from 'crypto'
import path from 'path'
import fs from 'fs'
import {GridFsStorage} from 'multer-gridfs-storage';
import mongodb from 'mongodb'
import {ObjectId} from 'mongodb'
import {Types} from 'mongoose'
import { MongoClient }  from 'mongodb';
import { GridFSBucket }  from 'mongodb';
import { gridfs } from '../utils.js'
const BookCoverImageRoute  = express.Router()

//////////////////////////////////////////////////////

const mongoURI = 'mongodb://localhost:27017';
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs, gridFs;
conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'coverImage',
  });
  gridFs= new Grid(mongoose.connection.db, mongoose.mongo);
  gridFs.collection('coverImage');
  return gfs,gridFs;
});
/////////////////////////////////////////////////////


var storage = new GridFsStorage({
  url: 'mongodb://0.0.0.0:27017/sbc',
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
          bucketName: 'coverImage',
          originalname:originalname
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage: storage, 
limits: { fileSize: 40000000 },
// fileFilter:function(req, file, cb){
//   checkFileType(file, cb)
// }
 })

function checkFileType(file, cb){
  const filetypes = /pdf|epub|xml/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if(mimetype && extname) return cb(null, true);
  cb('filetype')
}

const uploadMiddleware = (req, res, next)=>{
  // const uploads = upload.single('file');
   const uploads = upload.single('coverimage')
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
BookCoverImageRoute.post("/creatcoverimage",upload.single('image'), async (req, res) => {
const {file} = req;
//  const originalName = file
//  console.log(originalName)
const bookName = file.filename
// console.log(bookName)
try{

const book = new BookCover({
  image:bookName,

})
const savedBook = await book.save()
// console.log(savedBook)
res.send(savedBook);
} catch(err){
res.json({err:err.message})
}
});

//////////////////////////
// Create Read Stream //
// fs.createReadStream('./myFile').
//      pipe(bucket.openUploadStream('myFile',//chunkSizeBytes
     
//      ));
    //  , {
    //      chunkSizeBytes: 1048576,
    //      metadata: { field: 'myField', value: 'myValue' }
    //  }
////////////////////////





BookCoverImageRoute.get("/image", async (req, res) => {
  
   try {
       let files = await gridFs.files.find().toArray((err, files) => {
    if (err) return res.status(400).json({ err });
    // console.log({files});
    return files
  });
  // const newBook = new Books({
  //   ...files
  // })
  // const books = await newBook.save()
  // console.log(books)
  // res.json({books})
       res.json({files})
   } catch (err) {
       res.json({err:err.message})
   }
});

BookCoverImageRoute.get('/file/:id', async (req, res) => {
  const filename = req.params.filename;
  const id = req.params.id
  // const fileId = new ObjectId(id);
  const fileId = new Types.ObjectId(id)
 if (!id || id === 'undefined') return res.status(400).send('no file id');
  // if there is an id string, cast it to mongoose's objectId type
  // const _id = new mongoose.Types.ObjectId(id);
  // console.log(_id)
 try{
    let file = await gridFs.files.find({ _id:fileId}).toArray((err, file)=>{
      if (err) return res.status(400).json({ err :'Error'});
    return file
    })
    res.json({file});
    //  const readstream = gridFs.createReadStream(file.filename);
    // readstream.pipe(res);
  }  catch (err) {
       res.json({err:err.message})
   }
  });

BookCoverImageRoute.get('/bookNames', async(req, res)=>{
  const booksName = await BookCover.find({})
  if(!booksName) {
    console.log('No Book cover');

  }
  res.send(booksName)
})
// BookCoverImageRoute.get('/booksnames', async(req, res)=>{
//   const booksName = await BookCover.find({})
//   res.send(booksName)
// })


BookCoverImageRoute.get('/image/:filename', async (req, res) => {
  const filename = req.params.filename
  const id = req.params.id
  const _id = new mongoose.Types.ObjectId(id);
 try{

 let file = await gridFs.files.find({filename:filename}).toArray((err, file)=>{
      if (err) return res.status(400).json({ err :'Error'});
    return file;
    
    })
    // res.send(file)
    // console.log(file)
    //  const _id = new ObjectId(file._id);
     const readstream = gfs.openDownloadStream(file[0]._id);
  // const readstream = gfs.openDownloadStream(file[0].filename);
    readstream.pipe(res);

  }  catch (err) {
       res.json({err:err.message});
   }
  });

BookCoverImageRoute.get('/bookname/:image', async(req, res)=>{
  const image = req.params.image
try{
  const bookcover = await BookCover.find({image})
    res.json(bookcover)
  
} catch(err){
  res.json({err:err.message})
}
})

BookCoverImageRoute.delete('/bookname/:image', async(req, res)=>{
  const image = req.params.image
try{
  await BookCover.findOneAndDelete({image})
    res.json('file delete')
  
} catch(err){
  res.json({err:err.message})
}
})


BookCoverImageRoute.delete('/coverimage/:filename', async (req, res) => {
  const filename = req.params.filename;
  console.log(filename)

 try{
    let file = await gridFs.files.find({ filename:filename }).toArray((err, file)=>{
      if (err) console.log(`${err.message}`)
      // return res.status(400).json({ err });
    return file
    })
    console.log(file)
    const fileId = file[0]._id
    console.log(fileId)
     await gfs.delete(fileId);
  }  catch (err) {
       console.log(`${err}`)
   }
  res.send('deleted');
    // res.redirect('/books');
  });


export default BookCoverImageRoute