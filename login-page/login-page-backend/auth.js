import jwt from "jsonwebtoken";

export const requiredAuth = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token)
        return res.status(401).json({message: "Unauthorized"});

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {id: payload.sub};

        next();
    } catch (error) {
        return res.status(401).json({message: "invalid or expired token"});
    }
}