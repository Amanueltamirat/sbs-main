import express from 'express'
import Author from '../models/AuthorModel.js'


//////////////////////////////////////////////////////
const AuthorRoute  = express.Router()

AuthorRoute.post('/author', async(req, res)=>{
  const bookInfo = new Author({
      author:req.body.author,
      title:req.body.title,
      overView:req.body.overView
  })

  const newIfon = await bookInfo.save()
  res.send(newIfon)
})

AuthorRoute.get('/authorinfo', async(req, res)=>{
const authorInfo = await Author.find({})
res.send(authorInfo)
})

export default AuthorRoute