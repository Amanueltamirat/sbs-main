import express from 'express'
import Sermons from '../models/SermonModel.js'
const SermonRoute = express.Router()

SermonRoute.get('/allsermons', async(req, res)=>{
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 2;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
  try {
    const sermons = await Sermons.find({
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
    const sermonList = await Sermons.find({})
    const totalSermons = await Sermons.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthSermons = await Sermons.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

const lastMonthSermonsList = await Sermons.find({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({
      sermons,
      totalSermons,
      lastMonthSermons,
      lastMonthSermonsList,
      sermonList
    });
  } catch (error) {
    console.log(error)
  }
})

SermonRoute.post("/newSermons", async (req, res) => {
 const newSermon =  new Sermons({
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    audioUrl: req.body.audioUrl,
    videoUrl:req.body.videoUrl,
    overView: req.body.overView,
    date: req.body.date,
    profilePicture: req.body.profilePicture,
    preacherTitle:req.body.preacherTitle,
    preacherName:req.body.preacherName,
    content:req.body.content,
    category: req.body.category,
  });
  try {
    const savedSermon = await newSermon.save();
    res.status(200).send({ sermon: savedSermon });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});
SermonRoute.get("/getAllSermons", async (req, res) => {
const options ={
  sort:{
    createdAt:1
  }
}
const data = await Sermons.find({})
res.send(data)
});


SermonRoute.get('/:id', async (req, res) => {
    const id = req.params.id
    const sermon = await Sermons.findById({_id:id});
  
    if (sermon) {
      res.send(sermon)
    } else {
     res.status(404).send({ message: 'Sermon Not Found' });
    }
  });




SermonRoute.delete('/deleteSermon/:id', async(req, res)=>{
          try{
          await Sermons.findByIdAndDelete(req.params.id)
          res.status(200).json('the post has been deleted')
          } catch(err){
          console.log(err)
          }
})


SermonRoute.put('/updateSermon/:id', async(req, res)=>{
  const id = req.params.id;
  try{
    const updatedSermon = await Sermons.findByIdAndUpdate(
 
      { _id:id},
       {
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    audioUrl: req.body.audioUrl,
    videoUrl:req.body.videoUrl,
    overView: req.body.overView,
    date: req.body.date,
    profilePicture: req.body.profilePicture,
    preacherTitle:req.body.preacherTitle,
    preacherName:req.body.preacherName,
    content:req.body.content,
    category: req.body.category,
   
        }
    ) 
    
    res.status(200).send(updatedSermon)
  } catch(err){
    res.json(err.message)
  }
 
  })

export default SermonRoute