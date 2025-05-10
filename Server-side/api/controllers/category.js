
import Category from "../models/category.js";

export const getAll = (req, res) => {

    Category.find()
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const addCategory = async (req, res) => {
    const {name,apartments } = req.body;
    const newCategory = new Category({
     name, apartments  
    });
    newCategory.save()
        .then(category => {
            res.status(200).send(category)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}