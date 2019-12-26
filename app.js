const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const sensorRoutes = require("./routes/sensor");
const sensorCreateOptionsRoutes = require("./routes/sensorCreateOptions");
const userRoutes = require("./routes/user");
const app = express();

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  dbName: process.env.DB_NAME,
  useFindAndModify: false
}).then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log(err));

app.use(cors({
  origin: "https://feelit.netlify.com/",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/", sensorRoutes);
app.use("/", sensorCreateOptionsRoutes);
app.use("/", userRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
