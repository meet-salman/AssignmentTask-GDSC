import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
    todo: {
        type: String,
        required: true
    }
})

const todoModel = mongoose.model('Todo', todoSchema);
export default todoModel;