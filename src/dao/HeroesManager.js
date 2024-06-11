import fs, { readFileSync } from "fs";
const PATH = "./src/dao/";

let heroes = [
    {
        id:1,
        name:'Spider-Man',
        alias:'Peter Parker',
        team:'Avengers',
        publisher:'Marvel',
    },
    {
        id:2,
        name:'Superman',
        alias:'Clark Kent',
        team:'Justice League',
        publisher:'DC',
    },
    {
        id:3,
        name:'Iron Man',
        alias:'Tony Stark',
        team:'Avengers',
        publisher:'Marvel',
    },
    {
        id:4,
        name:'Wonder Woman',
        alias:'Diana Prince',
        team:'Justice League',
        publisher:'DC',
    },
    {
        id:5,
        name:'Black Widow',
        alias:'Natasha Romanoff',
        team:'Avengers',
        publisher:'Marvel',
    },
    {
        id:6,
        name:'Batman',
        alias:'Bruce Wayne',
        team:'Justice League',
        publisher:'DC',
    },
    {
        id:7,
        name:'Aquaman',
        alias:'Arthur Curry',
        team:'Justice League',
        publisher:'DC',
    },
    {
        id:8,
        name:'Captain America',
        alias:'Steve Rogers',
        team:'Avengers',
        publisher:'Marvel',
    },
    {
        id:9,
        name:'Flash',
        alias:'Barry Allen',
        team:'Justice League',
        publisher:'DC',
    },
    {
        id:10,
        name:'Black Panther',
        alias:'TChalla',
        team:'Avengers',
        publisher:'Marvel',
    },
    {
        id:11,
        name:'Green Lantern',
        alias:'Hal Jordan',
        team:'Justice League',
        publisher:'DC',
    },
    {
        id:12,
        name:'Thor',
        alias:'Thor Odinson',
        team:'Avengers',
        publisher:'Marvel',
    },
    {
        id:13,
        name:'Batwoman',
        alias:'Kate Kane',
        team:'Bat Family',
        publisher:'DC',
    },
    {
        id:14,
        name:'Hulk',
        alias:'Bruce Banner',
        team:'Avengers',
        publisher:'Marvel',
    },
    {
        id:15,
        name:'Zatanna',
        alias:'Zatanna Zatara',
        team:'Justice League Dark',
        publisher:'DC',
    },
    {
        id:16,
        name:'Doctor Strange',
        alias:'Stephen Strange',
        team:'Defenders',
        publisher:'Marvel',
    },
    {
        id:17,
        name:'Green Arrow',
        alias:'Oliver Queen',
        team:'Justice League',
        publisher:'DC',
    },
    {
        id:18,
        name:'Scarlet Witch',
        alias:'Wanda Maximoff',
        team:'Avengers',
        publisher:'Marvel',
    },
    {
        id:19,
        name:'Martian Manhunter',
        alias:'Jonn Jonzz',
        team:'Justice League',
        publisher:'DC',
    },
    {
        id:20,
        name:'Deadpool',
        alias:'Wade Wilson',
        team:'None',
        publisher:'Marvel',
    },
];
heroes = JSON.stringify(heroes, null, 5);

const entornoAsincrono = async () => {
    if(!fs.existsSync(`${PATH}heroes.json`)){
        await fs.promises.writeFile(`${PATH}heroes.json`, heroes);
    }
}
await entornoAsincrono();


export class HeroesManager {

    constructor(){
        this.heroes =  this.getAllHeroes();
    }

    async createHeroe(ObjetoHeroe){
        let heroes = await this.heroes;
        let ArrayID = heroes.map(personaje => personaje.id);
        let id = Math.max(...ArrayID);
        id = id + 1;
        //let cantidad = heroes.length;
        //let id = heroes[cantidad -1].id + 1;
        heroes.push({id, ...ObjetoHeroe});
        let JsonHeroe = JSON.stringify(heroes, null, 5);
        try {
            await fs.promises.writeFile(`${PATH}heroes.json`,JsonHeroe);
            return JSON.parse( await fs.promises.readFile(`${PATH}heroes.json`,"utf-8"));
        } catch(error){
            console.log(error, "Error Inesperado accediendo al archivo");
        }
    }
    
    async getOneHeroe(nombre){
        let heroes = await this.heroes;
        return heroes.find(persona => persona.name === nombre);
    }

    async getAllHeroes(){
        return  JSON.parse(await fs.promises.readFile(`${PATH}heroes.json`,"utf-8"));
    }

    async updateHeroes(ArrayActualizado){
        try {
            ArrayActualizado = JSON.stringify(ArrayActualizado, null, 5);
            await fs.promises.writeFile(`${PATH}heroes.json`,ArrayActualizado);
            return await JSON.parse(await fs.promises.readFile(`${PATH}heroes.json`,"utf-8"));
        }
        catch(error){console.log(error, "Error inesperado accediendo al archivo")}
    }


}
