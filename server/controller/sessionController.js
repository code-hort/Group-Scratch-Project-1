const Session = require('../model/sessionModel');
const User = require('../model/userModel')

const sessionController = {
    
    async setSession(req, res, next) {
        const session = await new Session({
            cookieId: res.locals.cookie,
            username: res.locals.user.username,
            isAdmin: res.locals.user.isAdmin
        });
        await session.save();
        console.log('session set')
        return next();
    },

    async checkSession(req, res, next) {
        const cookie = req.cookies.codehort;
        const session = await Session.findOne({cookieId: cookie});
        const user = await User.findOne({ username: session.username });
        Object.assign(session, user);
        res.locals.session = session;
        return next();
    },

    async deleteSession(req, res, next) {
        const cookie = req.cookies.codehort;
        res.clearCookie('codehort');
        await Session.deleteOne({cookieId: cookie});
        return next();
    }

}

module.exports = sessionController;