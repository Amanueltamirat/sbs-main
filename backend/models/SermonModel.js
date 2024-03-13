import mongoose from "mongoose";

const SermonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    //   required: true,
    },

    imageUrl: {
      type: String,
    //   required: true,
    },
    audioUrl: {
      type: String,
    //   required: true,
    },
    overView: {
      type: String,
    },
    date: {
      type: Date,
    //   required: true,
    },
    profilePicture: {
      type: String,
    //   required: true,
    },
    preacherTitle: {
      type: String,
    //   required: true,
    },
    preacherName: {
      type: String,
    //   required: true,
    },
    videoUrl:{
        type:String,
    
    },
    content:{
        type:String
    },
     category: {
      type: String,
      default: 'sermons',
    },
  },
  { timestamps: true }
);


const Sermons = mongoose.model('Sermons', SermonSchema);
export default Sermons