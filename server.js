import express from "express"
import fs from "fs";

const app = express()

app.use(express.static("./public"));

app.get("/", (req,res) => {
    // const data = fs.readFileSync("index.html","utf8");
    // console.log(data); 
    res.render("index.ejs");
})

app.listen(3000)