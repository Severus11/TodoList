const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

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
  res.render("list", {kindofDay:day,newItem: item})
})

app.post("/", function(req,res){
  var item= req.body.newItem
  res.redirect("/")
})

app.listen(3000, function(){
  console.log("app running")
})
