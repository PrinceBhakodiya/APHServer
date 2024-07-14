const express=require('express');
const router=express.Router();
const ItemModel= require('../models/itemmodel');

 // get books
 router.route('/').get(async (req, res) => {
    try {
      const finditems = await ItemModel.find({});
      console.log(finditems);
  
      if (finditems.length === 0) {
        return res.status(404).json({ error: 'Items not found' });
      }
  
      res.status(200).json(finditems);
    } catch (err) {
      console.error('Error fetching items:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  router.route('/category/:category').get(async (req, res) => {
   const category=req.params;
   const categoryRegex = new RegExp(`^${category.category}$`, 'i'); // '^' and '$' ensure exact match

    try {
      const findItems = await ItemModel.find({ Category: { $regex: categoryRegex } });
  
      console.log(findItems);
  
      if (findItems.length === 0) {
        return res.status(404).json({ error: `Items with category '${category.category}' not found` });
      }
  
      res.status(200).json(findItems);
    } catch (err) {
      console.error('Error fetching items by category:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  router.route('/category').get(async (req, res) => {
    try {
      const categories = await ItemModel.distinct('Category');
  
      console.log(categories);
  
      if (categories.length === 0) {
        return res.status(404).json({ error: 'Categories not found' });
      }
  
      res.status(200).json(categories);
    } catch (err) {
      console.error('Error fetching categories:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  // GET items by category or item name
router.get('/search', async (req, res) => {
    try {
      const { q } = req.query;
  
      if (!q) {
        return res.status(400).json({ error: 'Search query parameter "q" is required' });
      }
  
      const query = {
        $or: [
          { Category: { $regex: new RegExp(q, 'i') } }, // Case-insensitive search for Category
          { ItemName: { $regex: new RegExp(q, 'i') } }   // Case-insensitive search for ItemName
        ]
      };
  
      const foundItems = await ItemModel.find(query);
  
      if (foundItems.length === 0) {
        return res.status(404).json({ error: 'Items not found' });
      }
  
      res.status(200).json(foundItems);
    } catch (err) {
      console.error('Error fetching items:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
//add books
//   router.route('/').post(async (req,res)=>{
//     try{
//       console.log(req.body.subjectId);
  
//       const { title,author,link,subjectId }=req.body;
//       const newBooks=new Assignment({title,author,link});
//       // console.log(findbook);
//       // console.log("hi");
//       const findsub=await Subject.findById(subjectId);
//       if(!findsub){
//         return res.status(404).json({error:'subject not found'});
//       }
//       const savedBooks =await newBooks.save(); 
  
//       findsub.books.push(savedBooks._id);
//       await findsub.save();
//       res.status(201).json(savedBooks);
  
  
//       // res.json({data:"data"});
//     }
//     catch(er){
//       console.log(er);
//       res.status(500).json({error:'Internal Server Error'})};
//   });


//   router.route('/:id').get(async (req,res)=>{
//     try{
//       const id=req.params.id;
//       // const newBooks=new Books(name,link);
  
//       const findbook=await Subject.findById(id).populate('assignment');
   
//       const books=findbook.books;
//       if(!books){
//         return res.status(404).json({error:'Assignment not found'});
//       }
//       // const savedBooks =await newBooks.save(); 
  
//       // Subject.Books.push(savedBooks._id);
//       // await Subject.save();
//       res.status(201).json(books);
  
  
//       // res.json({data:"data"});
//     }
//     catch(er){res.status(500).json({error:'Internal Server Error'})};
//   });
  module.exports=router;