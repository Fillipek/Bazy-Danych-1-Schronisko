const pool = require("../database-connection")

class PostInsertController {
    fixSequence = async function (idFieldName, tableName) {
        let max;
        try {
            max = await pool.query("SELECT MAX(" + idFieldName + ") max FROM schronisko." + tableName);
            max = max.rows[0].max;
        }
        catch (err) {
            max = 0;
        }

        try {
            pool.query("SELECT setval('schronisko." + tableName + "_" + idFieldName + "_seq', " + max + ")");
        }
        catch (err) {
            console.log("Nie udało się ustawić sekwencji. " + err);
        }
        return max+1;
    }

    pawilony = async (req, res) => {
        let key = req.body['ID pawilonu'];
        try {
            if (key == "") {
                key = await this.fixSequence("id_pawilonu", "pawilony");
                await pool.query(
                    "INSERT INTO schronisko.pawilony (nazwa, id_typu, gatunek) VALUES ($1, $2, $3)",
                    [req.body['Nazwa*'], req.body['ID typu*'], req.body['Gatunek*']]
                );
            }
            else {
                await pool.query(
                    'INSERT INTO schronisko.pawilony (id_pawilonu, nazwa, id_typu, gatunek) VALUES ($1, $2, $3, $4)',
                    [key, req.body['Nazwa*'], req.body['ID typu*'], req.body['Gatunek*']]
                );
            }
        }
        catch (err) {
            res.render("error", { msg: err });
            return;
        }

        res.render("success",
        {
            msg: "Pomyślnie dodano nowy pawilon (ID = " + key + ")",
            hint: "Pawilon nie zawiera obcnie żdnych boksów. Dodaj je poprzez Wstawianie/Nowy boks.",
            anotherOne: "/insert/pawilony"
        });
    }

    boksy = async (req, res) => {
        let key = req.body['ID boksu'];
        try {
            if (key == "") {
                key = await this.fixSequence("id_boksu", "boksy");
                await pool.query(
                    "INSERT INTO schronisko.boksy (numer, ilosc_miejsc, id_pawilonu) VALUES ($1, $2, $3)",
                    [req.body['Numer*'], req.body['Ilość miejsc*'], req.body['ID pawilonu*']]
                );
            }
            else {
                await pool.query(
                    "INSERT INTO schronisko.boksy (id_boksu, numer, ilosc_miejsc, id_pawilonu) VALUES ($1, $2, $3, $4)",
                    [key, req.body['Numer*'], req.body['Ilość miejsc*'], req.body['ID pawilonu*']]
                );
            }
        }
        catch (err) {
            res.render("error", { msg: err });
            return;
        }

        res.render("success",
        {
            msg: "Pomyślnie dodano nowy boks (ID = " + key + ")",
            anotherOne: "/insert/boksy"
        });
    }

    klienci = async (req, res) => {
        let key = req.body['ID klienta'];
        try {
            if (key == "") {
                key = await this.fixSequence("id_klienta", "klienci");
                await pool.query(
                    "INSERT INTO schronisko.klienci (imie, nazwisko, ulica, kod_pocztowy, miejscowosc, pesel) \
                     VALUES ($1, $2, $3, $4, $5, $6)",
                    [ 
                        req.body['Imię*'], 
                        req.body['Nazwisko*'], 
                        req.body['Ulica*'],
                        req.body['Kod pocztowy*'],
                        req.body['Miejscowość*'],
                        req.body['PESEL*'],
                    ]
                );
            }
            else {
                await pool.query(
                    "INSERT INTO schronisko.klienci (id_klienta, imie, nazwisko, ulica, kod_pocztowy, miejscowosc, pesel) \
                     VALUES ($1, $2, $3, $4, $5, $6, $7)",
                    [ 
                        key,
                        req.body['Imię*'], 
                        req.body['Nazwisko*'], 
                        req.body['Ulica*'],
                        req.body['Kod pocztowy*'],
                        req.body['Miejscowość*'],
                        req.body['PESEL*'],
                    ]
                );
            }
        }
        catch (err) {
            res.render("error", { msg: err });
            return;
        }

        res.render("success",
        {
            msg: "Pomyślnie dodano nowego klienta (ID = " + key + ")",
            anotherOne: "/insert/klienci"
        });
    }

