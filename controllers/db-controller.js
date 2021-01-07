const pool = require("../database-connection")

class DbController {
    selectZwierzeta = async (req, res) => {
        let result = await pool.query('SELECT \
            imie AS "Imię", \
            gatunek AS "Gatunek", \
            rasa AS "Rasa", \
            data_urodzenia AS "Data urodzenia" \
            FROM schronisko.zwierzeta')
        res.render("browse", {data : result, title : "Zwierzęta"});
    }
    selectPersonel = async (req, res) => {
        let result = await pool.query('SELECT imie AS "Imię", nazwisko AS "Nazwisko",\
         CAST(pensja/100. AS NUMERIC(10,2)) AS "Pensja", pesel AS "PESEL", nazwa AS "Stanowisko"\
          FROM schronisko.personel NATURAL JOIN schronisko.grupy_zawodowe')
        res.render("browse", {data : result,  title : "Personel"});
    }
    selectWpisy = async (req, res) => {
        let result = await pool.query('SELECT * FROM schronisko.zwierzeta_info')
        res.render("browse", {data : result, title : "Zwierzęta Info"});
    }
    selectBoksy = async (req, res) => {
        let result = await pool.query('SELECT * FROM schronisko.boksy')
        res.render("browse", {data : result, title : "Boksy"});
    }
    selectPawilony = async (req, res) => {
        let result = await pool.query('SELECT * FROM schronisko.pawilony')
        res.render("browse", {data : result, title : "Pawilony"});
    }
    selectMagazyn = async (req, res) => {
        let result = await pool.query('SELECT * FROM schronisko.magazyn')
        res.render("browse", {data : result, title : "Magazyn"});
    }
}

module.exports = new DbController();