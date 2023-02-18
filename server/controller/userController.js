const User = require('../model/user');



const userController = {

    async signUp(req, res, next){
        const { username, password } = req.body;
        if (!username || !password) (err) => next(err);
        const user = await new User({
            username: req.body.username,
            password: req.body.password,
            cohortNumber: req.body.cohortNumber

        });
        user.save()
        res.locals.user = user
        return next()
    },

    async addOne(req, res, next) {
        const user = await User.findOneAndUpdate(
            { username: req.body.username },
            { $inc: { participation: 1 } },
            { new: true }
        )
        res.locals.user = user
        return next()
    }

}




module.exports = userController;