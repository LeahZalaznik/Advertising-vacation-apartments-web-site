import jwt from 'jsonwebtoken';
export const chackAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ error: 'Authorization header is missing!' });
    }

    const arr = authHeader.split(' ');

    if (arr.length !== 2 || arr[0] !== 'Bearer') {
        return res.status(401).send({ error: 'Authorization format is invalid!' });
    }

    const token = arr[1];

    jwt.verify(token, process.env.SECRET_KEY, (error, decoded,) => {
        if (error || !decoded) {
            return res.status(401).send({ error: 'Invalid or expired token!' });
        }
        console.log(token);
        req.user = decoded; 
        next();
    });
};
    
