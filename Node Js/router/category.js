const express = require('express')
const router = express.Router()
const Category = require('../model/category')


router.post('/', async (req, res) => {
    const { name, icon, iconcolor } = req.body
    if (!name || !icon || !iconcolor) {
        return res.status(400).json({ error: "Please Enter All Fields" })
    }
    try {
        const categoryExist = await Category.findOne({ name: name })
        if (categoryExist) {
            return res.status(500).json({ error: "Category Already Exists" })
        }
        else {
            const category = new Category({ name, icon, iconcolor })
            await category.save()
            res.status(201).json({ message: "Category Added Successfully" })
        }
    }
    catch (error) {
        console.log(error)
    }
})

router.get('/', async (req, res) => {
    try {
        const category = await Category.find()
        if (!category) {
            return res.status(500).json({ error: "Category not Found" })
        }
        else {
            res.status(200).json(category)
        }
    }
    catch (error) {
        console.log(error)
    }
}
)
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) {
            return res.status(500).json({ error: "Category not Found" })
        }
        else {
            res.status(200).json(category)
        }
    }
    catch (error) {
        console.log(error)
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)
        if (!category) {
            return res.status(500).json({ error: "Category not Found" })
        }
        else {
            res.status(201).json({message:"Categord Deleted"})
        }
    }
    catch (error) {
        console.log(error)
    }
})
router.put('/:id',async(req,res)=>{
    const category = await Category.findByIdAndUpdate(req.params.id,
        {
            name:req.body.name,
            icon:req.body.icon,
            iconcolor:req.body.iconcolor
        },
        {new:true}
        )
        if(!category){
            return res.status(500).json({error:"Category not Found"})
        }
        else{
            res.status(201).json({message:"Category Updated"})
        }

})
module.exports = router;