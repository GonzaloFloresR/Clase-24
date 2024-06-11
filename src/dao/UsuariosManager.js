import { usuarioModelo } from "./Models/usuarioModel.js";

export class UsuariosManager {
    async getAll(filtro={}){
        return await usuarioModelo.find(filtro).lean();
    }

    async getBy(filtro={}){
        return await usuarioModelo.findOne(filtro).lean();
    }

    async create(usuario){
        let nuevoUsuario =  await usuarioModelo.create(usuario);
        return nuevoUsuario.toJSON(); //Funcionaria como el lean()
    }
}