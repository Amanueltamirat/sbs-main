import express from 'express'
import multer from 'multer'
import expressAsyncHandler from 'express-async-handler'
import Books from '../models/BookModel.js'
import mongoose from 'mongoose'
import Grid from 'gridfs-stream'
import crypto from 'crypto'
import path from 'path'
import fs from 'fs'
import {GridFsStorage} from 'multer-gridfs-storage';
import mongodb from 'mongodb'
import {ObjectId} from 'mongodb'
import {Types} from 'mongoose'
const BookRoute  = express.Router()
import { MongoClient }  from 'mongodb';
import { GridFSBucket }  from 'mongodb';
import { gridfs } from '../utils.js'

//////////////////////////////////////////////////////

const mongoURI = 'mongodb://localhost:27017';
// const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = client.db('sbc');
// const bucket = new mongodb.GridFSBucket(db, {
//     bucketName: 'uploads',
//   });

///////Multer gridfs /////////
// const mongoURI = 'mongodb://0.0.0.0:27017/sbc';
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs,gridFs;
conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads',
  });
  gridFs= new Grid(conn.db, mongoose.mongo);
  gridFs.collection('uploads');
  return gfs,gridFs;
});
/////////////////////////////////////////////////////


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
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage: storage, 
limits: { fileSize: 40000000 },
fileFilter:function(req, file, cb){
  checkFileType(file, cb)
} })

function checkFileType(file, cb){
  const filetypes = /pdf|epub|xml/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if(mimetype && extname) return cb(null, true);
  cb('filetype')
}

const uploadMiddleware = (req, res, next)=>{
  const uploads = upload.single('file');
uploads(req, res, function(err){
  if(err instanceof multer.MulterError){
    return res.status(404).send('file too large')
  } else if (err){
    if(err === 'filetype') return res.status(404).send('document file only');
    return res.sendStatus(500)
  }
  next()
})
};
 export const deleteFile = (filename) => {
gfs.files.find({ filename }).toArray((err, files) => {
    if (!files || files.length === 0) {
      console.log('File not found');
      return;
    }

    gfs.remove({ _id: files[0]._id }, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return;
      }
      console.log('File deleted successfully');
    });
  });
};

// const objId = new ObjectId()

BookRoute.post("/createbook",uploadMiddleware, async (req, res) => {
const {file} = req;
// const {id} = file
console.log(file);
res.send(file);
})

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





BookRoute.get("/files", async (req, res) => {
  
   try {
       let files = await gridFs.files.find().toArray((err, files) => {
    if (err) return res.status(400).json({ err });
    console.log({files});
    return files
  });
       res.json({files})
   } catch (err) {
       res.json({err})
   }
});

BookRoute.get('/file/:id', async (req, res) => {
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


BookRoute.get('/document/:filename', async (req, res) => {
  const filename = req.params.filename
  const id = req.params.id
  const _id = new mongoose.Types.ObjectId(id);
  // const fileId = new ObjectId(id);
  // const fileId = new Types.ObjectId(id)
  //  if (!id || id === 'undefined') return res.status(400).send('no file id');
 try{
    let file = await gridFs.files.find({filename}).toArray((err, file)=>{
      if (err) return res.status(400).json({ err :'Error'});
    return file
    })
  const readstream = gfs.openDownloadStream(file[0]._id);
  // const readstream = gfs.openDownloadStream(file[0].filename);
    readstream.pipe(res);

  }  catch (err) {
       res.json({err:err.message});
   }
  });


// BookRoute.delete('/files/:filename', async (req, res) => {
//   const filename = req.params.filename;

//  try{
//     let file = await gridFs.files.find({ filename:filename }).toArray((err, file)=>{
//       if (err) return res.status(400).json({ err });
//     return file
//     })
//     const fileId = file[0]._id;
//        gridFs.remove({ _id: fileId }, (err) => {
//       if (err) {
//         console.log('Error deleting file:', err);
//         return;
//       }
//       console.log('File deleted successfully');
//     });
//   }  catch (err) {
//        res.json({err})
//    }
//   res.send('deleted')
//   });


// BookRoute.get('/files/:id',  ({params: {id}},res)=>{ 
// if(!id || id === 'undefined') return res.status(400).send('no file id');
// const _id = new mongoose.Types.ObjectId(id);

// gridFs.find({_id}).toArray((err, files)=>{
//   if(!files || files.length === 0)
//     return res.status(400).send('mo files exist');
//   gridFs.openDownloadStream(_id).pipe(res)
// })

// })
export default BookRoute