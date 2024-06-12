const Image = require('../Models/Image.js')

const fs = require('fs');

const createImage = async (req, res) => {

    try {
        //image comes with type buffer;
        //buffer is a structure that contains a lots of binary value. Image is actually binary array
        //but whenever we want to store this buffer data we should encode it with base64 and store that way
        const img = fs.readFileSync(req.file.path);
        const encode_image = img.toString('base64');


        const finalImg = {
            name: req.file.originalname,
            contentType: req.file.mimetype,
            path: req.file.path,
            image: encode_image,
            url: `data:${req.file.mimetype};base64,${encode_image}`
        };


        const image = new Image(finalImg)
        await image.save()
        res.status(200).json({message: "Image uploaded successfully", status: 400})
    } catch (err) {
        res.status(200).json({message: err._message, status: 400})
    }
}

const getImageURI = async (req, res) => {
    const id = req.params.id

    try {
        const result = await Image.findById(id)

        if (result) {
            //this dataUrl is our image's url for html
            const dataUrl = `data:${result.contentType};base64,${result.image}`;

            res.status(200).json({dataUrl: dataUrl, status: 200})
        } else {
            res.status(200).json({message: `${id} image could not founded`, status: 404})
        }
    } catch (err) {
        res.status(200).json({message: err.message, status: 400})
    }
}

const getAllImages = async (req, res) => {

    try {
        const images = await Image.find()

        const returnObj = images.map(image => {
            return {
                url: image.url,
                _id: image._id,
                name: image.name,
            }
        })

        res.status(200).json({data: returnObj, status: 200})
    } catch (err) {
        res.status(400).json({message: err.message, status: 400})
    }
}

const deleteImage = async (req, res) => {
    const id = req.params.id

    try {
        const deleteImage = await Image.findByIdAndDelete(id)
        if (deleteImage) {
            //remove file from server
            fs.unlinkSync(deleteImage.path)

            res.status(200).json({message: `${deleteImage.name} deleted successfully.`, status: 200})
        } else {
            res.status(200).json({message: `${id} image could not founded`, status: 404})
        }
    } catch (err) {
        res.status(400).json({message: err.message, status: 400})

    }
}
module.exports = {createImage, getImageURI, deleteImage, getAllImages}