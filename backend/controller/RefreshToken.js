import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";


export const refreshToken = async (req,res)=>{
    try{
        console.log(`Cookie: `,req.cookies.refreshToken);
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) return res.sendStatus(401);

        const  user = await Users.findAll({
            where:{
                refresh_token: refreshToken
            }
        });
        console.log("user: ", user.toString());
        if (!user[0]) return res.sendStatus(403);
        console.log("refresh token: ", refreshToken);

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode)=>{
            if(err) return res.sendStatus(403);
            const userId = user[0].id;
            const name = user[0].name;
            const email = user[0].email;
            const accessToken = jwt.sign(
                {userId, name, email},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '1000s'}
            );

            res.json({accessToken});

        })
    }catch (e) {
        console.log(e);
    }
}