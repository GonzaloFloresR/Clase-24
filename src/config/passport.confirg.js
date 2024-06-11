import passport from "passport";
import local from "passport-local"
import passportJWT from "passport-jwt"
import { UsuariosManager } from "../dao/UsuariosManager.js";
import { validaPass } from "../utils.js";
const usuarioManager = new UsuariosManager;

export const iniciaPassport = () => {

    passport.use(
        "login",
        new local.Strategy(
            {usernameField:"email"},
            async (username, password, done) => {
                try {
                    let usuario = usuarioManager.getBy({email:username});
                    if(!usuario){
                        return done(null, false, {message:"Credenciales inválidad - (Nombre)"});
                    }
                    if(!validaPass(password, usuario.password)){
                        return done(null, false, {message:"Credenciales inválidad - (Password)"});
                    }
                    delete usuario.password;

                    return done(null, usuario);
                }
                catch(error){
                    return done(error)
                }
            }
        )
    )//FIN LOGIN

    
} //FIN INICIA PASS