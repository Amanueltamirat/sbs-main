import express from 'express'
import multer from 'multer'
import expressAsyncHandler from 'express-async-handler'
import Books from '../models/BookModel.js'
import mongoose from 'mongoose'
import formidable from 'formidable'
import crypto from 'crypto'
import path from 'path'
import {GridFsStorage} from 'multer-gridfs-storage';


let gridFs = null;
mongoose.connection.on('connected', ()=>{
  gridFs = new mongoose.mongo.GridFSBucket(mongoose.connection.db)
})

const BookRoute  = express.Router()

BookRoute.post('/createpost', (req, res) => {
//  let form = formidable.IncomingForm()
 const form = formidable({})
//  form.keepExtensions = true
 form.parse(req, async (err, fields, files) => {
 if (err) {
 return res.status(400).json({
 error: "Video could not be uploaded"
 })
 }
 let media = new Books(files)
 media.postedBy= req.profile
 if(files.file){
 let writestream = gridFs.openUploadStream(media._id, {
 contentType: files.file.type || 'binary/octet-stream'})
 fs.createReadStream(files.file.path).pipe(writestream)
 }
 try {
 let result = await media.save()
 res.status(200).json(result)
 }
 catch (err){
 return res.status(400).json({
 error: errorHandler.getErrorMessage(err)
 })
 }
 })
})


BookRoute.param('mediaId', async (req, res, next, id) => {
 try{
 let book = await Books.findById(id)
 if (!book)
 return res.status('400').json({
 error: "book not found"
 })
 req.file = files
 let files = await gridFs.find({filename:files._id}).toArray()
 if (!files[0]) {
 return res.status(404).send({
 error: 'No video found'
 })
 }
 req.file = files[0]
 next()
 }catch(err) {
 return res.status(404).send({
 error: 'Could not retrieve media file'
 })
 }
}) 

BookRoute.get('/getbooks', (req, res) => {
 const range = req.headers["range"]
 if (range && typeof range === "string") {
   
   const parts = range.replace(/bytes=/, "").split("-")
 const partialstart = parts[0]
 const partialend = parts[1]
 const start = parseInt(partialstart, 10)
 const end = partialend ? parseInt(partialend, 10) :
req.file.length - 1
 const chunksize = (end - start) + 1
 res.writeHead(206, {
 'Accept-Ranges': 'bytes',
 'Content-Length': chunksize,
 'Content-Range': 'bytes ' + start + '-' + end + '/' +
req.file.length,
 'Content-Type': req.file.contentType
 })
 let downloadStream = gridfs.openDownloadStream(req.file._id,
{start, end: end+1})
 downloadStream.pipe(res)
 downloadStream.on('error', () => {
 res.sendStatus(404)
 })
 downloadStream.on('end', () => {
 res.end()
 })



 } else {
 res.header('Content-Length', req.file.length)
 res.header('Content-Type', req.file.contentType)
 let downloadStream = gridFs.openDownloadStream(req.file._id)
 downloadStream.pipe(res)
 downloadStream.on('error', () => {
 res.sendStatus(404)
 })
 downloadStream.on('end', () => {
 res.end()
 })
 }
}
)
/////////Multer gridfs /////////

var storage = new GridFsStorage({
  url: 'mongodb://0.0.0.0:27017/sbc',
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage: storage })


// BookRoute.post('/createbook', upload.single('file'), expressAsyncHandler( async(req, res)=>{
// res.json({file:req.file});
// }) )
BookRoute.post("/createbook", async (req, res) => {
 const newBook =  new Books({
    file: req.body.file,
  });
  
  res.send(newBook)
})
// BookRoute.post("/createbook", async (req, res) => {
//  const newBook =  new Books({
//     file: req.body.file,
//   });
//   try {
//     const savedBook = await newBook.save();
//     res.status(200).send({ book: savedBook });
//   } catch (error) {
//     res.status(400).send({ success: false, msg: error });
//   }
// console.log(req.file)
// // res.send(req.file)
// });


BookRoute.get('/', async (req,res)=>{
  const books = await Books.find()
  res.send(books)
})
BookRoute.get('/book/:id', async (req,res)=>{
  let id = req.params.id
  const book = await Books.findById({
    _id:id
  })
  res.send(book)
})

export default BookRoute