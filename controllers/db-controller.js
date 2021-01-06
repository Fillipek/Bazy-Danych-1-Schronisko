const pool = require("../database-connection")

class DbController {
    selectZwierzeta = async (req, res) => {
        let result = await pool.query('SELECT \
            imie AS "Imię", \
            gatunek AS "Gatunek", \
            rasa AS "Rasa", \
            data_urodzenia AS "Data urodzenia" \
            FROM schronisko.zwierzeta')
        // res.send(result);
        res.render("browse", {data : result});
    }
}

module.exports = new DbController();