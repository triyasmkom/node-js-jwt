import jwt, {decode} from "jsonwebtoken";
import Users from "../models/UserModel.js";

export const verifyLogout = async (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    const user = await Users.findAll({
        refresh_token:token
    });
    console.log("verify token - user: ", user);
    if (user[0].refresh_token==null) return res.sendStatus(401);
    next();
}

export const verifyToken = (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    // cek jika null
    if (token == null) return res.sendStatus(401);

    // verify
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err, decode)=>{
        if (err) return res.sendStatus(403);
        req.email = decode.email;
        next();
    })

}