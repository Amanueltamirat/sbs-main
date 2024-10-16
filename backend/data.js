import bcrypt from "bcryptjs";
const data = {
  users: [
    {
      name: "Amanuel",
      email: "amanuel.tamirat22@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    // {
    //   name: "Tesfa",
    //   email: "admin@tesfa.com",
    //   password: bcrypt.hashSync("123456"),
    //   isAdmin: true,
    // },
    // {
    //   name: "John",
    //   email: "user@test.com",
    //   password: bcrypt.hashSync("23456"),
    //   isAdmin: false,
    // },
  ],
  articles: [
    {
      title: "Jesus Loves That You Love Jesus()",
      date: new Date(),
      image:
        "https://dg.imgix.net/in-the-beginning-paul-junicnqb-en/landscape/in-the-beginning-paul-junicnqb-fc74430973a44b25487cb69c337635ea.jpg?ts=1707944726&ixlib=rails-4.3.1&auto=format%2Ccompress&fit=min&w=800&h=450&dpr=2&ch=Width%2CDPR",
      
        authorName: "Article by Stephen Witmer",
        authorTitle: "Pastor, Pepperell, Massachusetts",
      
      content:
        "“Rejoice that your names are written in heaven.” In Luke 10:20, Jesus tells his followers to rejoice that their eternal future with God is assured. It may seem odd that he commands such joy. If someone said he was sending you to a tropical paradise for an all-expenses-paid vacation, wouldn’t you rejoice without being told to do so?",
      overView:
        "“Rejoice that your names are written in heaven.” In Luke 10:20, Jesus tells his followers to rejoice that their eternal future with God is assured. It may seem odd that he commands such joy.",
    },
    
    {
      title: "Jesus Loves That You Love Jesus",
      date: new Date(),
      image:
        "https://dg.imgix.net/jesus-loves-that-you-love-jesus-y0s3mjj1-en/landscape/jesus-loves-that-you-love-jesus-y0s3mjj1-afffad920e931c688f2c5c3c94b5d37a.jpg?ts=1702406313&ixlib=rails-4.3.1&auto=format%2Ccompress&fit=min&w=700&h=394&dpr=2&ch=Width%2CDPR",
     
        authorName: "Article by Stephen Witmer",
        authorTitle: "Pastor, Pepperell, Massachusetts",
      
      content:
        "“Rejoice that your names are written in heaven.” In Luke 10:20, Jesus tells his followers to rejoice that their eternal future with God is assured. It may seem odd that he commands such joy. If someone said he was sending you to a tropical paradise for an all-expenses-paid vacation, wouldn’t you rejoice without being told to do so?",
     overView:
        "“Rejoice that your names are written in heaven.” In Luke 10:20, Jesus tells his followers to rejoice that their eternal future with God is assured. It may seem odd that he commands such joy.",
    },
    {
      title: "Jesus Loves That You Love Jesus",
      date: new Date(),
      image:
        "https://dg.imgix.net/jesus-loves-that-you-love-jesus-y0s3mjj1-en/landscape/jesus-loves-that-you-love-jesus-y0s3mjj1-afffad920e931c688f2c5c3c94b5d37a.jpg?ts=1702406313&ixlib=rails-4.3.1&auto=format%2Ccompress&fit=min&w=700&h=394&dpr=2&ch=Width%2CDPR",
     
        authorName: "Article by Stephen Witmer",
        authorTitle: "Pastor, Pepperell, Massachusetts",
      
      content:
        "“Rejoice that your names are written in heaven.” In Luke 10:20, Jesus tells his followers to rejoice that their eternal future with God is assured. It may seem odd that he commands such joy. If someone said he was sending you to a tropical paradise for an all-expenses-paid vacation, wouldn’t you rejoice without being told to do so?",
     overView:
        "“Rejoice that your names are written in heaven.” In Luke 10:20, Jesus tells his followers to rejoice that their eternal future with God is assured. It may seem odd that he commands such joy.",
    },
    {
      title: "Jesus Loves That You Love Jesus",
      date: new Date(),
      image:
        "https://dg.imgix.net/jesus-loves-that-you-love-jesus-y0s3mjj1-en/landscape/jesus-loves-that-you-love-jesus-y0s3mjj1-afffad920e931c688f2c5c3c94b5d37a.jpg?ts=1702406313&ixlib=rails-4.3.1&auto=format%2Ccompress&fit=min&w=700&h=394&dpr=2&ch=Width%2CDPR",
     
        authorName: "Article by Stephen Witmer",
        authorTitle: "Pastor, Pepperell, Massachusetts",
      
      content:
        "“Rejoice that your names are written in heaven.” In Luke 10:20, Jesus tells his followers to rejoice that their eternal future with God is assured. It may seem odd that he commands such joy. If someone said he was sending you to a tropical paradise for an all-expenses-paid vacation, wouldn’t you rejoice without being told to do so?",
      overView:
        "“Rejoice that your names are written in heaven.” In Luke 10:20, Jesus tells his followers to rejoice that their eternal future with God is assured. It may seem odd that he commands such joy.",
     },
    {
      title: "Jesus Loves That You Love Jesus",
      date: new Date(),
      image:
        "https://dg.imgix.net/jesus-loves-that-you-love-jesus-y0s3mjj1-en/landscape/jesus-loves-that-you-love-jesus-y0s3mjj1-afffad920e931c688f2c5c3c94b5d37a.jpg?ts=1702406313&ixlib=rails-4.3.1&auto=format%2Ccompress&fit=min&w=700&h=394&dpr=2&ch=Width%2CDPR",
     
        authorName: "Article by Stephen Witmer",
        authorTitle: "Pastor, Pepperell, Massachusetts",
      
      content:
        "“Rejoice that your names are written in heaven.” In Luke 10:20, Jesus tells his followers to rejoice that their eternal future with God is assured. It may seem odd that he commands such joy. If someone said he was sending you to a tropical paradise for an all-expenses-paid vacation, wouldn’t you rejoice without being told to do so?",
      overView:
        "“Rejoice that your names are written in heaven.” In Luke 10:20, Jesus tells his followers to rejoice that their eternal future with God is assured. It may seem odd that he commands such joy.",
     },
  ],
  sermons: [
    {
      id: 1,
      title: "God: Creator and Redeemer",
      bibleVerse: "Genesis 1:1",
      date: new Date(),
      audio: "audio",
    },
    {
      id: 3,
      title: "God: Creator and Redeemer",
      bibleVerse: "Genesis 1:1",
      date: new Date(),
      audio: "audio",
    },
    {
      id: 3,
      title: "God: Creator and Redeemer",
      bibleVerse: "Genesis 1:1",
      date: new Date(),
      audio: "audio",
    },
  ],
  books: [
    {
      id: 1,
      image: "img",
      title: "12 Ways Your Phone Is Changing You",
      author: "by Tony Reinke",
      overView:
        "Within a few years of its unveiling, the smartphone had become part of us, fully integrated into the daily patterns of our lives. Never offline, always within reach, we now wield in our hands a magic wand of technological power we have only begun to grasp. But it raises new enigmas, too. Never more connected, we seem to be growing more distant. Never more efficient, we have never been more distracted.",
      endorsements: {
        content:
          "Let’s face our smartphone habits with the aim of deepening our delight in Jesus. I know of no book like this one by Tony Reinke, and I doubt anyone is writing more insightfully on the intersection of where our digital habits clash with our eternal joy. Join me in praying to the living God who gave us technology, to give wings to this important book inside the church and far beyond, a timely gift to all of us riveted by a small screen in search of what is only offered to us in Christ.",
        by: "John Piper",
        postion: "Founder & Teacher, desiringGod.org",
        profilePicture: "pp",
      },
      description:
        "An Overview of Central Concerns About Manhood and Womanhood",
    },
    {
      id: 2,
      image: "img",
      title: "12 Ways Your Phone Is Changing You",
      author: "by Tony Reinke",
      overView:
        "Within a few years of its unveiling, the smartphone had become part of us, fully integrated into the daily patterns of our lives. Never offline, always within reach, we now wield in our hands a magic wand of technological power we have only begun to grasp. But it raises new enigmas, too. Never more connected, we seem to be growing more distant. Never more efficient, we have never been more distracted.",
      endorsements: {
        content:
          "Let’s face our smartphone habits with the aim of deepening our delight in Jesus. I know of no book like this one by Tony Reinke, and I doubt anyone is writing more insightfully on the intersection of where our digital habits clash with our eternal joy. Join me in praying to the living God who gave us technology, to give wings to this important book inside the church and far beyond, a timely gift to all of us riveted by a small screen in search of what is only offered to us in Christ.",
        by: "John Piper",
        postion: "Founder & Teacher, desiringGod.org",
        profilePicture: "pp",
      },
      description:
        "An Overview of Central Concerns About Manhood and Womanhood",
    },
    {
      id: 3,
      image: "img",
      title: "12 Ways Your Phone Is Changing You",
      author: "by Tony Reinke",
      overView:
        "Within a few years of its unveiling, the smartphone had become part of us, fully integrated into the daily patterns of our lives. Never offline, always within reach, we now wield in our hands a magic wand of technological power we have only begun to grasp. But it raises new enigmas, too. Never more connected, we seem to be growing more distant. Never more efficient, we have never been more distracted.",
      endorsements: {
        content:
          "Let’s face our smartphone habits with the aim of deepening our delight in Jesus. I know of no book like this one by Tony Reinke, and I doubt anyone is writing more insightfully on the intersection of where our digital habits clash with our eternal joy. Join me in praying to the living God who gave us technology, to give wings to this important book inside the church and far beyond, a timely gift to all of us riveted by a small screen in search of what is only offered to us in Christ.",
        by: "John Piper",
        postion: "Founder & Teacher, desiringGod.org",
        profilePicture: "pp",
      },
      description:
        "An Overview of Central Concerns About Manhood and Womanhood",
    },
  ],
};
export default data;