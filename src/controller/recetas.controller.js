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
        const dataUser = await recetaService.checkInfoUser(req.userId)
        if (dataUser) {
            console.log('comienza la creacion de la receta')
            const newReceta = new Recetas({ title, img, arrayIngredientes, instrucciones, nutricionista, category })
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


export const getRecetasById = async (req, res) => {
    try {
        const recetas = await Recetas.findById(req.params.recetaId)
        res.json(recetas);
    } catch (error) {
        res.status(400).json(error);
    }

}

export const updateReceta = async (req, res) => {
    console.log('body con image', req.body.arrayIngredientes)
    console.log('title', req.body.title)
    try {
        if (req.file) {
            const { filename } = req.file;
            const { host, port } = appConfig
            console.log(host)
            req.body.img = `${host}/public/${filename}`
        }

        if (typeof req.body.arrayIngredientes === 'string') {
            req.body.arrayIngredientes = req.body.arrayIngredientes
                .replace(/^["']|["']$/g, '') // 🔥 Elimina comillas al inicio y final
                .split(',')
                .map(ing => ing.trim());
        }

        console.log('body con image procesado', req.body.arrayIngredientes)
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