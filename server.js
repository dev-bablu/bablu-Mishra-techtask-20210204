const { static } = require("express");
const express = require("express");
const fs=require("fs");
const path = require("path");
const app = express();
const route = require("./routes/route")
const PORT = 5000;
app.use(express.static(path.join(__dirname,"view")));
// app.use("/",(req,res)=>{
//     res.send("Hello zipper!");
// });
const dir = "media";
const subDirectory="media/uploads"
if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
    
    fs.mkdirSync(subDirectory);
}
app.use("/media",route);
app.listen(PORT,()=>{
    console.log(`Server is running at Port : ${PORT}`);
})