    magazyn = async (req, res) => {
        let key = req.body['ID przedmiotu'];
        if (req.body["Minimalna ilość"] == "") req.body["Minimalna ilość"] = null;
        try {
            if (key == "") {
                key = await this.fixSequence("id_przedmiotu", "magazyn");
                await pool.query(
                    "INSERT INTO schronisko.magazyn (nazwa, ilosc, min_ilosc) \
                     VALUES ($1, $2, $3)",
                    [ 
                        req.body['Nazwa*'], 
                        req.body['Ilość*'], 
                        req.body['Minimalna ilość']
                    ]
                );
            }
            else {
                await pool.query(
                    "INSERT INTO schronisko.magazyn (id_przedmiotu, nazwa, ilosc, min_ilosc) \
                     VALUES ($1, $2, $3, $4)",
                    [ 
                        key,
                        req.body['Nazwa*'], 
                        req.body['Ilość*'], 
                        req.body['Minimalna ilość']
                    ]
                );
            }
        }
        catch (err) {
            res.render("error", { msg: err });
            return;
        }

        res.render("success",
        {
            msg: "Pomyślnie dodano nowy przedmiot (ID = " + key + ")",
            hint : "Jeżeli nie podano min. ilośći to wynosi ona 0",
            anotherOne: "/insert/magazyn"
        });
    }

    zapotrzebowanie = async (req, res) => {
        try {
            await pool.query(
                "INSERT INTO schronisko.zapotrzebowanie (id_wpisu, id_przedmiotu, ilosc) \
                 VALUES ($1, $2, $3)",
                [ 
                    req.body['ID wpisu (zwierzęcia)*'], 
                    req.body['ID przedmiotu*'], 
                    req.body['Ilość*']
                ]
            );
        }
        catch (err) {
            res.render("error", { msg: err });
            return;
        }

        res.render("success",
        {
            msg: "Pomyślnie dodano zapotrzebowanie",
            hint: "Zaktualizowano minimalną ilość tego przedmiotu w magazynie.",
            anotherOne: "/insert/zapotrzebowanie"
        });
    }

    kontrahenci = async (req, res) => {
        let key = req.body['ID kontrahenta'];
        if (req.body["NIP"] == "") req.body["NIP"] = null;
        try {
            if (key == "") {
                key = await this.fixSequence("id_kontrahenta", "kontrahenci");
                await pool.query(
                    "INSERT INTO schronisko.kontrahenci (nazwa, nip) \
                     VALUES ($1, $2)",
                    [ 
                        req.body['Nazwa*'], 
                        req.body['NIP']
                    ]
                );
            }
            else {
                await pool.query(
                    "INSERT INTO schronisko.magazyn (id_kontrahenta, nazwa, nip) \
                     VALUES ($1, $2, $3)",
                    [ 
                        key,
                        req.body['Nazwa*'], 
                        req.body['NIP']
                    ]
                );
            }
        }
        catch (err) {
            res.render("error", { msg: err });
            return;
        }

        res.render("success",
        {
            msg: "Pomyślnie dodano nowego kontrahenta (ID = " + key + ")",
            anotherOne: "/insert/kontrahenci"
        });
    }

    zamowienia = async (req, res) => {
        let key = req.body['ID zamówienia'];
        try {
            if (key == "") {
                key = await this.fixSequence("id_zamowienia", "zamowienia");
                await pool.query(
                    "INSERT INTO schronisko.zamowienia (id_kontrahenta, id_przedmiotu, ilosc, kwota) \
                     VALUES ($1, $2, $3, $4)",
                    [ 
                        req.body["ID kontrahenta*"], 
                        req.body["ID przedmiotu*"],
                        req.body["Ilość*"],
                        req.body["Kwota*"] * 100
                    ]
                );
            }
            else {
                await pool.query(
                    "INSERT INTO schronisko.zamowienia (id_zamowienia, id_kontrahenta, id_przedmiotu, ilosc, kwota) \
                     VALUES ($1, $2, $3, $4, $5)",
                    [ 
                        key,
                        req.body["ID kontrahenta*"], 
                        req.body["ID przedmiotu*"],
                        req.body["Ilość*"],
                        req.body["Kwota*"]
                    ]
                );
            }
        }
        catch (err) {
            res.render("error", { msg: err });
            return;
        }

        res.render("success",
        {
            msg: "Pomyślnie dodano nowe zamówienie (ID = " + key + ")",
            anotherOne: "/insert/zamowienia"
        });
    }

