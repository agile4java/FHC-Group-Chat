module.exports = function () {
    return {
        SetRouting: function (router) {
            router.get('/home', this.homePage);
        },
        homePage: function (req, res) {
            return res.render('home');
        }
    }
}