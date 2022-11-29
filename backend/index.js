const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const InitiateMongoDBServer = require("./config/_dbConfig");
const user = require("./routes/userAuth");
const feed = require("./routes/userFeed");
const cors = require("cors");
// InitiateMongoDb
InitiateMongoDBServer();

// PORT
const PORT = process.env.PORT || 8080;

// Middleware
// configure the app to use bodyParser()
app.use(
  cors({
    origin: "*",
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log(res);
  res.json({ message: "API Testing . Working alright alright alright !!!!" });
});

app.post("/test", (req, res) => {
  console.log("test", req.body);
  res.json({ message: "API Testing . Working alright alright alright !!!!" });
});
// Rotues
app.use("/user", user);
app.use("/userfeed", feed);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
