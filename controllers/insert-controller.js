const pool = require("../database-connection")

class InsertController {
    pawilony = async (req, res) => {
        
        let fields = await pool.query
        (
            'SELECT id_pawilonu "ID pawilonu", nazwa "Nazwa", id_typu "ID typu", gatunek "Gatunek" \
            FROM schronisko.pawilony WHERE FALSE'
        );
        res.render("insert", 
        {
            adressAfterInsert : "/browse/pawilony",
            title : "Pawilony",
            fieldsOnly : fields
        });
    }

    boksy = async (req, res) => {
        let fields = await pool.query
        (
            'SELECT id_boksu "ID boksu", numer "Numer",\
             ilosc_miejsc "Ilość miejsc", id_pawilonu "ID pawilonu" \
            FROM schronisko.boksy WHERE FALSE'
        );
        res.render("insert", 
        {
            adressAfterInsert : "/browse/boksy",
            title : "Boksy",
            fieldsOnly : fields
        });
    }

    klienci = async (req, res) => {
        let fields = await pool.query
        (
            'SELECT id_klienta "ID klienta", imie "Imię", nazwisko "Nazwisko",\
             ulica "Ulica", kod_pocztowy "Kod pocztowy", miejscowosc "Miejscowość", pesel "PESEL" \
            FROM schronisko.klienci WHERE FALSE'
        );
        res.render("insert", 
        {
            adressAfterInsert : "/browse/klienci",
            title : "Klienci",
            fieldsOnly : fields
        });
    }

    magazyn = async (req, res) => {
        let fields = await pool.query
        (
            'SELECT id_przedmiotu "ID przedmiotu", nazwa "Nazwa",\
             ilosc "Ilość", min_ilosc "Minimalna ilość" \
             FROM schronisko.magazyn WHERE FALSE'
        );
        res.render("insert", 
        {
            adressAfterInsert : "/browse/magazyn",
            title : "Magazyn",
            fieldsOnly : fields
        });
    }

    zapotrzebowanie = async (req, res) => {
        let fields = await pool.query
        (
            'SELECT id_wpisu "ID wpisu (zwierzęcia)", id_przedmiotu "ID przedmiotu", ilosc "Ilość" \
             FROM schronisko.zapotrzebowanie WHERE FALSE'
        );
        res.render("insert", 
        {
            adressAfterInsert : "/browse/zapotrzebowanie",
            title : "Zapotrzebowanie",
            fieldsOnly : fields
        });
    }

    kontrahenci = async (req, res) => {
        let fields = await pool.query
        (
            'SELECT id_kontrahenta "ID kontrahenta", nazwa "Nazwa", nip "NIP" \
             FROM schronisko.kontrahenci WHERE FALSE'
        );
        res.render("insert", 
        {
            adressAfterInsert : "/browse/kontrahenci",
            title : "Kontrahenci",
            fieldsOnly : fields
        });
    }

    zamowienia = async (req, res) => {
        let fields = await pool.query
        (
            'SELECT id_zamowienia "ID zamówienia", id_kontrahenta "ID kontrahenta",\
             id_przedmiotu "ID przedmiotu", ilosc "Ilość", kwota "Kwota" \
             FROM schronisko.zamowienia WHERE FALSE'
        );
        res.render("insert", 
        {
            adressAfterInsert : "/browse/zamowienia",
            title : "Zamówienia",
            fieldsOnly : fields
        });
    }

    personel = async (req, res) => {
        let fields = await pool.query
        (
            'SELECT id_pracownika "ID pracownika", imie "Imię", nazwisko "Nazwisko",\
             pesel "PESEL", stanowisko "Stanowisko", pensja "Pensja" \
             FROM schronisko.personel WHERE FALSE'
        );
        res.render("insert", 
        {
            adressAfterInsert : "/browse/personel",
            title : "Personel",
            fieldsOnly : fields
        });
    }

    personelToPawilony = async (req, res) => {
        let fields = await pool.query
        (
            'SELECT id_pracownika "ID pracownika", id_pawilonu "ID pawilonu" \
             FROM schronisko.personel_to_pawilony WHERE FALSE'
        );
        res.render("insert", 
        {
            adressAfterInsert : "/browse/personel_to_pawilony",
            title : "Personel-Pawilony",
            fieldsOnly : fields
        });
    }

    zwierzeta = async (req, res) => {
        let fields = await pool.query
        (
            'SELECT id_zwierzecia "ID zwierzęcia", gatunek "Gatunek", \
             rasa "Rasa", imie "Imię", data_urodzenia "Data urodzenia" \
             FROM schronisko.zwierzeta WHERE FALSE'
        );
        res.render("insert", 
        {
            adressAfterInsert : "/browse/zwierzeta",
            title : "Zwierzęta",
            fieldsOnly : fields
        });
    }

    zwierzetaInfo = async (req, res) => {
        let fields = await pool.query
        (
            'SELECT id_wpisu "ID wpisu", id_zwierzecia "ID zwierzęcia", data_przyjecia "Data przyjęcia",\
             id_boksu "ID boksu", uwagi "Uwagi", data_adopcji "Data adopcji", id_klienta "ID klienta" \
             FROM schronisko.zwierzeta_info WHERE FALSE'
        );
        res.render("insert", 
        {
            adressAfterInsert : "/browse/zwierzeta_info",
            title : "Wpisy Zwierząt",
            fieldsOnly : fields
        });
    }
}

module.exports = new InsertController();