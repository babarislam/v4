const mongoose = require('mongoose');
const Camp = require('./campground');
const data = [
  {
  name: "Patriata",
  image: "https://farm4.staticflickr.com/3879/14549144135_5c53988fee.jpg",
  description: "Blah blah blah blah"
},
{
name: "Gilgit",
image: "https://farm3.staticflickr.com/2923/14622617396_1b90d3aab3.jpg",
description: "Blah blah blah blah"
},
{
name: "Hunza",
image: "https://farm5.staticflickr.com/4132/4989464291_0c4a95c200.jpg",
description: "Blah blah blah blah"
}
];
const Comment = require("./comments");
function seedDb() {
  //Rmove all campgrouns
  Camp.remove({}, (err)=> {
  if(err) {
    console.log(err);
  }
console.log("camground removed");
// Create campgrounds
data.forEach((camp)=> {
  Camp.create(camp, (err,data)=> {
    if (err) { console.log(err);} else {
      console.log("camps added")

      Comment.create({
        text: "Its a fantastic place, a piece of heaven on earth",
        author: "babar"
      }, (err,comment)=>{
        if(err)
        {  console.log(err);} else
        {  data.comments.push(comment);
          data.save();
          console.log("a comment is added");}
      });
  }
  });
});
// Create comments
});
// Create comments


// Create campgrounds

}
module.exports = seedDb;
