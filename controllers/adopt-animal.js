const pool = require("../database-connection")

class AdoptAnimal {
    pageSelectAnimal = async (req, res) => {
        try
        {
            let adoptables = await pool.query(
                "SELECT id_wpisu, imie, gatunek, rasa, typ, data_urodzenia, data_przyjecia, uwagi FROM schronisko.zwierzeta \
                 NATURAL JOIN schronisko.zwierzeta_info NATURAL JOIN schronisko.boksy NATURAL JOIN schronisko.pawilony \
                 WHERE data_adopcji IS NULL AND typ NOT IN ('resocjalizacyjny', 'leczniczy', 'rehabilitacyjny')"
            );
            let species = await pool.query(
                "SELECT DISTINCT gatunek FROM schronisko.zwierzeta NATURAL JOIN schronisko.zwierzeta_info WHERE data_adopcji IS NULL"
            )
            res.render("adopt-animal", { 
                zwierzeta: adoptables,
                gatunki : species
            });
        }
        catch(err)
        {
            console.log("SELECT zwierząt do adopcji nie udał się: " + err);
        }
        
    }

    pageSelectClient = async (req, res) => {
        try
        {
            let customers = await pool.query(
                "SELECT id_klienta, imie, nazwisko, CONCAT(ulica, ', ', kod_pocztowy, ' ', miasto) AS adres, pesel FROM  schronisko.klienci"
            );
            res.render("adopt-animal-page-2", {
                id_wpisu : req.body.id_wpisu,
                klienci : customers
            })
            // res.send(customers);
        }
        catch(err)
        {
            console.log("SELECT klientów nie udał się: " + err);
        }
    }

    postForm = async (req, res) => {

        if(typeof req.body.id_klienta === 'undefined')
        {
            let newId = await pool.query('SELECT MAX(id_klienta)+1 AS "id" FROM schronisko.klienci');
            req.body.id_klienta = newId.rows[0].id;
            let errMsg = "";

            if(req.body.imie == "") errMsg = "Nie podano imienia.";
            if(req.body.nazwisko == "") errMsg = "Nie podano nazwiska.";
            if(req.body.ulica == "") errMsg = "Nie podano ulicy.";
            if(req.body.kod_pocztowy == "") errMsg = "Nie podano kodu pocztowego.";
            if(req.body.miasto == "") errMsg = "Nie podano miejscowości.";
            if(req.body.pesel == "") errMsg = "Nie podano numeru PESEL.";

            if(errMsg == "")
            {
                res.render("error", {
                    msg : errMsg
                });
                return;
            }
            
            try
            {
                await pool.query("BEGIN");
                await pool.query(
                    "INSERT INTO schronisko.klienci (id_klienta, imie, nazwisko, ulica, kod_pocztowy, miasto, pesel)\
                     VALUES ($1,$2,$3,$4,$5,$6,$7)",
                     [newId, req.doby.imie, req.body.nazwisko, req.body.ulica, req.body.kod_pocztowy, req.body.miasto, req.body.pesel]
                );
            }
            catch(err)
            {
                await pool.query("ROLLBACK");
                res.render("error", {
                    msg : err
                });
                return;
            }
        }

        let data = await pool.query("SELECT nazwa, numer \
            FROM schronisko.pawilony NATURAL JOIN schronisko.boksy NATURAL JOIN schronisko.zwierzeta_info \
            WHERE id_wpisu = $1",
            [req.body.id_wpisu]
        );

        let nazwaPawilonu = data.rows[0].nazwa;
        let numerBoksu = data.rows[0].numer;
        try
        {
            await pool.query(
                "UPDATE schronisko.zwierzeta_info SET id_klienta = $1, data_adopcji = NOW() WHERE id_wpisu = $2 AND id_klienta IS NULL",
                [req.body.id_klienta, req.body.id_wpisu]
            );
            await pool.query("COMMIT");
        }
        catch(err)
        {
            res.render("error", {
                msg : err
            })
            await pool.query("ROLLBACK");
            return;
        }
        res.render("success", {
            msg : "Gratulacje, pomyślnie dokonano adopcji.",
            hint : 'Szczęśliwiec czeka w pawilonie "'+ nazwaPawilonu + '" w boksie ' + numerBoksu,
            anotherOne : "/form/adopt_animal"
        })
    }
}

const controller = new AdoptAnimal();
module.exports = controller;