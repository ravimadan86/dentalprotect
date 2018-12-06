const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    category:{
        type: String,
        maxlength: 255,
        lowercase: true,
        required: true
    }
});

const Categories = mongoose.model('categories', CategorySchema, 'categories');

module.exports = {
    allCategories: async ()=>{
        return await Categories.find();
    },
    findCatgById: async (id)=>{
      return await Categories.findById(id);
    },
    addNewCategory: async (userInput)=>{
       return await new Categories({category: userInput}).save();
    },
    deleteCategory: async (id)=>{
        return await Categories.findByIdAndDelete(id);
    }
}
