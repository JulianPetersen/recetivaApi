import Recetas from '../models/Recetas'

export const createRecetas = async (req, res) => {

    try {
        const { title, img, ingredientes,instrucciones,nutricionista} = req.body
        let arrayIngredientes = ingredientes.split(',')
        const newReceta = new Recetas({ title, img, arrayIngredientes,instrucciones,nutricionista })
        if (req.file) {
            const { filename } = req.file;
            newReceta.setImgUrl(filename)
        }
        const RecetaSaved = await newReceta.save();
        res.status(201).json(RecetaSaved);
    } catch (error) {
        res.status(400).json(error)
    }
}


export const getRecetas = async (req, res) => { 
    try {
        const recetas = await Recetas.find()
        .sort({ fecha: -1 }) // Ordena por fecha descendente (los más recientes primero)
        .limit(10); // Limita a los 10 últimos documentos
        res.json(recetas);
    } catch (error) {
        res.status(400).json(error);
    }
}


export const getRecetasById = async (req, res) => { 
    try {
        const recetas = await Recetas.findById(req.params.recetaId)
        res.json(recetas);
    } catch (error) {
        res.status(400).json(error);
    }
    
}

export const updateReceta = async (req,res) => {
    try {
        if (req.file) {
            const { filename } = req.file;
            const {host, port} = appConfig
            console.log(host)
            req.body.img =  `${host}/public/${filename}`
        }
        console.log(req.body)
        const updateReceta =  await Recetas.findByIdAndUpdate(req.params.recetaId, req.body,{
            new:true
        })
        res.status(201).json({
            result:"ok",
            newLiga:updateReceta
        });
    } catch (error) {
        res.status(400).json(error)
    }
}

export const deleteReceta = async (req,res) => {
    try {
        const deleteReceta = await Recetas.findByIdAndDelete(req.params.recetaId)
        res.status(201).json({message:'OK'})
    } catch (error) {
        res.status(400).json({message:error})
    }
    
}