const { allCategories } = require('../models/Category');
const {
  numOfAllPosts,
  numOfPostsInSpecCategory,
  postsLimitPerPage,
  getPostById,
  getPostsByCategory,
  addNewPost,
  updatePost,
  deletePost,
  filteredPosts
} = require('../models/Posts');

const asyncMiddleware = require('../helper/asyncMiddleware');

module.exports = {
    renderPostsPage:
        asyncMiddleware(async (req, res) => {
            //Fetch posts from database
              const pageSize = 5;
              const currentPage = +req.query.page;
              const posts = await postsLimitPerPage(pageSize, currentPage);
              const totalPosts = await numOfAllPosts();
              const postsInCategories = await numOfPostsInSpecCategory();
          
              res.render('posts/posts', {
                posts: posts,
                postsInCategories: postsInCategories,
                pageTitle: 'Read our blog',
                pagination: {
                  page: currentPage,
                  limit: pageSize,
                  totalRows: totalPosts
                }
              });
          },'posts?page=1'),
    renderAddPostPage: 
          asyncMiddleware(async (req, res) => {
              const categories = await allCategories();
              res.render('posts/addpost', {
                categories: categories
              });    
          }, '/posts/addpost'),
    renderSinglePage: 
          asyncMiddleware(async (req, res) => {
              const post = await getPostById(req.params.id);
              const postsInCategories = await numOfPostsInSpecCategory();
              res.render('posts/single', {
                post: post,
                postsInCategories: postsInCategories
              });
          }, 'posts?page=1'),
    renderEditPostPage: 
          asyncMiddleware(async (req, res) => {
              const post = await getPostById(req.params.id);
              const categories = await allCategories();
              if (post) {
                res.render('posts/editpost', {
                  post: post,
                  categories: categories
                });
              } else {
                throw err;
              }
          }, 'posts?page=1'),
    postsByCatgPage: 
          asyncMiddleware(async (req, res) => {
            //Fetch posts from database
              const pageSize = 5;
              const category = req.params.category;
              const currentPage = +req.query.page;
              if (isNaN(currentPage)) {
                throw err;
              };
              const totalPostsByCategory = await getPostsByCategory(category, pageSize, currentPage);
              const postsInCategories = await numOfPostsInSpecCategory();
              postsInCategories.forEach(postCategory => {
                if (postCategory._id === category) {
                  postsNumInSpecCategories = postCategory.count;
                }
              });
              if (totalPostsByCategory.length > 0) {
                res.render('posts/posts', {
                  posts: totalPostsByCategory,
                  postsInCategories: postsInCategories,
                  pagination: {
                    page: currentPage,
                    limit: pageSize,
                    totalRows: postsNumInSpecCategories
                  }
                });
              } else {
                throw err;
              }
          }, 'posts?page=1'),
    addPost:
          asyncMiddleware(async (req, res) => {
              let image = req.files['image'];
              let images = req.files['images'];
              let userInput = req.body;
              if (image == undefined) {
                req.flash('error_msg', 'Main photo is required');
                res.redirect('/posts/addpost');
              } else {
                let sliderArray = [];
                if (images !== undefined) {
                  for (i = 0; i < images.length; i++) {
                    let filesname = images[i].filename;
                    sliderArray.push(filesname);
                  }
                }
                mainPhoto = image[0].filename;
                await addNewPost(mainPhoto, sliderArray, userInput);
                req.flash('success_msg', 'New post added successfully!')
                res.redirect('/posts?page=1');
              }
          }, 'posts/addpost'),
    editPost:
          asyncMiddleware(async (req, res) => {
              const id = req.params.id;
              let image = req.files['image'];
              let images = req.files['images'];
              let userInput = req.body;
              // // checking if main photo is selected
              if (image == undefined) {
                req.flash('error_msg', 'Main photo is required');
                res.redirect(`/posts/editpost/${id}`);
              } else {
                  // saving updated post
                mainPhoto = image[0].filename;
                await updatePost(id, mainPhoto, images, userInput);
                req.flash('success_msg', 'Post edited successfully!')
                res.redirect('/posts?page=1');
              }
          }, 'posts?page=1'),
    removePost:
          asyncMiddleware(async (req, res) => {
              await deletePost(req.params.id);
              req.flash('success_msg', 'Post removed');
              res.redirect('/posts?page=1');
          }, '/posts?page=1'),
    searchPosts:
          asyncMiddleware(async (req, res) => {
              let searchInput = req.body.searchtext;
              const searchedPosts = await filteredPosts(searchInput);
              if (searchedPosts.length <= 0) {
                req.flash('error_msg', 'Nothing matched your search!');
                res.redirect('/posts?page=1');
              } else {
                res.render('posts/searchedposts', {
                  searchedPosts: searchedPosts
                });
              }
          }, 'posts?page=1')
}


