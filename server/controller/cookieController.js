const cookieController = {

    async setCookie(req, res, next) {
        const cookie = Math.floor(Math.random() * 100000);
        res.cookie('codehort', cookie);
        res.locals.cookie = cookie;
        console.log('cookie set')
        return next();
    }

}

module.exports = cookieController;