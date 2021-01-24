const pool = require("../database-connection")

class OrderFinalizaotr {
    showUnfinalizedOrders = async (req, res) => {
        try
        {
            let orders = await pool.query(
                "SELECT id_zamowienia, id_kontrahenta, nazwa, z.ilosc, CAST(kwota / 100 AS NUMERIC(10,2)) AS kwota \
                 FROM schronisko.zamowienia z LEFT JOIN schronisko.magazyn m USING(id_przedmiotu) \
                 WHERE data_realizacji IS NULL"
            );
            res.render("finalizuj-zamowienia", {
                orders : orders
            });
        }
        catch(err)
        {
            console.log("Nie udało się zebrać zamówień z bazy.");
        }
    }

    finalizeOrder = async (req, res) => {
        try
        {
            await pool.query(
                "UPDATE schronisko.zamowienia SET data_realizacji = NOW() WHERE id_zamowienia = $1",
                [req.body.id_zamowienia]
            );
            res.render("success", {
                msg : "Pomyślnie sfinalizowano zamówienie",
                hint : "Stan magazynowy został automatycznie zaktualizowany",
                anotherOne : "/form/finalize_orders"
            });
        }
        catch (err)
        {
            res.render("error", {
                msg : err
            });
            return;
        }
    }
}

module.exports = new OrderFinalizaotr();