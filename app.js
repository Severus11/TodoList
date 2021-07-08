const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname +  "/date.js")

const app = express()
var items = ["buy food", "cook food"]
var workitems =[]

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

app.set('view engine', 'ejs')
app.get("/", function(req,res){
  let day = date.getDay()
  res.render("list", {listTitle:day,newItems: items})
})

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List" , newItems: workitems})

})

app.get("/about", function(req,res){
  res.render("about")
})

app.post("/work", function(req,res){
  var item = req.body.newItem
  workitems.push(item)
  res.redirect("/work")
})

app.post("/", function(req,res){
  var item = req.body.newItem
  if(req.body.list ==="Work List")
  {
    workitems.push(item)
    res.redirect("/work")
  }
  else {
      items.push(item)
      res.redirect("/")
  }

})

app.listen(3000, function(){
  console.log("app running")
})
