const express = require('express')
const router = express.Router()
const Product = require('../model/product')
const multer = require('multer');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if(isValid) {
            uploadError = null
        }
      cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        
      const fileName = file.originalname.split(' ').join('-');
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
  })
  

  const uploadOptions = multer({ storage: storage })

router.post('/',  uploadOptions.single('image'), async (req, res) => {
    const file = req.file;
    if(!file) return res.status(400).send('No image in the request')

    const fileName = file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    const {name,description,moredescription, image,images,brand,price,category,countInStock, rating, numReviews, isFeatured} = req.body
    if (!name || !description || !image || !brand || !price || !category || !countInStock || !rating || !numReviews) {
        return res.status(400).json({ error: "Please Enter All Fields" })
    }
  try{
    const productExist = await Product.findOne({ name: name })
    if(productExist){
        return res.status(500).json({error: "Product Already Exists"})
    } 
    else{
        const product = new Product({name,description,moredescription,   image: `${basePath}${fileName}`,brand,price,category,countInStock, rating, numReviews, isFeatured})
        await product.save()
        res.status(201).json({message: "Product Added Successfully"})
    }
  }
  catch(error){
    console.log(error)
  }
}
)

router.get('/',async(req,res)=>{
    const product = await Product.find()
    if(!product){
        return res.status(500).json({error:"Product cant Found"})
    }
    else{
        res.send(product)
    }
})
router.get('/:id',async(req,res)=>{
    const product = await Product.findById(req.params.id)
    if(!product){
        return res.status(500).json({error:"Product cant Found"})
    }
    else{
        res.send(product)
    }
})
router.put('/:id',async(req,res)=>{
    const product = await Product.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        description:req.body.description,
        moredescription:req.body.moredescription,
        image:req.body.image,
        images:req.body.images,
        brand:req.body.brand,
        price:req.body.price,
        category:req.body.category,
        countInStock:req.body.countInStock,
        rating:req.body.rating,
        numReviews:req.body.numReviews,
        isFeatured:req.body.isFeatured
    },
    { new:true}
    )
    if(!product){
        return res.status(500).json({error:"Product cant Found"})
    }
    else{
        res.status(201).json({error:"Product Updated"})
    }

})
router.delete('/:id',async(req,res)=>{
    const product = await Product.findByIdAndDelete(req.params.id)
    if(!product){
        return res.status(500).json({error:"Product cant Found"})
    }
    else{
        res.status(201).json({message:"Product Deleted"})
    }
})

router.put(
    '/gallery-images/:id', 
    uploadOptions.array('images', 10), 
    async (req, res)=> {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send('Invalid Product Id')
         }
         const files = req.files
         let imagesPaths = [];
         const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

         if(files) {
            files.map(file =>{
                imagesPaths.push(`${basePath}${file.filename}`);
            })
         }

         const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                images: imagesPaths
            },
            { new: true}
        )

        if(!product)
            return res.status(500).send('the gallery cannot be updated!')

        res.send(product);
    }
)


module.exports = router
