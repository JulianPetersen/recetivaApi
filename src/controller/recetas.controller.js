import Recetas from '../models/Recetas'
import appConfig from '../config';


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
        let { page = 1, limit = 10 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        const options = { page, limit, sort: { _id: -1 } };

        const result = await Recetas.paginate({}, options);
        
        res.json(result); // Devuelve totalDocs, totalPages, nextPage, prevPage, etc.

    } catch (error) {
        res.status(400).json(error);
    }
};


export const getRecetasById = async (req, res) => { 
    try {
        const recetas = await Recetas.findById(req.params.recetaId)
        res.json(recetas);
    } catch (error) {
        res.status(400).json(error);
    }
    
}

export const updateReceta = async (req,res) => {
    console.log('body con image', req.body.arrayIngredientes)
    console.log('title', req.body.title)
    try {
        if (req.file) {
            const { filename } = req.file;
            const {host, port} = appConfig
            console.log(host)
            req.body.img =  `${host}/public/${filename}`
        }

        if (typeof req.body.arrayIngredientes === 'string') {
            req.body.arrayIngredientes = req.body.arrayIngredientes
                .replace(/^["']|["']$/g, '') // 🔥 Elimina comillas al inicio y final
                .split(',')
                .map(ing => ing.trim());
        }

        console.log('body con image procesado', req.body.arrayIngredientes)
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