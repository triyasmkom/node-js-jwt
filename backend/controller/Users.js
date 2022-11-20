import Users from "../models/UserModel.js";
import bycript from "bcrypt";
import jwt from "jsonwebtoken";
import {where} from "sequelize";


export const getUsers = async (req,res)=>{
    try {
        console.log("get user")
        const users = await Users.findAll({attributes:['id','name', 'email']});
        res.json(users)
    }catch (e) {
        console.log(e);
    }
}


export const Register = async (req, res, next)=>{
    const {name, email,password, confirmPassword} = req.body;
    // validasi
    if(password!== confirmPassword) return res.status(400).json({
        message:"Password dan Confirm Password tidak cocok"
    });

    const user = await Users.findAll( {where:{email:req.body.email}});
    if(user.length!==0) return res.status(400).json({message:"Email is already, please login"});

    const salt = await bycript.genSalt();
    const hashPassword = await bycript.hash(password,salt);

    try {
        await Users.create({
            name: name,
            email:email,
            password:hashPassword
        });
        res.json({
            name: name,
            email: email,
            message:"Register Berhasil"
        });
    }catch (e) {
        console.log(e);
    }

}

export const Login = async (req, res) =>{
    try {
        // cari user berdasarkan email
        const user = await Users.findAll({
                where:{
                    email: req.body.email
                }
            });

        // match password
        const match = await bycript.compare(req.body.password, user[0].password);
        if (!match) return res.status(400).json({message:"wrong password"});

        // construct data
        const userId = user[0].id;
        const email = user[0].email;
        const name = user[0].name;

        const accessToken = jwt.sign(
            {
            userId,name,email
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '1000s'
            }
        );

        // exp in 1 day
        const refreshToken = jwt.sign(
            {
                userId,name,email
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: '1d'
            }
        );

        // update refresh token by id
        await Users.update({refresh_token:refreshToken},{
            where:{
                id: userId
            }
        });

        // send http cookie only
        // http only : tidak bisa diakses dari client
        res.cookie('refreshToken', refreshToken,{
            httponly: true,
            masAge: 24 * 60 * 60 * 1000
        });

        res.json({accessToken});


    }catch (e) {
        res.status(404).json({message: "Email tidak ditemukan"});
    }
}

export const Logout = async (req, res)=>{
    const refreshToken = req.cookies.refreshToken;
    // jika refresh token kosong
    if (!refreshToken) return res.sendStatus(204); // no contain

    // jika refresh token tidak cocok di db
    const user = await  Users.findAll({
        where:{
            refresh_token:refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204); // no contain

    // update refresh token by user id
    const userId = user[0].id;
    await Users.update(
        {refresh_token: null},
        {where:{id:userId}}
    );

    // hapus refresh token dari cookies
    res.clearCookie('refreshToken');
    return res.sendStatus(200);

}