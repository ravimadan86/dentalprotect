const {
    allCategories,
    findCatgById,
    addNewCategory,
    deleteCategory
} = require('../models/Category');

const asyncMiddleware = require('../helper/asyncMiddleware');

module.exports = {
    renderAddCatgPage: 
        asyncMiddleware(async (req, res) => {
            const categories = await allCategories();
            res.render('categories/addcategory', {
                categories: categories
            });
        }, 'categories/addcategory'),
    renderEditCatgPage: 
        asyncMiddleware(async(req, res) => {
                const category = await findCatgById(req.params.id);
                const categories = await allCategories();
                if(!category){
                throw err
                }else{
                    res.render('categories/addcategory',{
                        categories:categories,
                        category: category
                    });
                }
        },'categories/addcategory'),
    newCategory: 
        asyncMiddleware(async(req,res)=>{
                let userInput = req.body.category.toLowerCase();
                const categories = await allCategories();
                categories.forEach(category => {
                    if(category.category === userInput){
                        req.flash('error_msg', 'Category exists')
                        throw err;   
                    }
                });
                await addNewCategory(userInput);                    
                req.flash('success_msg', 'New category added successfully!');
                res.redirect('/categories/addcategory');
        },'categories/addcategory'),
    editCategory:
        asyncMiddleware(async(req,res)=>{
                const category = await findCatgById(req.params.id);
                category.category = req.body.category;
                await category.save();
                req.flash('success_msg', 'Category edited successfully!')
                res.redirect('/categories/addcategory');
        },'categories/addcategory'),
    deleteCategory:
        asyncMiddleware(async(req,res)=>{
                await deleteCategory(req.params.id);
                req.flash('success_msg', 'Category removed');
                res.redirect('/categories/addcategory');
        },'categories/addcategory')
}