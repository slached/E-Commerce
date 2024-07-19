const Image = require("../Models/Image");
const Category = require("../Models/Category");

const responseMergedWithImageURI = async (categories) => {
    const categoryItemWithImageURL = []

    for (const category of categories) {
        const image = await Image.findById(category.imageID, {name: 1, url: 1})
        categoryItemWithImageURL.push({category: category, image: image})
    }
    return categoryItemWithImageURL
}

const getAllCategories = async (req, res) => {
    try {
        let {search} = req.query
        let categories = await Category.find()

        if (search !== undefined) {
            const quantityOfShownProduct = 4
            if (search === "") search = 0
            const count = await Category.countDocuments({})
            let next
            //this checks if there is next paging
            if ((parseInt(search) + 1) * quantityOfShownProduct >= count) next = null
            else next = `http://localhost:${process.env.PORT}/api/v1/category/getAll?search=${parseInt(search) + 1}`
            //this checks if there is prev paging
            let prev
            if (search <= 0) prev = null
            else prev = `http://localhost:${process.env.PORT}/api/v1/category/getAll?search=${parseInt(search) - 1}`

            categories = await Category.find({}).limit(quantityOfShownProduct).skip(search * quantityOfShownProduct)

            const resultObject = {
                count: count,
                next: next,
                previous: prev,
                results: await responseMergedWithImageURI(categories)
            }

            return res.status(200).json({...resultObject, status: 200})
        }

        res.status(200).json({data: await responseMergedWithImageURI(categories), status: 200})

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

const updateCategory = async (req, res) => {

    try {
        const {imageID} = req.body
        const {id} = req.params

        const image = await Image.findById(imageID)
        if (!image) return res.status(200).json({message: "Image does not exists", status: 404})

        const updatedCategory = await Category.findByIdAndUpdate(id, req.body)
        if (!updatedCategory) return res.status(200).json({message: `${id} could not founded`, status: 404})
        res.status(200).json({message: `${updatedCategory.name} category updated`, status: 200})
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

module.exports = {getAllCategories, createCategory, deleteCategory, updateCategory}