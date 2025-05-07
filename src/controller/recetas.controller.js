import Recetas from '../models/Recetas'
import appConfig from '../config';
import recetaService from '../services/recetaServices'
import User from '../models/User'
import logger from '../libs/logger'

export const createRecetas = async (req, res) => {
    const { title, img, ingredientes, instrucciones, nutricionista, category } = req.body
    const user = await User.findById(req.userId)
    console.log('user', user)
    try {
        let arrayIngredientes = ingredientes.split(',')
        let arrayCategory = category.split(',')
        const dataUser = await recetaService.checkInfoUser(req.userId)
        console.log('LA CADENA DE CATEGORIAS ES',arrayCategory)
        if (dataUser) {
            console.log('comienza la creacion de la receta')
            const newReceta = new Recetas({ title, img, arrayIngredientes, instrucciones, nutricionista, arrayCategory })
            if (req.file) {
                const { filename } = req.file
                newReceta.setImgUrl(filename)
            }
            const RecetaSaved = await newReceta.save()
            logger.info('Receta creada con éxito:', { email: user.email })
            return res.status(201).json(RecetaSaved) // ✅ Detener ejecución aquí
        }

        // Solo se ejecuta si dataUser === false
        return res.status(400).json('Debes rellenar tus datos antes de poder realizar una publicación, ve a "Mi cuenta > Mis datos".')
    } catch (error) {
        logger.error(`error al crear la receta ${error.message}`, { email: user?.email })
        return res.status(400).json({ error: error.message }) // ✅ Siempre retornar
    }
}


export const getRecetas = async (req, res) => {
    try {
        let { page = 1, limit = 10 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        const options = { page, limit, sort: { _id: -1 },populate: 'nutricionista' };

        const result = await Recetas.paginate({}, options)
        

        res.json(result); // Devuelve totalDocs, totalPages, nextPage, prevPage, etc.

    } catch (error) {
        res.status(400).json(error);
    }
};

export const getAllRecetas = async (req,res) => {
    try {
        const allrecetas = await Recetas.find()
        .populate('arrayCategory')
        .populate('nutricionista')
        res.status(200).json(allrecetas)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getRecetasById = async (req, res) => {
    try {
        const recetas = await Recetas.findById(req.params.recetaId)
        .populate('arrayCategory');
        res.json(recetas);
    } catch (error) {
        res.status(400).json(error);
    }

}

export const updateReceta = async (req, res) => {

    req.body.arrayIngredientes = req.body.arrayIngredientes.split(',')
    req.body.arrayCategory = req.body.arrayCategory.split(',')


    console.log(req.body.arrayIngredientes) 
    console.log(req.body.category)
    try {
        if (req.file) {
            const { filename } = req.file;
            const { host, port } = appConfig
            console.log(host)
            req.body.img = `${host}/public/${filename}` 
        }
        const updateReceta = await Recetas.findByIdAndUpdate(req.params.recetaId, req.body, {
            new: true
        }) 
        res.status(201).json({
            result: "ok",
            newLiga: updateReceta 
        });
    } catch (error) {
        res.status(400).json(error)
    }
}

export const deleteReceta = async (req, res) => { 
    try {
        const deleteReceta = await Recetas.findByIdAndDelete(req.params.recetaId)
        res.status(201).json({ message: 'OK' })
    } catch (error) {
        res.status(400).json({ message: error })
    }

}