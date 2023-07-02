require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const axios = require("axios");
require('dotenv').config();
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "This is our secret",
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.set("strictQuery", true);

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Successfully connected to MongoDB"))
//   .catch((err) => console.error("Connection error", err));



mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser:true , useUnifiedTopology:true})
.then( ()=> console.log("success") )
.catch((err) => console.log(err));

// const adminSchema = new mongoose.Schema({
//     email: String,
//     password: String
// });

const userSchema = new mongoose.Schema({
  email: String,
  password: String
  
});

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  city: String,
  state: String,
  country: String,
  author: String,
  type: String,
  date: Number,
  month: String,
  year: Number,
});

userSchema.plugin(passportLocalMongoose);
// adminSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);
const Post = new mongoose.model("Post", postSchema);
// const Admin = new mongoose.model("Admin", adminSchema);


passport.use(User.createStrategy());
// passport.use(Admin.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// passport.serializeUser(Admin.serializeUser());
// passport.deserializeUser(Admin.deserializeUser());

app.get("/", function (req, res) {
  const { city } = req.query
  if (city) {
    Post.find({ city: city.toLowerCase() }, function (err, foundPosts) {
      if (err) {
        console.log(err);
      } else {
        // console.log(foundPosts);
        res.render("home", { posted: foundPosts });
      }
    });
  }
  else {
    Post.find({}, function (err, foundPosts) {
      if (err) {
        console.log(err);
      } else {
        // console.log(foundPosts);
        res.render("home", { posted: foundPosts });
      }
    });
  }

});
app.get("/search",function(req,res){
  var city = req.query.searchByCity;
  console.log(city);
  if (city) {
    Post.find({ city: city.toLowerCase() }, function (err, foundPosts) {
      if (err) {
        console.log(err);
      } else {
        res.render("searchResult", { posted: foundPosts });
      }
    });
  }
  else {
    Post.find({}, function (err, foundPosts) {
      if (err) {
        console.log(err);
      } else {
        res.render("home", { posted: foundPosts });
      }
    });
  }
  // res.redirect("/searchResult");
})
app.get("/searchResult",function(req,res){
  res.render("searchResult");
});


app.get("/global",function(req,res){
  var gerne="global";
  if(gerne){
    Post.find({ type: gerne }, function (err, foundPosts) {
      if (err) {
        console.log(err);
      } else {
        res.render("searchResult", { posted: foundPosts });
      }
    });
  }
  else {
    Post.find({}, function (err, foundPosts) {
      if (err) {
        console.log(err);
      } else {
        res.render("home", { posted: foundPosts });
      }
    });
  }
});
app.get("/tech",function(req,res){
  var gerne="tech";
  if(gerne){
    Post.find({ type: gerne }, function (err, foundPosts) {
      if (err) {
        console.log(err);
      } else {
        res.render("searchResult", { posted: foundPosts });
      }
    });
  }
  else {
    Post.find({}, function (err, foundPosts) {
      if (err) {
        console.log(err);
      } else {
        res.render("home", { posted: foundPosts });
      }
    });
  }
});
app.get("/stock",function(req,res){
  var gerne="stock";
  if(gerne){
    Post.find({ type: gerne }, function (err, foundPosts) {
      if (err) {
        console.log(err);
      } else {
        res.render("searchResult", { posted: foundPosts });
      }
    });
  }
  else {
    Post.find({}, function (err, foundPosts) {
      if (err) {
        console.log(err);
      } else {
        res.render("home", { posted: foundPosts });
      }
    });
  }
});
app.get("/corporate",function(req,res){
  var gerne="corporate";
  if(gerne){
    Post.find({ type: gerne }, function (err, foundPosts) {
      if (err) {
        console.log(err);
      } else {
        res.render("searchResult", { posted: foundPosts });
      }
    });
  }
  else {
    Post.find({}, function (err, foundPosts) {
      if (err) {
        console.log(err);
      } else {
        res.render("home", { posted: foundPosts });
      }
    });
  }
});
app.get("/crime",function(req,res){
  var gerne="crime";
  if(gerne){
    Post.find({ type: gerne }, function (err, foundPosts) {
      if (err) {
        console.log(err);
      } else {
        res.render("searchResult", { posted: foundPosts });
      }
    });
  }
  else {
    Post.find({}, function (err, foundPosts) {
      if (err) {
        console.log(err);
      } else {
        res.render("home", { posted: foundPosts });
      }
    });
  }
});
app.get("/categoryPage",function(req,res){
  res.render("categoryPage");
});
app.get("/govts",function(req,res){
  var gerne="govts";
  if(gerne){
    Post.find({ type: gerne }, function (err, foundPosts) {
      if (err) {
        console.log(err);
      } else {
        res.render("searchResult", { posted: foundPosts });
      }
    });
  }
  else {
    Post.find({}, function (err, foundPosts) {
      if (err) {
        console.log(err);
      } else {
        res.render("home", { posted: foundPosts });
      }
    });
  }
});
app.get("/govtp",function(req,res){
  var gerne="govtp";
  if(gerne){
    Post.find({ type: gerne }, function (err, foundPosts) {
      if (err) {
        console.log(err);
      } else {
        res.render("searchResult", { posted: foundPosts });
      }
    });
  }
  else {
    Post.find({}, function (err, foundPosts) {
      if (err) {
        console.log(err);
      } else {
        res.render("home", { posted: foundPosts });
      }
    });
  }
});
app.get("/locate", async (req, res) => {
  console.log(req.query);
  const { lat, long } = req.query;
  const apiKey = process.env.API_KEY;
  const response = await axios.get(
    `https://api-bdc.net/data/reverse-geocode?latitude=${lat}&longitude=${long}&localityLanguage=en&key=${apiKey}`
  );
  // console.log(response)
  const { city, locality } = response.data;
  console.log(city);
  res.json({ city: city, locality: locality });
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});
app.get("/compose", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("compose");
  } else {
    res.redirect("/authentication");
  }
});
app.get("/authentication", function (req, res) {
  res.render("authentication");
});
// app.get("/admin", function(req,res){
//   if (req.isAuthenticated()) {
//     res.redirect("adminPage");
//   } else {
//     res.render("admin");
//   }
  
