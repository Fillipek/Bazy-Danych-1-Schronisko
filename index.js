const express = require("express")
const PORT = process.env.PORT || 5000
const path = require("path")
const bodyParser = require("body-parser");

const indexRouter = require('./routers/index-router')
const aboutRouter = require('./routers/about-router')
const selectRouter = require('./routers/select-router')
const raportRouter = require('./routers/raport-router')
const insertRouter = require('./routers/insert-router')

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())

  .use('/', indexRouter)
  .use('/about', aboutRouter)
  .use('/browse', selectRouter)
  .use('/raport', raportRouter)
  .use('/insert', insertRouter)

  .listen(PORT, () => console.log("Listening on " + PORT))