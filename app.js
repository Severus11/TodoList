const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname +  "/date.js")
const mongoose = require("mongoose" )
const lodash = require("lodash")
const { result } = require("lodash")

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true})

const itemsSchema =  new mongoose.Schema({
  task:{
    type: String,
    required:[true, "Atleast enter the name of the task !"]
  }
})

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema]
})

const item = mongoose.model('item' ,itemsSchema) 
const List = mongoose.model("List", listSchema)

const item1 = new item ({
  task: "Welcome to your To Do list"
})
const item2 = new item ({
  task: "Type in your task and hit + button to save it !"
})
const item3 = new item ({
  task: "Once done, use the checkbox to cross it off the list !"
})
const defaultitems= [item1 , item2, item3]

app.set('view engine', 'ejs')
app.get("/", function(req,res){
  let day = date.getDay()


  item.find({}, function(err, result){
    if(result.length ===0)
    {
      item.insertMany(defaultitems, function(err){
        if(err)
        {
          console.log(err)
        }
        else{
          console.log('success')
        }
      })
      res.redirect("/")
    }
    else{
    res.render("list", {listTitle:"Today" ,newItems: result})
    }
  }) 
})

app.get("/:customListName", function(req,res){
  const customListName = req.params.customListName
  
  List.findOne({name: customListName}, function(err, result){
    if(!err){
      if(!result){
        const list = new List({
          name: customListName,
          items: defaultitems
        })
        list.save()
        res.redirect("/" + customListName)
      }
      else{
        res.render("list", {listTitle: result.name, newItems: result.items})
      }
    }
  })
 
  
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
  var newItem = req.body.newItem
  const newTask = new item ({
    task: newItem
  })

  newTask.save()
  res.redirect("/")  
})

app.post("/delete", function(req,res){
  const checkedItemId = req.body.checkbox
  const listName = req.body.listName

  if (listName === "Today")
  {
    item.findByIdAndDelete(checkedItemId, function(err){
      if(!err){
        console.log("deleted")
        res.render("/")
      }
    })
  }else{
    List.findOneAndUpdate(
      {name: listName},
      {$pull:{items:{_id: checkedItemId}}},
      function(err, result){
        if(!err){
          res.redirect("/"+ listName)
        }
      }
    )
  }
  

  res.redirect("/")
})

app.listen(3000, function(){
  console.log("app running")
})
