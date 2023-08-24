import jwt from "jsonwebtoken";
import {TOKEN_SECRET} from "../config.js";

export const authRequired = (req, res, next) => {
    //const token = req.headers.cookie;
    //const token = req.cookies.token;
    const {token} = req.cookies;
    console.log(token)

    if(!token) return res.status(401).json({message: "no token, authotization"});

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).json({message: "Invalid token"});

        //console.log(decoded.id);

        req.user = user;

        next();
    })

    
}; 