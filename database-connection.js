const {Pool} = require("pg")

const pool = new Pool({
    user : process.env.PGUSER,
    host : process.env.PGHOST,
    database : process.env.PGDATABASE,
    password : process.env.PGPASSWORD,
    port : process.env.PGPORT
})

module.exports = pool;

// <%= stachu[1].imie%>
// render = async (req, res) => {
//     let result = await pool.query("SELECT * FROM schronisko.zwierzeta")
//     res.render("about", { stachu : result.rows });
// }