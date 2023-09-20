const { query } = require("./dbCon");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: path.join(__dirname + "./../public/images/"),
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

const addprofile = (req, res) => {
    const userid = req.params.id;
    let upload = multer({ storage: storage }).single("profile");
    upload(req, res, (err) => {
        if (err) throw err;
        let sql =
            "UPDATE users SET profile='" +
            req.file.filename +
            "' WHERE user_id=" +
            userid;
        query(sql);
        req.session.profile_url = req.file.filename;
        res.redirect("/users/edit/" + req.params.id);
    });
};

module.exports = { storage, addprofile };
