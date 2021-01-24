const pool = require("../database-connection")

class ItemWithDrawer {
    showItems = async (req, res) => {
        try
        {
            let items = await pool.query(
                "SELECT * FROM schronisko.magazyn WHERE ilosc > 0"
            );
            res.render("withdraw-items", {
                items : items
            });
        }
        catch(err)
        {
            console.log("Nie udało się zebrać zamówień z bazy.");
        }
    }

    withdraw = async (req, res) => {
        try
        {
            await pool.query (
                "SELECT schronisko.wydaj_przedmiot($1,$2)",
                [req.body.id_przedmiotu, req.body.ilosc]
            );
            res.render("success", {
                msg : "Pomyślnie wydano żądaną ilość",
                anotherOne : "/form/withdraw_items"
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

module.exports = new ItemWithDrawer();