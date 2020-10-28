const validarDatos = schema => {
    return async (req,res,next)=>{
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            res.send(error.message);
        }
    }
}

module.exports = validarDatos;