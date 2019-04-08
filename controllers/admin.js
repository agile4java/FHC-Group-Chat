
module.exports = function(formidable, Group, aws){
    return {
        SetRouting: function(router){
            router.get('/dashboard', this.adminPage);
            router.post('/dashboard', this.adminPostPage);
            router.post('/uploadFile', aws.Upload.any(), this.uploadFile);
        },
        adminPage: function(req, res){
            res.render('admin/dashboard');
        },
        adminPostPage: function(req, res) {
            const newGroup = new Group();
            newGroup.name = req.body.chatgroup;
            newGroup.image = req.body.upload;
            newGroup.save((err) => {
                res.render('admin/dashboard');
            })
        },
        uploadFile: function(req, res) {
            const form = new formidable.IncomingForm();
            form.on('file', (field, file) => {

            });

            form.on('error', (err) => {
                console.log(err)
            });

            form.on('end', () => {
                console.log('File upload is sucessful');
            });
        }
    }
}