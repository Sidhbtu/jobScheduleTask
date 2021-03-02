const express = require("express");
const route = express.Router();
const Col1 = require("../models/Col1");
const Col2 = require("../models/Col2");
const schedule = require("node-schedule");

route.post("/job_schedule", (req, res, next) => {
  var max = Number.MAX_SAFE_INTEGER;
  var min = Number.MIN_SAFE_INTEGER;
  var jobData = {
    id: Math.floor(Math.random() * (max - min)) + min,
    message: req.body.message,
    day: req.body.day,
    time: req.body.time,
    versionKey: false,
  };
  //console.log("inserted into col1 at "+ jobData.day+" "+jobData.time);
  const dayData = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };
  Col1.create(jobData, (err, details) => {
    if (err) console.error(err);
    console.log("inserted into col1 at " + jobData.day + " " + jobData.time);
  });

  let d = -1;

  d = dayData[jobData.day];

  var timeList = jobData.time.split(":");
  const rule = new schedule.RecurrenceRule();
  rule.minute = timeList[1];
  rule.dayOfWeek = d;
  rule.hour = timeList[0];
  rule.second = timeList[2];
  const job = schedule.scheduleJob(rule, function () {
    Col2.create(jobData, (err, details) => {
      if (err) console.error(err);
      console.log("inserted into col2 at " + jobData.day + " " + jobData.time);
    });
  });
  res.send("done");
});

route.get("/", (req, res, next) => {
  res.send("hello2");
});

module.exports = route;
