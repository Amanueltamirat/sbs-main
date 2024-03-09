import mongoose from 'mongoose';



const BookCoverSchema = mongoose.Schema({
 
  image: {
    type: String,
  },

});

const BookCover = mongoose.model('BookCover', BookCoverSchema);
export default BookCover;
