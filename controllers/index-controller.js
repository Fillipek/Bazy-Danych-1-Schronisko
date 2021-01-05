class IndexController {
    render = (req, res) => {
        res.render("index");
    }
}
const indexController = new IndexController();
module.exports = indexController;