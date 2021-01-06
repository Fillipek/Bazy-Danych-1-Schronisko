const express = require("express")
const PORT = process.env.PORT || 5000
const path = require("path")

const indexRouter = require('./routers/index-router')
const aboutRouter = require('./routers/about-router')
const dbRouter = require('./routers/db-router')

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

  .use('/', indexRouter)
  .use('/about', aboutRouter)
  .use('/browse', dbRouter)
    
  .listen(PORT, () => console.log("Listening on " + PORT))