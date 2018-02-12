const express = require("express")
const app = express()
const fs = require("fs")
var url = require('url');
let data = require("./data.json")

append_data = (name)=>{
    data.history.push({name:name, unit:"beer"})
}

update_data = (username)=>{
    fileName = "data.json"
    append_data(username)
    fs.writeFile(fileName, JSON.stringify(data), function (err) {
      if (err) return console.log(err);
      console.log(JSON.stringify(data));
      console.log('writing to ' + fileName);
    });
}


app.get("/", (req,res)=>res.sendFile(__dirname + "/index.html"))
app.get('/search', function (req, res) {
  //res.json(data);
  res.sendFile(__dirname + "/list_index.html")
})

app.get('/get_data', function (req, res) {
  res.json(data);
})
app.get('/update_list', function (req, res) {
    username = req.query.username 
     
    update_data(username)
    res.sendFile(__dirname + "/index.html")
})


app.listen(3000, ()=>console.log("listinening"))
