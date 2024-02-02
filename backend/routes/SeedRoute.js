import express from "express";
import data from "../data.js";
import User from "../models/UserModel.js";
import Article from "../models/ArticleModel.js";
const SeedRoute = express.Router();

SeedRoute.get("/", async (req, res) => {
  await Article.deleteMany({});
  const createdArticle = await Article.insertMany(data.articles);

  await User.deleteMany({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdUsers, createdArticle });
});

export default SeedRoute;
