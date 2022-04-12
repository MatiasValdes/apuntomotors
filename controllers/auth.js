const User = require("../models/user")

exports.createOrUpdateUser = async (req, res) => {
    const { email } = req.User

    const user = await User.findOneAndUpdate(
        { email },
        { name: email.splt("@")[0] },
        { new: true }
    )

    if (user) {
        res.json(user)
    } else {
        const newUser = await new User({
            email,
            name: email.splt("@")[0]
        }).save()
        res.json(newUser)
    }
}

exports.currentUser = async (req, res) => {
    User.findOne({ email: req.user.email }).exec((err, user) => {
        if(err) throw new Error(err)
        res.json(user)
    })
}