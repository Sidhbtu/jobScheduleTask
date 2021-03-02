const express = require("express");
const app = express();
const route = require("./routes/index");
const mongoose = require("mongoose");
const os = require("os-utils");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var mongoDB =
  "mongodb+srv://aryasudhanshu:123@Vishal@cluster0.dnnzy.mongodb.net/csv_db?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", function () {
  console.log("MongoDB database connection established successfully");
});
app.use("/", route);
app.use((err, req, res, next) => {
  res.render("error", { title: "error", message: err.message });
});
app.listen(process.env.port || 4334, () => {
  console.log("Server started at http://localhost:4334");
});

setInterval(
  () =>
    os.cpuUsage((v) => {
      if (v > 70) {
        console.log("CPU Usage (%): " + v);
        process.exit();
      }
    }),
  1000
);
