const express = require('express');
const route = express.Router();
const {zip,unZip} = require("../controllers/controller")
route.post("/zip",zip);
route.post("/UnZip",unZip);
module.exports=route;