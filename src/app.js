import express, { urlencoded } from "express";
import mongoose from "mongoose";
import passport from "passport";

import { iniciaPassport } from "./config/passport.confirg.js";
import HeroesRouter from "./routes/HeroesRouter.js";
const heroesRouter = new HeroesRouter();

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(urlencoded({extended:true}));
iniciaPassport();
app.use(passport.initialize());
app.use(express.static("./src/public"));



app.use("/api/heroes/",     heroesRouter.getRouter());


const ServerHTTP = app.listen(PORT, () => {return console.log(`Server Online en Puerto ${PORT}`)});

try {
    await mongoose.connect("mongodb+srv://gonzalof:Coder098@cluster0.pt1wq7n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {dbName:"clase24"});
    console.log("DB Conectada");
}
catch(error){
    console.log(error.message)
}
