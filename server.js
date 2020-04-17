const express = require("express")
const bodyParser = require('body-parser')
const routers = require('./src/routers')

const app = express()

app.set("view engine", "html")
app.engine("html", require("hbs").__express)
app.set("views",__dirname + "/src/views")

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({
    extended:true
}))

app.use(routers)

app.listen(3000)