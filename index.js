const express = require("express")
const PORT = process.env.PORT || 5000
const {Pool} = require("pg")
const path = require("path")

const indexRouter = require('./routers/index-router')
const aboutRouter = require('./routers/about-router')

const pool = new Pool({
    user : process.env.PGUSER,
    host : process.env.PGHOST,
    database : process.env.PGDATABASE,
    password : process.env.PGPASSWORD,
    port : process.env.PGPORT
})

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

  .use('/', indexRouter)
  .use('/about', aboutRouter)
    
  .listen(PORT, () => console.log("Listening on " + PORT))