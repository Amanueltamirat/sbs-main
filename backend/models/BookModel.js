import mongoose from 'mongoose';



const BookSchema = mongoose.Schema({
  author: {
    type: String,
  },
  file:{
  type:String 

  },
  image: {
    type: String,
  },
  title: {
    type: String,
  },
  overView: {
    type: String,
  },
  endorsements: {
    content: {
      stpe: String,
    },
    by: {
      type: String,
    },
    position: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
  },
  description: {
    type: String,
  },
});

const Books = mongoose.model('Books', BookSchema);
export default Books;
