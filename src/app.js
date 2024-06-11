import express, { urlencoded } from "express";
import HeroesRouter from "./routes/HeroesRouter.js";

const heroesRouter = new HeroesRouter();

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(express.static("./src/public"));



app.use("/api/heroes/",     heroesRouter.getRouter());


const ServerHTTP = app.listen(PORT, () => {return console.log(`Server Online en Puerto ${PORT}`)});

