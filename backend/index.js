import express from "express";
import cookieParser from "cookie-parser";
import db from "./config/Database.js";
import Users from "./models/UserModel.js";
import router from "./routes/index.js";
import dotenv from "dotenv";
import cors from "cors";



dotenv.config();
const app = express();

try {
    await db.authenticate();
    console.log("database connected .....");
    await Users.sync(); // generate table otomatis

}catch (error){
    console.error(error);
}

// agar API bisa diakses dari luar domain
app.use(cors(
    {
    credentials:true, // client harus mengirimkan credential
    origin:'http://localhost:3000' // domain yang diijinkan untuk mengakses API, port 3000 default reactJs
    }));
app.use(cookieParser()); // ambil value dari cookie
app.use(express.json()); // menerima data dan memformat json
app.use(router); // middle ware

app.listen(5001, ()=> console.log("server running at port 5001"));