// });
// app.get("/adminPage", function(req,res){
//   Post.find({}, function (err, foundPosts) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.render("adminPage", { posted: foundPosts });
//     }
//   });
// });
// app.get("/adminLogout", function (req, res) {
//   req.logout(function (err) {
//     if (err) {
//       console.log(err);
//     }
//     res.redirect("/");
//   });
// });
app.get("/posts/:postId", (req, res) => {
  const requestedPostId = req.params.postId;
  if (requestedPostId){
    Post.find({ _id: requestedPostId }, function (err, foundPosts) {
      if (err) {
        console.log(err);
      } else {
        res.render("post", { posted: foundPosts });
      }
    });
  }else {
    Post.find({}, function (err, foundPosts) {
      if (err) {
        console.log(err);
      } else {
        res.render("home", { posted: foundPosts });
      }
    });
  }
  
});

app.get("/del/:postId", (req, res) => {
  const requestedPostId = req.params.postId;
  Post.deleteOne({ _id: requestedPostId }, function (err, post) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/adminPage");
    }
  });
});
app.get("/aboutus",function(req,res){
  res.render("aboutus");
});
app.get("/subscribe",function(req,res){
  res.render("subscribe");
})


app.post("/", function (req, res) {
});
// app.post("/registerAdmin", function (req, res) {
//   Admin.register(
//     { username: req.body.username },
//     req.body.password,
//     function (err, user) {
//       if (err) {
//         console.log(err);
//         res.redirect("/admin");
//       } else {
//         passport.authenticate("local")(req, res, function () {
//           res.redirect("/adminPage");
//         });
//       }
//     }
//   );
// });

// app.post("/loginAdmin", function (req, res) {
//   const admin = new Admin({
//     username: req.body.username,
//     password: req.body.password,
//   });
//   req.login(admin, function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       passport.authenticate("local")(req, res, function () {
//         res.redirect("/adminPage");
//       });
//     }
//   });
// });

app.post("/register", function (req, res) {
  User.register(
    { username: req.body.username },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/authentication");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/compose");
        });
      }
    }
  );
});

app.post("/login", function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/compose");
      });
    }
  });
});

app.post("/compose", function (req, res) {
  User.findById(req.user.id, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        const image = req.body.filename;
        console.log(image);
        const post = new Post({
          title: req.body.postTitle,
          content: req.body.postBody,
          type  : req.body.postType,
          city: req.body.postCity.toLowerCase(),
          state: req.body.postState,
          country: req.body.postCountry,
          author: req.body.postAuthor,
          date: req.body.postDate,
          month: req.body.postMonth,
          year: req.body.postYear,
        });
        post.save(function (err) {
          if (err) {
            console.log(err);
          } else {
            res.redirect("/");
          }
        });
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
