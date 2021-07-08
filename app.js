const express = require("express")
const bodyParser = require("body-parser")

const app = express()
var items = ["buy food", "cook food"]
var workitems =[]

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

app.set('view engine', 'ejs')
app.get("/", function(req,res){
  var today = new Date();
  var currentDay = today.getDay()
  var options = {
    weekday :'long',
    day : 'numeric',
    month: 'long'
  }

  var day = today.toLocaleDateString('en-us', options)
  res.render("list", {listTitle:day,newItems: items})
})

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List" , newItems: workitems})

})

app.post("/work", function(req,res){
  var item = req.body.newItem
  workitems.push(item)
  res.redirect("/work")
})

app.post("/", function(req,res){
  var item= req.body.newItem
  items.push(item)
  res.redirect("/")
})

app.listen(3000, function(){
  console.log("app running")
})
