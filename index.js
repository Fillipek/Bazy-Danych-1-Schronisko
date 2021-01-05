const express = require("express")
const PORT = process.env.PORT || 5000
const {Pool} = require("pg")

const pool = new Pool({connectionString : process.env.DATABASE_URL})

express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
  .get("/", (req, res) => {
      res.send("dupa")
  })
  .get("/baza", async (req, res) => {
    const result = await pool.query("SELECT table_name FROM information_schema.tables")
    res.send(result.rows)
})
  .listen(PORT, () => console.log("Listening on ${ PORT }"))