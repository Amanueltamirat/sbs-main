import express from 'express'
import Sermons from '../models/SermonModel.js'
const SermonRoute = express.Router()


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