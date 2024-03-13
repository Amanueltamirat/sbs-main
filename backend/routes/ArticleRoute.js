import express from 'express';
import Article from '../models/ArticleModel.js';
const ArticleRoute = express.Router();


//--ignore client
  ArticleRoute.get('/', async (req, res) => {
    try{
     const articles = await Article.find({});
    res.send(articles);
   } catch(err){
    res.status(404).send(err.message);
   }
   
  });

ArticleRoute.get('/newarticles', async (req, res) => {
  const newArticle = await Article.find();
  res.send(newArticle);
});


ArticleRoute.get('/getallarticles', async(req, res)=>{
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 2;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
  try {
    const articles = await Article.find({
        ...(req.query.userId && { userId: req.query.userId }),
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

    const totalArticles = await Article.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthArticles = await Article.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      articles,
      totalArticles,
      lastMonthArticles,
    });
  } catch (error) {
    console.log(error)
  }
})

ArticleRoute.post('/newarticles', async (req, res, next) => {
        const newArticles = new Article({
        ...req.body,
        // userId:req.user._id
        });
        try{
        const articles =   await newArticles.save(); 
        res.status(201).json(articles)

        }catch(err){
          next(err)
        }
      });


ArticleRoute.get('/:id', async (req, res) => {
    const id = req.params.id
    const article = await Article.findById({_id:id});
  
    if (article) {
      res.send(article)
    } else {
     res.status(404).send({ message: 'Article Not Found' });
    }
  });
ArticleRoute.delete('/deleteArticle/:id', async(req, res)=>{
          try{
          await Article.findByIdAndDelete(req.params.id)
          res.status(200).json('the post has been deleted')
          } catch(err){
          console.log(err)
          }
})
ArticleRoute.get('/getArticle/:id', async(req, res)=>{
  const id = req.params.id
  const updatedArticle = await Article.findById({_id:id})
  res.json(updatedArticle)
})

ArticleRoute.put('/updateArticle/:id', async(req, res)=>{
  const id = req.params.id;
  try{
    const updatedArticle = await Article.findByIdAndUpdate(
 
      { _id:id},
       {
  
         title:req.body.title,
        authorTitle:req.body.authorTitle,
        authorName:req.body.authorName,
         image:req.body.image,
         content:req.body.content,
         overView:req.body.overView
        }
    ) 
    
    res.status(200).send(updatedArticle)
  } catch(err){
    res.json(err.message)
  }
 
  })




export default ArticleRoute;
