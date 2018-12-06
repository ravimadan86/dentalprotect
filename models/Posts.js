const mongoose = require('mongoose');
const {
    CategorySchema
} = require('./Category');
const Schema = mongoose.Schema;

const PostsSchema = new Schema({
    title: {
        type: String,
        maxlength: 255,
        trim: true,
        required: true
    },
    body: {
        type: String,
        trim: true,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    mainImage: String,
    postSlider: [String],
    date: {
        type: Date,
        default: Date.now()
    }
});
const Posts = mongoose.model('posts', PostsSchema, 'posts');

module.exports = {
    numOfAllPosts: async () => {
        return await Posts.countDocuments();
    },
    numOfPostsInSpecCategory: async () => {
        return await Posts.aggregate([{
            $group: {
                _id: '$category',
                count: {
                    $sum: 1
                }
            }
        }]);
    },
    postsLimitPerPage: async (pageSize, currentPage) => {
        return await Posts.find()
            .sort({date: 'desc'})
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    },
    getPostById: async (id) => {
        return await Posts.findById(id);
    },
    getPostsByCategory: async (category, pageSize, currentPage) => {
        return await Posts.find({category: category})
            .sort({date: 'desc'})
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    },
    addNewPost: async (mainPhoto, sliderArray, userInput)=>{
        const newpost = {
          mainImage: mainPhoto,
          title: userInput.title,
          category: userInput.category,
          body: userInput.content,
          postSlider: sliderArray
        }
        //Saving new post
        await new Posts(newpost).save();
    },
    updatePost: async(id, mainPhoto, images, userInput)=>{
        let post = await Posts.findOne({_id: id});
    if(images !== undefined){
      let sliderArray = [];
      for (i = 0; i < images.length; i++) {
        let filesname = images[i].filename;
        sliderArray.push(filesname);
      }
      post.postSlider = sliderArray;
    }
     // // getting body input
    post.title = userInput.title;
    post.category = userInput.category;
    post.body = userInput.content;
    post.mainImage = mainPhoto;
    //saving post
    await post.save();
    },
    deletePost: async (id) => {
      await Posts.deleteOne({ _id: id});
    },
    filteredPosts: async (searchInput) => {
       return await Posts.find({
            $text: {
              $search: searchInput
            }
          }, {
            score: {
              $meta: "textScore"
            }
          })
          .sort({score:{$meta:"textScore"}});
    }
}



