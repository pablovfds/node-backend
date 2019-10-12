const jwt = require('jsonwebtoken');

module.exports = auth = (req, res, next) => {
    const token = _resolveToken(req);

    if (!token) {
        return res.status(401).json({message: 'Access denied!'});
    } else {
        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET)
            req.user = verified;
            next();
        } catch (error) {
            res.status(400).json({
                message: 'Invalid token'
            });
        }
    }
}

_resolveToken = (req) => {
    const bearerToken = req.header('Authorization');

    if (bearerToken && bearerToken.length && bearerToken.startsWith("Bearer ")) {
        return bearerToken.substring(7, bearerToken.length);
    }
}