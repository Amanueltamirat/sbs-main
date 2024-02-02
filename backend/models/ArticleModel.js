import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema(
  {
    authorName: {
        type: String,
      },
    authorTitle: {
        type: String,
      },
    
    title: {
      type: String,
    },
    date: {
      type: Date,
    },
    image: {
      type: String,
      default:
        'https://dg.imgix.net/jesus-loves-that-you-love-jesus-y0s3mjj1-en/landscape/jesus-loves-that-you-love-jesus-y0s3mjj1-afffad920e931c688f2c5c3c94b5d37a.jpg?ts=1702406313&ixlib=rails-4.3.1&auto=format%2Ccompress&fit=min&w=700&h=394&dpr=2&ch=Width%2CDPR',
    },
     profilePicture: {
      type: String,
      default:
        'https://dg.imgix.net/jesus-loves-that-you-love-jesus-y0s3mjj1-en/landscape/jesus-loves-that-you-love-jesus-y0s3mjj1-afffad920e931c688f2c5c3c94b5d37a.jpg?ts=1702406313&ixlib=rails-4.3.1&auto=format%2Ccompress&fit=min&w=700&h=394&dpr=2&ch=Width%2CDPR',
    },
    overView:{
      type: String,
    },
    content: {
      type: String,
    },
    userId:{
      type:String
    },
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model('Article', ArticleSchema);
export default Article;
