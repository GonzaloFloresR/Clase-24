import mongoose from "mongoose";

export const usuarioModelo = mongoose.model(
    "usuarios",
    new mongoose.Schema(
        {
            name: String,
            email: {type: String, unique: true},
            password: String,
            rol: {type: String, default: "user"}
        },
        {
            timestamps: true
        }
    )
);