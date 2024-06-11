export const m1 = (req, res, next) => {
    console.log("Saludo desde middleware 1");
    next()
}

export const m2 = (req, res, next) => {
    console.log("Saludo desde middleware 2");
    next()
}

export const m3 = (req, res, next) => {
    console.log("Saludo desde middleware 3");
    next()
}
