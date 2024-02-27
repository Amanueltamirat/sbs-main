import jwt from 'jsonwebtoken';
import mongoose from 'mongoose'
import Grid from 'gridfs-stream'
import { MongoClient }  from 'mongodb';
import { GridFSBucket }  from 'mongodb';
export const baseUrl = () => {
  process.env.BASE_URL
    ? process.env.BASE_URL
    : process.env.NODE_ENV !== 'production'
    ? 'http://localhost:300'
    : 'https://yourdomain.com';
};

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET
  );
};


export let gridfs;
mongoose.connection.once('open', function () {
gridfs = Grid(mongoose.connection.db, mongoose.mongo);//If you are using mongoose
gridfs.collection('uploads');
 return gridfs
 });
