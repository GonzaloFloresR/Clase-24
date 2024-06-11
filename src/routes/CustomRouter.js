import { Router } from "express";

export class CustomRouter {
    constructor(){
        this.router = Router();
        this.init();
    }

    init(){}// Esta inicialización será para sus clases heredadas

    getRouter(){
        return this.router;
    }
 // Primer argumento una RUTA y el resto un rest de funciones o callbacks
    get(path, permisos, ...callbacks){
        this.router.get(path, this.customRequest, this.accesos(permisos), ...this.manejaFunciones(callbacks));
    }

    post(path, permisos ,...callbacks){
        this.router.post(path, this.customRequest, this.accesos(permisos), ...this.manejaFunciones(callbacks));
    }

    delete(path, permisos ,...callbacks){
        this.router.delete(path, this.customRequest, this.accesos(permisos), ...this.manejaFunciones(callbacks));
    }


    //middlewares internos
    customRequest = (req, res, next) => {
        res.setHeader("Content-Type","application/json");
        res.success = (mensaje) => res.status(200).json({status:"OK", mensaje})
        res.successData = (mensaje, data, status) => res.status(status).json({status:"OK", mensaje, data})
        res.badRequest = (error) => res.status(400).json({status:"Bad Request", error})
        res.unauthorized = (error) => res.status(401).json({status:"UnAuthorized",error})
        res.forbidden = (error) => res.status(403).json({status:"forbidden",error})
        res.internalServerError = (error) => res.status(500).json({status:"internal Server Error",error})
        next();
    }
    
    manejaFunciones = (funciones=[]) => {
        return funciones.map(funcion => async function(...params){
            try {
                return await funcion(...params);
            }
            catch(error){
                return params[1].internalServerError(error.message);
            }
        })
    }

    accesos = (permisos=[]) => { // ["user, "admin"]
        return (req, res, next) => {

            if(!Array.isArray(permisos)){
                return res.internalServerError("Error en la parametrización de permisos de la ruta")
            }

            permisos = permisos.map(p => p.toLowerCase());
            if(permisos.includes("public")){
                return next();
            }

            if(!req.user?.rol){
                return res.unauthorized("No existen usuarios autenticados o hay problemas con el rol");
            }

            if(!permisos.includes(req.user.rol.toLowerCase())){
                return res.forbidden("No tiene privilegios suficientes para acceder al recurso solicitado");
            }
        }
    }
    
}//FIN CUSTOM ROUTER