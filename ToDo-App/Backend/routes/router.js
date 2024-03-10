import express from 'express';
import todos from '../controllers/todoController.js';
const router = express.Router();


router.use('/todos', todos);

export default router;