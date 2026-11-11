import express from 'express';
import { addCategory, listCategories, removeCategory, updateCategory } from '../controllers/categoryController.js';
import adminAuth from '../middleware/adminAuth.js';

const categoryRouter = express.Router();

categoryRouter.get('/list', listCategories);
categoryRouter.post('/add', adminAuth, addCategory);
categoryRouter.post('/remove', adminAuth, removeCategory);
categoryRouter.post('/update', adminAuth, updateCategory);

export default categoryRouter;
