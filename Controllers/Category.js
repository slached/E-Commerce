const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const Product = require("../Models/Product");
const Image = require("../Models/Image");
const Category = require("../Models/Category");

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        const categoryItemWithImageURL = []

        for (const category of categories) {
            const image = await Image.findById(category.imageID)
            categoryItemWithImageURL.push({name: category.name, url: image.url})
        }

        res.status(200).json({data: categoryItemWithImageURL, status: 200})
    } catch (err) {
        res.status(200).json({message: err.message, status: 400})
    }
}

const createCategory = async (req, res) => {

    try {
        const {name, imageID} = req.body

        const image = await Image.findById(imageID)
        if (!image) return res.status(200).json({message: "Image does not exists", status: 404})

        const newCategory = new Category(req.body)
        await newCategory.save()
        res.status(200).json({message: `${name} category created`, status: 200})
    } catch (err) {
        res.status(200).json({message: err.message, status: 400})
    }
}

const deleteCategory = async (req, res) => {

    try {
        const category = await Category.findOneAndDelete({_id: req.params.id})
        if (!category) return res.status(200).json({message: "Category does not exists", status: 404})
        res.status(200).json({message: `${category.name} deleted successfully`, status: 200})
    } catch (err) {
        res.status(200).json({message: err.message, status: 400})
    }
}

module.exports = {getAllCategories, createCategory, deleteCategory}