const pool = require("../database-connection")

class NewAnimal {
    showForm = async (req, res) => {
        let v = await pool.query("SELECT DISTINCT gatunek FROM schronisko.raport_pawilony WHERE miejsca_wolne > 0 ORDER BY gatunek");
        let adoptableSpecies = [];

        v.rows.forEach(elem => {
            adoptableSpecies.push(elem["gatunek"]);
        });
        
        let boksy = await pool.query("SELECT * FROM schronisko.raport_boksy NATURAL JOIN schronisko.pawilony WHERE miejsca_wolne > 0 ORDER BY gatunek");
        res.render("new-animal", { 
            gatunki: adoptableSpecies,
            boksy: boksy
        });
    }

    postForm = async (req, res) => {
        let form = req.body;
        let errMsg = "";

        if(form.imie == "") errMsg = "Nowy podopieczny potrzbuje imienia.";
        if(form.data_przyjecia == "") errMsg = "Proszę podać datę przyjęcia do schroniska.";
        if(form.id_pawilonu == "Wybierz...") errMsg = "Nie wybrano pawilonu.";
        try
        {
            var gatunekBoks = await pool.query(
                "SELECT gatunek from schronisko.boksy NATURAL JOIN schronisko.pawilony WHERE id_boksu = $1",
                [form.id_boksu]
            );
            if(form.gatunek != gatunekBoks.rows[0].gatunek) errMsg = "Wybrany boks nie jest przeznaczony dla wybranego gatunku zwierzęcia.";
        }
        catch(err)
        {
            errMsg = "Nie wybrano boksu.";
        }
        if(form.gatunek == "Wybierz...") errMsg = "Nie wybrano gatunku.";

        if(form.rasa == "") form.rasa = null;
        if(form.data_urodzenia == "") form.data_urodzenia = null;
        if(form.uwagi == "") form.uwagi = null;

        if(errMsg != "")
        {
            res.render("error", { msg : errMsg });
            return;
        }

        form.id_zwierzecia = await pool.query(
            "SELECT MAX(id_zwierzecia) FROM schronisko.zwierzeta"
        );

        form.id_wpisu = await pool.query(
            "SELECT MAX(id_zwierzecia) FROM schronisko.zwierzeta_INFO"
        );

        form.id_zwierzecia = form.id_zwierzecia.rows[0].max + 1;
        form.id_wpisu = form.id_wpisu.rows[0].max + 1;

        try
        {
            await pool.query("BEGIN");
            await pool.query(
                "INSERT INTO schronisko.zwierzeta (id_zwierzecia,imie,gatunek,data_urodzenia,rasa) VALUES ($1,$2,$3,$4,$5)",
                [form.id_zwierzecia, form.imie, form.gatunek, form.data_urodzenia, form.rasa]
            );
            await pool.query(
                "INSERT INTO schronisko.zwierzeta_info (id_wpisu,id_zwierzecia,data_przyjecia,id_boksu,uwagi) VALUES ($1,$2,$3,$4,$5)",
                [form.id_wpisu, form.id_zwierzecia, form.data_przyjecia, form.id_boksu, form.uwagi]
            );
            await pool.query("COMMIT");
        }
        catch(err)
        {
            await pool.query("ROLLBACK");
            res.render("error", { msg : err });
            return;
        }
        
        await res.render("success", { 
            msg : "Pomyślnie dodano nowe zwierzę.", 
            anotherOne : "/form/new_animal" 
        });
    }
}

const controller = new NewAnimal();
module.exports = controller;