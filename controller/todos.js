import mongoose from "mongoose";
import Todo from "../models/todos.js";

export const readTodos = async(req, res)=>{
    try{
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (e) {
        res.status(404).json({e:e.message})
    }
}

export const createTodos = async(req, res)=>{
    const todo = new Todo(req.body);
    try{
        await todo.save();
        res.status(201).json(todo);
    } catch (e) {
        res.status(409).json({e:e.message})
    }
}

export const updateTodos = async (req, res) =>{
    const {id} = req.params;
    const {title, content} = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send(`The id ${id} is not valid`);
    }
    const todo = {title, content, _id:id};
    await Todo.findByIdAndUpdate(id, todo, {new:true});
    res.json(todo);
}

export const deleteTodos = async (req, res) =>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send(`The id ${id} is not valid`);
    }
    await Todo.findByIdAndDelete(id);
    res.json({ message: "Item deleted succesfully!" });
}