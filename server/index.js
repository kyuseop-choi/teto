const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
//const bodyParser = require('body-parser');

//Content-type이 application/x-www-form-urlencoded인 데이터를 분석해서 가져올 수 있도록 해줌
//app.use(bodyParser.urlencoded({extended: true})); //bodyParser는 deprecated 되어있어 수정
app.use(express.urlencoded());

//Content-type이 application/json인 데이터를 분석해서 가져올 수 있게 해줌
//app.use(bodyParser.json());
app.use(express.json());
//토큰을 쿠키에 저장하기 위한 cookie-parser 사용
app.use(cookieParser());

app.use("/api/users", require("./routes/users"));
app.use("/api/surveys", require("./routes/surveys"));
app.use("/api/bingos", require("./routes/bingos"));
app.use("/api/likes", require("./routes/likes"));
app.use("/api/comments", require("./routes/comments"));

if (process.env.NODE_ENV === "production") {
  // 임시 수정
  app.use(express.static("client/build"));
  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const mongoose = require("mongoose");

//mongoDB 연결
mongoose
  .connect(
    config.mongoURI, //key값
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
