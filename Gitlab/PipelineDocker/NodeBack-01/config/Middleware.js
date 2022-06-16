function checkAuthTeacher(req, res, next) {
    if (req.user !== undefined &&  (req.user.accountType === 'Teacher' ||  req.user.accountType === 'Admin'))
        next();
    else
        res.status(401).json("Unauthorized");
}

function checkAuth(req, res, next) {
    if (req.user !== undefined)
        next();
    else
        res.status(401).json("Unauthorized");
}

module.exports = { checkAuthTeacher, checkAuth };
