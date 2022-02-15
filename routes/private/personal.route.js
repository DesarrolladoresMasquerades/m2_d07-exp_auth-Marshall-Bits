const router = require("express").Router();
const { get } = require("express/lib/response");
const { checkLogin } = require("../../middlewares/auth.middleware");
const fileUploader = require("../../config/cloudinary.config");
const User = require("../../models/User.model");

/* GET home page */
router.get("/", checkLogin, (req, res, next) => {
  res.render("profile");
});

router.route("/edit")
  .get((req, res) => {
    res.render("users/edit-profile")
  })
  .post(fileUploader.single("imgUrl"), (req, res) => {
    const id = req.session.currentUserId
    const username = req.body.username

    const imgUrl = req.file.path

    User.findByIdAndUpdate(id, { username, imgUrl }, { new: true })
      .then(user => res.render("users/user-profile", user))
  })

module.exports = router;
