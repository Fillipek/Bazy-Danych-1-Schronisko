const pool = require("../database-connection")

class SelectController {
    raportPawilonyBoksy = async (req, res) => {
        
        let raportPawilony = await pool.query
        (
            'SELECT nazwa AS "Nazwa", gatunek AS "Gatunek", typ AS "Typ", ilosc_miejsc AS "Ilość miejsc", miejsca_wolne AS "Wolne miejsca" \
            FROM schronisko.raport_pawilony \
            ORDER BY Gatunek, "Wolne miejsca" DESC'
        );

        let raportBoksy = await pool.query
        (
            'SELECT nazwa AS "Nazwa pawilonu", numer AS "Numer", ilosc_miejsc AS "Ilość miejsc", miejsca_wolne AS "Wolne miejsca" \
            FROM schronisko.raport_boksy NATURAL JOIN schronisko.pawilony \
            ORDER BY "Wolne miejsca" DESC'
        );

        let nazwyPaiwlonow = await pool.query
        (
            'SELECT nazwa AS "Nazwa pawilonu" FROM schronisko.pawilony'
        );

        res.render("raport-pawilony-boksy", 
        { 
            raportPawilony : raportPawilony, 
            raportBoksy : raportBoksy,
            nazwyPaiwlonow : nazwyPaiwlonow
        });
    }

    raportDoAdopcji = async (req, res) => {
        try
        {
            let zwierzeta = await pool.query(
                "SELECT id_wpisu, imie, gatunek, rasa, data_urodzenia, data_przyjecia, uwagi, id_pawilonu FROM schronisko.zwierzeta \
                 NATURAL JOIN schronisko.zwierzeta_info NATURAL JOIN schronisko.boksy NATURAL JOIN schronisko.pawilony WHERE data_adopcji IS NULL"
            );
            let pawilony = await pool.query(
                "SELECT * FROM schronisko.raport_pawilony NATURAL JOIN schronisko.pawilony WHERE miejsca_wolne > 0"
            )
            res.render("raport-do-adopcji", { 
                zwierzeta: zwierzeta,
                pawilony : pawilony
            });
        }
        catch(err)
        {
            console.log("SELECT zwierząt nie udał się: " + err);
        }
    }

    raportPersonel = async (req, res) => {
        try
        {
            let personel = await pool.query(
                "SELECT id_pawilonu, id_pracownika, imie, nazwisko, pesel, stanowisko,\
                 CAST (pensja/100 AS NUMERIC(10,2)) AS \"pensja\", nazwa, typ, gatunek FROM schronisko.personel \
                 LEFT JOIN schronisko.personel_to_pawilony USING(id_pracownika) \
                 LEFT JOIN schronisko.pawilony USING(id_pawilonu)"
            );
            res.render("raport-personel", { personel : personel });
        }
        catch (err)
        {
            console.log(err);
        }
    }
}

module.exports = new SelectController();