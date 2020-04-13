// const mongoose = require("mongoose");

// mongoose.connect("mongodb+srv://umakanthpendyala:posts123@newtestserver-abxpk.mongodb.net/postDb", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
//   if (err) {
//     console.log("error occured");
//   }
//   else {
//     console.log("sonnected to mongo db");
//   }
// })

// const postsSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: [true, "there should be title for the post"]
//   },
//   postInfo: {
//     type: String,
//      required: [true, "there should be content to the post"]
//   }
// })


// const Post = mongoose.model("Post", postsSchema);

// const post = new Post ( {
//   title: "day1",
//   postInfo: "this is working"
// })

// post.save();

// Post.find((err, data) => {
//   if (err) console.log("error occured")
//   else console.log(data);
// })