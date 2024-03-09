import mongoose from 'mongoose';

const AuthorSchema = mongoose.Schema({
  author: {
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

const Author = mongoose.model('Author', AuthorSchema);
export default Author;
