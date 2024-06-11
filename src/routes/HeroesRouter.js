import {CustomRouter} from "./CustomRouter.js";
import {HeroesManager} from "../dao/HeroesManager.js";
import { m1, m2, m3 } from "../middleware/varias.js";

const heroesManager = new HeroesManager();

export default class HeroesRouter extends CustomRouter {

    init(){
        
        this.get("/", ["public"],m1, m2, m3, async(req, res) => {
            let heroes = await heroesManager.getAllHeroes();
            return res.success(heroes);
        });

        this.get("/:heroe([%20a-zA-Z0-9_-]+)", ["public"], async(req, res) => {
            let {heroe} = req.params;
            heroe = heroe.toLowerCase().trim();
            heroe = heroe.replace(/\b\w/g, (match) => match.toUpperCase());
            let heroes = await heroesManager.getOneHeroe(heroe);
            if(heroes){
                return res.success(heroes);
            }
            return res.badRequest(`No existe heroe con nombre ${heroe}`)
        });

        this.post("/", ["admin", "premium"], async(req, res) => {
            let { name, ...rest } = req.body;
            if(!name){
                return res.badRequest(`Complete las Propiedad Request`);
            }
            name = name.trim().toLowerCase();
            name = name.replace(/\b\w/g, (match) => match.toUpperCase());
            let heroes;
            try {
                heroes = await heroesManager.heroes;
                let existe = heroes.find(h => h.name === name);
                if(existe){
                    return res.badRequest(`El heroe ${name} ya existe en la base de datos`);
                }
            } catch(error){
                error.message;
            }
            try {
                let nuevoHeroe = await heroesManager.createHeroe({name, ...rest});
                console.log(nuevoHeroe);
                return res.successData("Heroe Generado Correctamente",nuevoHeroe, 202)
            } catch(error){
                error.message
            }
        });

        this.delete("/:nombre([%20a-zA-Z0-9_-]+)", ["admin", "premium"], async(req, res) => {
            let {nombre} = req.params;
            nombre = nombre.toLowerCase().trim();
            nombre = nombre.replace(/\b\w/g, (match) => match.toUpperCase());
            let heroes = await heroesManager.heroes;
            let existe = heroes.find(personaje => personaje.name === nombre);
            if(existe){
                let heroesFiltrado = heroes.filter(personaje => personaje.name !== nombre);
                let actualizado = await heroesManager.updateHeroes(heroesFiltrado);
                res.successData("Heroe Eliminado Correctamente", actualizado, 201);
            }
            res.badRequest("Super heroe no encontrato, no se elimino nada");
        });


    }//fin init




};//FIN HeroesRouter