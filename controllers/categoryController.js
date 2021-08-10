// import { categoryModel } from "../models/category.model.js";


const catalogController = (req, res) => {
  res.render('catalog', {title: 'Hello catalog Controller'});
}

const categoryList = (req, res) => {
    res.render('categoryIndex',{text: 'Category Index'})
}

const categoryDetail = (req, res) => {
    res.send('Category Detail')
}

const categoryCreateGet = (req, res) => {
    res.render('categoryForm', {title:'Add Category'})
}

const categoryCreatePost = (req, res) => {
    res.send('Category Create Post')
}

const categoryDeleteGet = (req, res) => {
    res.send('Category Delete Get')
}

const categoryDeletePost = (req, res) => {
    res.send('Category Delete Post')
}

const categoryUpdateGet = (req, res) => {
    res.send('Category Update Get')
}

const categoryUpdatePost = (req, res) => {
    res.send('Category Update Post')
}

export { catalogController, categoryList, categoryDetail,
    categoryCreateGet, categoryCreatePost, categoryUpdateGet,
    categoryUpdatePost, categoryDeleteGet, categoryDeletePost };
