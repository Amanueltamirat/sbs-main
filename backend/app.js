import express from 'express';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import data from './data.js';
import ArticleRoute from './routes/ArticleRoute.js';
import SeedRoute from './routes/SeedRoute.js';
import UserRoute from './routes/UserRoute.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

const port = process.env.port || 4000;
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Db connected');
  });

const db = mongoose.connection;

app.use('/api/articles', ArticleRoute);
app.use('/api/seed', SeedRoute);
app.use('/api/users', UserRoute);

app.get('/api/data', (req, res) => {
  res.send(data);
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log('Your app litening on port:' + port);
});
