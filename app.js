//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const stringModifier = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    console.log("didnt connect to database");
  }
  else {
    console.log("connected");
  }
});

const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "there should be title for the post"]
  },
  postInfo: {
    type: String,
     required: [true, "there should be content to the post"]
  }
})

var mongoSendingBuffer;


const Post = mongoose.model("Post", postsSchema);



let posts = [];

const jsonData = {
  para_1: homeStartingContent
}

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {

  Post.find((err, data) => {
      posts = [];
      for (var i = 0; i < data.length; i++) {
        var buffer = {
          title: data[i].title,
          postBody: data[i].postInfo
        }
        posts.push(buffer);
      }
      res.render("home", {
        para_1: homeStartingContent,
        posts: posts
      });
  })
})

app.get("/compose" , (req, res) => {
  res.render("checkUser", {
    errMsg: ""
  });
});



// app.post("/identify", (req, res) => {
//   res.render("checkUser", {
//     errMsg: ""
//   });
// })



app.post("/userIn", (req, res) => {
  var email = req.body.emailBx;
  var password = req.body.passBx;
  console.log(email, password);
  if (password == "10101001" && email == "umakanthpendyala@gmail.com") {
    res.render("compose");
  }
  else if (password == "") {
    res.render("checkUser", {
      errMsg: ""
    })
  }
  else {

    res.render("checkUser", {
      errMsg: "password incorrect"
    })
  }
})



app.get("/posts/:name", (req, res) => {
  var postName = req.params.name;
  postName = stringModifier.lowerCase(postName);

  var url = "/posts/" + postName;

  for (var i = 0; i < posts.length; i++) {
    var buffer = stringModifier.lowerCase(posts[i].title); 
    // console.log("entered");
    if (buffer === postName) {
      console.log("match found");
      res.render("post", {
        postTitle: posts[i].title,
        postBody: posts[i].postBody,
      })
    }
  }
  console.log("ended");
})




app.get("/about", (req, res) => {
  res.render("about", {
    about_Content: aboutContent
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    contactContent: contactContent
  });
})

app.get("/compose", (req, res) => {
  res.render("compose");
})

app.post("/composed", (req, res) => {
  const data = req.body.tbx;
  const myObj = {
    title: req.body.tbx,
    postBody: req.body.postBody
  } 

  mongoSendingBuffer = {
    title: myObj.title,
    postInfo: myObj.postBody
  }
    const post = new Post(mongoSendingBuffer);
    post.save();
    console.log("data logged perfectly"); 
  
  // posts.push(myObj);
  // console.log(posts);
  res.redirect("/");
})


app.listen(process.env.PORT, () => {
  console.log("port running perfectly");
})





