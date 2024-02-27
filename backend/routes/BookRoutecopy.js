import express from 'express'
import mongoose from 'mongoose';
import Grid from 'gridfs-stream'
import path from 'path';
import fs from 'fs'


const BookCopyRoute  = express.Router()

// const mongoURI = 'mongodb://localhost:27017/sbc';
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// // Initialize gfs stream
// let gfs;
// mongoose.connection.once('open', () => {
//   gfs = Grid(mongoose.connection.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// // Route to retrieve a file from GridFS
// BookCopyRoute.get('/file/:filename', (req, res) => {
//   const filename = req.params.filename;
//   const readstream = gfs.createReadStream();

//   readstream.on('error', (err) => {
//     res.status(404).json({ error: 'File not found' });
//   });

//   readstream.pipe(res);
// });

export default BookCopyRoute