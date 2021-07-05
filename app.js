const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.set('view engine', 'ejs')
app.get("/", function(req,res){
  var today = new Date();
  var currentDay = today.getDay()
  var day =""
  switch (currentDay) {
    case 0:
      day ="Sunday"
      break;
      case 0:
        day ="Sunday"
        break;
        case 0:
          day ="Sunday"
          break;
          case 0:
            day ="Sunday"
            break;
            case 0:
              day ="Sunday"
              break;
              case 0:
                day ="Sunday"
                break;
                case 0:
                  day ="Sunday"
                  break;
    default:

  }
    res.render("list", {kindofDay:day})
})

app.listen(3000, function(){
  console.log("app running")
})
