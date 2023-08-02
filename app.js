var express = require("express");
const cors = require("cors"); // add at the top
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var petsRouter = require("./routes/pets");
var photosRouter = require("./routes/photos");
var authRouter = require("./routes/auth");
var breedsRouter = require("./routes/breeds");
var messagesRouter = require("./routes/messages");
var profileRouter = require("./routes/userProfiles");
var contactRouter = require("./routes/contacts");
var quizRouter = require("./routes/quiz");
var friendsRouter = require("./routes/friends");

var app = express();

app.use(cors()); // add after 'app' is created
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static("public"));

//app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/breeds", breedsRouter);
app.use("/api/auth", authRouter);
app.use("/api/photos", photosRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/user_profiles/", profileRouter);
app.use("/api/contact", contactRouter);
app.use("/api/quiz", quizRouter);
app.use("/api/friends", friendsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
