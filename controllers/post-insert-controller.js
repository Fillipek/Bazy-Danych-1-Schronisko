const pool = require("../database-connection")

class PostInsertController {
    pawilony = async (req, res) => {
        let customKey = req.body['ID pawilonu'];
        try
        {
            if(customKey == "") 
            {
                let result = await pool.query(
                    'INSERT INTO schronisko.pawilony VALUES (default, $1, $2, $3)', 
                    [req.body['Nazwa'], req.body['ID typu'], req.body['Gatunek']]
                );
            }
            else
            {
                let result = await pool.query(
                    'INSERT INTO schronisko.pawilony VALUES ($1, $2, $3, $4)', 
                    [req.body['ID pawilonu'], req.body['Nazwa'], req.body['ID typu'], req.body['Gatunek']]
                );
            }
        }
        catch (err)
        {
            console.log(err);
        }

        let table = await pool.query(
            'SELECT \
            id_pawilonu AS "ID", \
            nazwa AS "Nazwa", \
            typ AS "Typ", \
            gatunek AS "Gatunek" \
            FROM schronisko.pawilony'
        )
        res.render("browse", {
            data : table, 
            title : "Pawilony"
        });
    }

    boksy = async (req, res) => {
        let customKey = req.body['ID boksu'];
        try
        {
            if(customKey == "") 
            {
                let result = await pool.query(
                    'INSERT INTO schronisko.boksy (numer, ilosc_miejsc, id_pawilonu) VALUES ($1, $2, $3)', 
                    [req.body['Numer'], req.body['Ilość miejsc'], req.body['ID pawilonu']]
                );
            }
            else
            {
                let result = await pool.query(
                    'INSERT INTO schronisko.boksy (id_boksu, numer, ilosc_miejsc, id_pawilonu) VALUES ($1, $2, $3, $4)', 
                    [req.body['ID boksu'], req.body['Numer'], req.body['Ilość miejsc'], req.body['ID pawilonu']]
                );
            }
        }
        catch (err)
        {
            console.log(err);
        }

        let table = await pool.query(
            'SELECT * \
            FROM schronisko.boksy'
        )
        res.render("browse", {
            data : table, 
            title : "Boksy"
        });
    }

    klienci = async (req, res) => {
        let customKey = req.body['ID klienta'];
        try
        {
            if(customKey == "") 
            {
                let result = await pool.query(
                    'INSERT INTO schronisko.klienci (imie, nazwisko, ulica, kod_pocztowy, miejscowosc, pesel) \
                     VALUES ($1, $2, $3, $4, $5, $6)', 
                    [req.body['Imię'], req.body['Nazwisko'], req.body['Ulica'], 
                    req.body['Kod pocztowy'], req.body['Miejscowość'], req.body['PESEL']]
                );
            }
            else
            {
                let result = await pool.query(
                    'INSERT INTO schronisko.klienci (id_klienta, imie, nazwisko, ulica, kod_pocztowy, miasto, pesel) \
                     VALUES ($1, $2, $3, $4, $5, $6, $7)', 
                     [req.body['ID klienta'], req.body['Imię'], req.body['Nazwisko'], req.body['Ulica'], 
                     req.body['Kod pocztowy'], req.body['Miejscowość'], req.body['PESEL']]
                );
            }
        }
        catch (err)
        {
            console.log(err);
        }

        let result = await pool.query('SELECT \
            id_klienta AS "ID", \
            imie AS "Imię", \
            nazwisko AS "Nazwisko", \
            CONCAT(ulica, \', \', kod_pocztowy, \' \', miasto) AS "Adres", \
            pesel AS "PESEL" \
            FROM schronisko.klienci'
        )
        res.render("browse", {
            data : result, 
            title : "Klienci"
        });
    }

