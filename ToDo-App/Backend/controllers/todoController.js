import express from 'express';
import mongoose from 'mongoose';
import Todo from '../models/todoModel.js';
const router = express.Router();


//  GET: localhost:3000/todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).send({ message: "Todos Fetched Successfully!", todos: todos });

    } catch (error) {
        res.status(404).send({ message: error.message });
    }
});


//  POST: localhost:3000/todos/add
router.post('/add', (req, res) => {
    try {
        const todo = Todo.create(req.body);
        res.status(200).send({ message: "Todo Added Succesfully!", todo: todo });
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
});


//  PUT: localhost:3000/todos/:id
router.put('/:id', async (req, res) => {

    const { id } = req.params;
    const todo = await Todo.findOneAndUpdate({ _id: id }, { ...req.body });

    //  Checking ID is Valid or Not
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).send({ message: "Invalid Todo ID!" });

    // Error if data not found 
    if (!todo)
        return res.status(404).send({ message: "Todo Not Found!" });

    // Todo updated
    res.status(200).send({ message: "Todo Updated!" });

});


//  PUT: localhost:3000/todos/:id
router.delete('/:id', async (req, res) => {

    const { id } = req.params;
    const todo = await Todo.findOneAndDelete({ _id: id });

    //  Checking ID is Valid or Not
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).send({ message: "Invalid Todo ID!" });

    // Error if data not found 
    if (!todo)
        return res.status(404).send({ message: "Todo Not Found!" });

    // Todo updated
    res.status(200).send({ message: "Todo Deleted!" });

});




export default router;