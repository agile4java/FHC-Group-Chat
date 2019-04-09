module.exports = function() {
    return {
        SetRouting: function(router) {
            router.get('/group/:name', this.groupPage);
        },
        groupPage: function(req, res) {
            res.render('groupchat/group');
        }
    }
}