import CategoriasReceta from '../models/categoriasReceta'
import logger from '../libs/logger'


export const createCategoriaReceta = async(req,res) => {
    const {name} = req.body
    try {
        const newCategoriaReceta = new CategoriasReceta({name})
        const categoriaSaved = await newCategoriaReceta.save()
        res.status(200).json(categoriaSaved)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getAllCategories = async (req,res) => {
    try{
        const allCategories = await CategoriasReceta.find()
        res.status(200).json(allCategories)
    }catch (error){
        res.status(400).json(error)
    }
}

export const getCategorieById = async (req,res) => {
    try {
        const categorie = await CategoriasReceta.findById(req.params.id)
        res.status(200).json(categorie)
    } catch (error) {
        res.status(400).json({error})        
    }
}

export const deleteCategorie = async (req,res) => {
    try{
        const categorieDelete = await CategoriasReceta.findByIdAndDelete(req.params.id)
        res.status(200).json({res:'categoria borrada correctamente'})
    }catch (error){
        res.status(400).json({error})
    }

}