    magazyn = async (req, res) => {
        let customKey = req.body['ID przedmiotu'];
        try
        {
            if(customKey == "") 
            {
                let result = await pool.query(
                    'INSERT INTO schronisko.magazyn (nazwa, ilosc, min_ilosc) VALUES ($1, $2, $3)', 
                    [req.body['Nazwa'], req.body['Ilość'], req.body['Minimalna ilość']]
                );
            }
            else
            {
                let result = await pool.query(
                    'INSERT INTO schronisko.magazyn (id_przedmiotu, nazwa, ilosc, min_ilosc) VALUES ($1, $2, $3)', 
                    [req.body['ID przedmiotu'], req.body['Nazwa'], req.body['Ilość'], req.body['Minimalna ilość']]
                );
            }
        }
        catch (err)
        {
            console.log(err);
        }

        let result = await pool.query(
            'SELECT \
            id_przedmiotu AS "ID", \
            nazwa AS "Nazwa", \
            ilosc AS "Ilość", \
            min_ilosc AS "Minimalna ilość" \
            FROM schronisko.magazyn'
        )
        res.render("browse", {
            data : result, 
            title : "Magazyn"
        });
    }

    zapotrzebowanie = async (req, res) => {
        try
        {
            let result = await pool.query(
                'INSERT INTO schronisko.zapotrzebowanie (id_wpisu, id_przedmiotu, ilosc) VALUES ($1, $2, $3)', 
                [req.body['ID wpisu (zwierzęcia)'], req.body['ID przedmiotu'], req.body['Ilość']]
            );
        }
        catch (err)
        {
            console.log(err);
        }

        let result = await pool.query(
            'SELECT \
            id_wpisu AS "ID wpisu", \
            id_przedmiotu AS "ID przedmiotu", \
            ilosc as "Ilość" \
            FROM schronisko.zapotrzebowanie'
        )
        res.render("browse", {
            data : result, 
            title : "Zapotrzebowanie"
        });
    }

    kontrahenci = async (req, res) => {
        let customKey = req.body['ID kontrahenta'];
        try
        {
            if(customKey == "") 
            {
                let result = await pool.query(
                    'INSERT INTO schronisko.kontrahenci (nazwa, nip) VALUES ($1, $2)', 
                    [req.body['Nazwa'], req.body['NIP']]
                );
            }
            else
            {
                let result = await pool.query(
                    'INSERT INTO schronisko.kontrahenci (id_kontrahenta, nazwa, nip) VALUES ($1, $2, $3)', 
                    [req.body['ID kontrahenta'], req.body['Nazwa'], req.body['NIP']]
                );
            }
        }
        catch (err)
        {
            console.log(err);
        }

        let result = await pool.query(
            'SELECT \
            id_kontrahenta AS "ID", \
            nazwa AS "Nazwa", \
            nip AS "NIP" \
            FROM schronisko.kontrahenci'
        )
        res.render("browse", {
            data : result, 
            title : "Kontrahenci"
        });
    }

    zamowienia = async (req, res) => {
        let customKey = req.body['ID zamówienia'];
        try
        {
            if(customKey == "") 
            {
                let result = await pool.query(
                    'INSERT INTO schronisko.zamowienia (id_kontrahenta, id_przedmiotu, ilosc, kwota) VALUES ($1, $2, $3, $4)', 
                    [req.body['ID kontrahenta'], req.body['ID przedmiotu'], req.body['Ilość'], req.body['Kwota']*100]
                );
            }
            else
            {
                let result = await pool.query(
                    'INSERT INTO schronisko.zamowienia (id_zamowienia, id_kontrahenta, id_przedmiotu, ilosc, kwota) VALUES ($1, $2, $3, $4, $5)', 
                    [req.body['ID zamówienia'], req.body['ID kontrahenta'], req.body['ID przedmiotu'], req.body['Ilość'], req.body['Kwota']*100]
                );
            }
        }
        catch (err)
        {
            console.log(err);
        }

        let result = await pool.query(
            'SELECT \
            id_zamowienia AS "ID zamówienia", \
            id_kontrahenta AS "ID kontrahenta", \
            id_przedmiotu AS "ID przedmiotu", \
            ilosc AS "Ilosc", \
            CAST(kwota / 100.0 AS NUMERIC(10,2)) AS "Kwota", \
            CASE WHEN zrealizowano THEN \'tak\' \
            ELSE \'nie\' END AS "Zrealizowano" \
            FROM schronisko.zamowienia'
        )
        res.render("browse", {
            data : result, 
            title : "Zamówienia"
        });
    }

