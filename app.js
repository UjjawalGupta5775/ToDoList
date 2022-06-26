const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const listItems = ["Pick Bottle", "Fill Water", "Drink Water"];
const workListItems = [];

app.get("/", function(req, res){
  const day = date.getDate();
  res.render("list", {listTitle:day, newList:listItems});
})
app.post("/", function(req, res){
  const newListItem = req.body.newItem;
  if(req.body.list === "Work"){
    workListItems.push(newListItem);
    res.redirect("/work");
  } else{
    listItems.push(newListItem);
    res.redirect("/");
  }
})

app.get("/work", function(req, res){
res.render("list", {listTitle:"Work List", newList:workListItems});
})
app.post("/work", function(req, res){
  const newListItem = req.body.newItem;
  workListItems.push(newListItem);
  res.redirect("/work");
})

app.get("/about", function(req, res){
  res.render("about");
})

app.listen(3001, function(){
  console.log("Server is up and running on port 3001");
})
