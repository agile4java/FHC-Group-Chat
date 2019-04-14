module.exports = function (async, Group, _, User) {
    return {
        SetRouting: function (router) {
            router.get('/home', this.homePage);
        },
        homePage: function (req, res) {
            console.log(req.params);
            async.parallel([
                function(callback){
                    Group.find({}, (err, result) => {
                        callback(err, result);
                    })
                }
            ], (err, results) => {
                console.log(results);
                const res1 = results[0];
                console.log(res1);
                console.log("Home.js req.user = ")
                console.log(req.user);
                res.render('home', { title: '1078 - Home', data: res1, user: req.user });
            })
            
        }
    }
}