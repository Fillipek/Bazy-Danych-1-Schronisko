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
        let raport = await pool.query
        (
            'SELECT \
            imie AS "Imię", \
            gatunek AS "Gatunek", \
            rasa AS "Rasa", \
            DATE_PART(\'year\', NOW()) - DATE_PART(\'year\',data_urodzenia) AS "Lata", \
            data_przyjecia AS "Data przyjęcia", \
            nazwa AS "Pawilon", \
            id_boksu AS "Boks" \
            FROM schronisko.zwierzeta_info \
            NATURAL JOIN schronisko.zwierzeta \
            NATURAL JOIN schronisko.boksy \
            NATURAL JOIN schronisko.pawilony \
            WHERE data_adopcji IS NULL \
            ORDER BY Gatunek, Rasa'
        );
        res.render("raport-do-adopcji", 
        { 
            data : raport
        });
    }
}

module.exports = new SelectController();