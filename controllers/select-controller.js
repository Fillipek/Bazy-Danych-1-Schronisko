const pool = require("../database-connection")

class SelectController {
    selectBoksy = async (req, res) => {
        let result = await pool.query('SELECT \
            id_boksu AS "ID", \
            numer AS "Numer", \
            ilosc_miejsc AS "Ilość miejsc", \
            id_pawilonu AS "Id pawilonu" \
            FROM schronisko.boksy'
        )
        res.render("browse", {
            data : result, 
            title : "Boksy"
        });
    }

    selectKlienci = async (req, res) => {
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

    selectMagazyn = async (req, res) => {
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

    selectPawilony = async (req, res) => {
        let result = await pool.query(
            'SELECT \
            id_pawilonu AS "ID", \
            nazwa AS "Nazwa", \
            typ AS "Typ", \
            gatunek AS "Gatunek" \
            FROM schronisko.pawilony'
        )
        res.render("browse", {
            data : result, 
            title : "Pawilony"
        });
    }

    selectPersonel = async (req, res) => {
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

    selectZwierzeta = async (req, res) => {
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

    selectWpisy = async (req, res) => {
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

    selectPersonelToPawilony = async (req, res) => {
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

    selectZapotrzebowanie = async (req, res) => {
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
    selectKontrahenci = async (req, res) => {
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

    selectZamowienia = async (req, res) => {
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
}

module.exports = new SelectController();