    personel = async (req, res) => {
        let key = req.body['ID pracownika'];
        for (const key in req.body) {
            if (req.body[key] == "") req.body[key] = null
        }
        try {
            
            if (key == "") {
                key = await this.fixSequence("id_pracownika", "personel");
                await pool.query(
                    "INSERT INTO schronisko.personel (imie, nazwisko, pesel, stanowisko, pensja) \
                     VALUES ($1, $2, $3, $4, $5)",
                    [ 
                        req.body["Imię*"], 
                        req.body["Nazwisko*"],
                        req.body["PESEL"],
                        req.body["Stanowisko*"],
                        req.body["Pensja"] * 100
                    ]
                );
            }
            else {
                await pool.query(
                    "INSERT INTO schronisko.personel (id_pracownika, imie, nazwisko, pesel, stanowisko, pensja) \
                     VALUES ($1, $2, $3, $4, $5, $6)",
                    [ 
                        key,
                        req.body["Imię*"], 
                        req.body["Nazwisko*"],
                        req.body["PESEL"],
                        req.body["Stanowisko*"],
                        req.body["Pensja"] * 100
                    ]
                );
            }
        }
        catch (err) {
            res.render("error", { msg: err });
            return;
        }

        res.render("success",
        {
            msg: "Pomyślnie dodano nowego pracownika (ID = " + key + ")",
            anotherOne: "/insert/personel"
        });
    }

    personelToPawilony = async (req, res) => {
        let values = req.body;
        try {
            let result = await pool.query(
                'INSERT INTO schronisko.personel_to_pawilony\
                 (id_pracownika, id_pawilonu) VALUES \
                 ($1, $2)',
                [
                    values.pracownik,
                    values.pawilon
                ]
            );
        }
        catch (err) {
            res.render("error", { msg: err });
        }

        let result = await pool.query(
            'SELECT \
            id_pracownika AS "ID pracownika", \
            id_pawilonu AS "ID pawilonu" \
            FROM schronisko.personel_to_pawilony'
        )
        res.render("browse", {
            data: result,
            title: "Personel -> Pawilony"
        });
    }

    zwierzeta = async (req, res) => {
        let key = req.body['ID zwierzęcia'];
        for (const key in req.body) {
            if (req.body[key] == "") req.body[key] = null
        }
        try {
            
            if (key == "") {
                key = await this.fixSequence("id_zwierzecia", "zwierzeta");
                await pool.query(
                    "INSERT INTO schronisko.zwierzeta (imie, gatunek, rasa, data_urodzenia) \
                     VALUES ($1, $2, $3, $4)",
                    [ 
                        req.body["Imię*"], 
                        req.body["Gatunek*"],
                        req.body["Rasa"],
                        req.body["Data urodzenia"]
                    ]
                );
            }
            else {
                await pool.query(
                    "INSERT INTO schronisko.zwierzeta (id_zwierzecia, imie, gatunek, rasa, data_urodzenia) \
                     VALUES ($1, $2, $3, $4, $5)",
                    [ 
                        key,
                        req.body["Imię*"], 
                        req.body["Gatunek*"],
                        req.body["Rasa"],
                        req.body["Data urodzenia"]
                    ]
                );
            }
        }
        catch (err) {
            res.render("error", { msg: err });
            return;
        }

        res.render("success",
        {
            msg: "Pomyślnie dodano nowe zwierzę (ID = " + key + ")",
            hint : "UWAGA: Spójność bazy została naruszona. Nazeży dodać wpis tego zwierzęcia za pomocą formularza \"Nowy wpis zwierzęcia\".",
            anotherOne: "/insert/zwierzeta"
        });
    }

    zwierzetaInfo = async (req, res) => {
        let key = req.body['ID wpisu'];
        for (const key in req.body) {
            if (req.body[key] == "") req.body[key] = null
        }
        try {
            
            if (key == "") {
                key = await this.fixSequence("id_wpisu", "zwierzeta_info");
                await pool.query(
                    "INSERT INTO schronisko.zwierzeta_info (id_zwierzecia, data_przyjecia, id_boksu, uwagi, data_adopcji, id_klienta) \
                     VALUES ($1, $2, $3, $4, $5, $6)",
                    [ 
                        req.body["ID zwierzęcia*"], 
                        req.body["Data przyjęcia*"],
                        req.body["ID boksu*"],
                        req.body["Uwagi"],
                        req.body["Data adopcji"],
                        req.body["ID klienta"]
                    ]
                );
            }
            else {
                await pool.query(
                    "INSERT INTO schronisko.zwierzeta_info (id_wpisu, id_zwierzecia, data_przyjecia, id_boksu, uwagi, data_adopcji, id_klienta) \
                     VALUES ($1, $2, $3, $4, $5, $6, $7)",
                    [ 
                        key,
                        req.body["ID zwierzęcia*"],
                        req.body["Data przyjęcia*"],
                        req.body["ID boksu*"],
                        req.body["Uwagi"],
                        req.body["Data adopcji"],
                        req.body["ID klienta"]
                    ]
                );
            }
        }
        catch (err) {
            res.render("error", { msg: err });
            return;
        }

        res.render("success",
        {
            msg: "Pomyślnie dodano nowy wpis (ID = " + key + ")",
            anotherOne: "/insert/zwierzeta"
        });
    }
}

module.exports = new PostInsertController();