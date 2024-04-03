import express from 'express'
import multer from 'multer'
import BookCover from '../models/BookCoverModel.js'
import mongoose from 'mongoose'
import Grid from 'gridfs-stream'
import crypto from 'crypto'
import path from 'path'
import {Types} from 'mongoose'
import {GridFsStorage} from 'multer-gridfs-storage';

const BookCoverImageRoute  = express.Router()
//////////////////////////////////////////////////////

// const mongoURI = 'mongodb://localhost:27017';
const mongoURI = 'mongodb+srv://amanueltamirat22:2JCfFJkwsRnmc7jV@cluster0.km4zucn.mongodb.net/sbc-app'
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// mongoose.connection
let gfs, gridFs;
conn.once('open', async() => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'coverImage',
  });
  gridFs= await new Grid(conn.db, mongoose.mongo);
  gridFs.collection('coverImage');
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
 })


BookCoverImageRoute.post("/creatcoverimage",upload.single('image'), async (req, res) => {
const {file} = req;
const bookName = file.filename

try{
const book = new BookCover({
  image:bookName,
})
const savedBook = await book.save()
res.send(savedBook);
} catch(err){
res.json({err:err.message})
}
});


BookCoverImageRoute.get("/image", async (req, res) => {
  
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

BookCoverImageRoute.get('/file/:id', async (req, res) => {
  const filename = req.params.filename;
  const id = req.params.id
  const fileId = new Types.ObjectId(id)
 if (!id || id === 'undefined') return res.status(400).send('no file id');
 try{
    let file = await gridFs.files.find({ _id:fileId}).toArray((err, file)=>{
      if (err) return res.status(400).json({ err :'Error'});
    return file
    })
    res.json({file});
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

BookCoverImageRoute.get('/image/:filename', async (req, res) => {
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
  });


export default BookCoverImageRoute