    personel = async (req, res) => {
        let values = req.body;
        if(values["PESEL"] == "") {
            values["PESEL"] = null;
        }
        try {
            let result = await pool.query (
                'INSERT INTO schronisko.personel\
                 (id_pracownika, imie, nazwisko, pesel, stanowisko, pensja) VALUES \
                 ($1, $2, $3, $4, $5, $6)',
                [
                    values["ID pracownika"],
                    values["Imię"],
                    values["Nazwisko"],
                    values["PESEL"],
                    values["Stanowisko"],
                    values["Pensja"]*100
                ]
            );
        }
        catch (err) {
            console.log(err);
        }

        let result = await pool.query(
            'SELECT \
                id_pracownika AS "ID", \
                imie AS "Imię", \
                nazwisko AS "Nazwisko", \
                pesel AS "PESEL", \
                stanowisko AS "Stanowisko", \
                CAST(pensja / 100.00 AS NUMERIC(10,2)) AS "Pensja" \
            FROM schronisko.personel'
        )
        res.render("browse", {
            data : result,  
            title : "Personel"
        });
    }

    personelToPawilony = async (req, res) => {
        let values = req.body;
        try {
            let result = await pool.query (
                'INSERT INTO schronisko.personel_to_pawilony\
                 (id_pracownika, id_pawilonu) VALUES \
                 ($1, $2)',
                [
                    values["ID pracownika"],
                    values["ID pawilonu"]
                ]
            );
        }
        catch (err) {
            console.log(err);
        }

        let result = await pool.query(
            'SELECT \
            id_pracownika AS "ID pracownika", \
            id_pawilonu AS "ID pawilonu" \
            FROM schronisko.personel_to_pawilony'
        )
        res.render("browse", {
            data : result, 
            title : "Personel -> Pawilony"
        });
    }

    zwierzeta = async (req, res) => {
        let values = req.body;
        if(values["Data urodzenia"] == "") {
            values["Data urodzenia"] = null;
        }
        if(values["Rasa"] == "") {
            values["Rasa"] = null;
        }
        try
        {
            let result = await pool.query(
                'INSERT INTO schronisko.zwierzeta \
                (id_zwierzecia, gatunek, rasa, imie, data_urodzenia) VALUES \
                ($1, $2, $3, $4, $5)',
                [
                    values["ID zwierzęcia"], 
                    values["Gatunek"], 
                    values["Rasa"], 
                    values["Imię"], 
                    values["Data urodzenia"]
                ]
            );
        }
        catch (err)
        {
            console.log(err);
        }

        let result = await pool.query(
            'SELECT \
            id_zwierzecia AS "ID", \
            imie AS "Imię", \
            gatunek AS "Gatunek", \
            rasa AS "Rasa", \
            data_urodzenia AS "Data urodzenia" \
            FROM schronisko.zwierzeta'
        )
        res.render("browse", {
            data : result, 
            title : "Zwierzęta"
        });
    }

    zwierzetaInfo = async (req, res) => {
        let values = req.body;
        if( values["Data przyjęcia"] == ""){
            values["Data przyjęcia"] = "NOW()";
        }
        try {
            let result = await pool.query (
                'INSERT INTO schronisko.zwierzeta_info\
                 (id_wpisu, id_zwierzecia, data_przyjecia, id_boksu, uwagi) VALUES \
                 ($1, $2, $3, $4, $5)',
                [
                    values["ID wpisu"],
                    values["ID zwierzęcia"],
                    values["Data przyjęcia"],
                    values["ID boksu"],
                    values["Uwagi"]
                ]
            );
        }
        catch (err) {
            console.log(err);
        }

        let result = await pool.query(
            'SELECT \
            id_wpisu AS "ID", \
            id_zwierzecia AS "ID zwierzęcia", \
            data_przyjecia AS "Data przyjęcia", \
            id_boksu AS "ID boksu", \
            uwagi AS "Uwagi", \
            data_adopcji AS "Data adopcji", \
            id_klienta AS "ID klienta" \
            FROM schronisko.zwierzeta_info \
            ORDER BY id_wpisu'
        )
        res.render("browse", {
            data : result, 
            title : "Zwierzęta Info"
        });
    }
}

module.exports = new PostInsertController();