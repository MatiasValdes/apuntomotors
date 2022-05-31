const User = require("../models/user")

exports.createOrUpdateUser = async (req, res) => {
    const { name, rut, email, phone, address, comuna, role } = req.body

    const user = await User.findOneAndUpdate(
        { email: req.user.email },
        {
            name,
            rut,
            email,
            phone,
            address,
            comuna,
            role
        },
        { new: true }
    )

    if (user) {
        res.json(user)
    } else {
        const newUser = await new User({
            name,
            rut,
            email,
            phone,
            address,
            comuna,
            role
        }).save()
        res.json(newUser)
    }
}

exports.currentUser = async (req, res) => {
    User.findOne({ email: req.user.email }).exec((err, user) => {
        if (err) throw new Error(err)
        res.json(user)
    })
}