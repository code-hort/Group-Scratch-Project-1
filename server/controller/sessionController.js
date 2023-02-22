const Session = require('../model/sessionModel');

const sessionController = {
    
    async setSession(req, res, next) {
        const session = await new Session({cookieId: res.locals.cookie});
        await session.save();
        console.log('session set')
        return next();
    },

    async checkSession(req, res, next) {
        const cookie = req.cookies.codehort;
        const session = await Session.findOne({cookieId: cookie});
        //if (session === null) res.redirect('/login');
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