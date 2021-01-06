class AboutController {
    render = (req, res) => {
        res.render("about");
    }
}
const aboutController = new AboutController();
module.exports = aboutController;