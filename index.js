import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import todosRoutes from "./routes/todos.js";
const app = express();
dotenv.config();
app.use(express.json({extend: true}));
app.use(express.urlencoded({extend: true}));

app.use(cors());

const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASS;
const db = process.env.MONGO_DATABASE;
const cluster = process.env.MONGO_CLUSTER;
const port = process.env.PORT || 5000;
app.use("/todos", todosRoutes);

const mongodb = `mongodb+srv://${user}:${pass}@${cluster}/${db}?retryWrites=true&w=majority`;

app.get("/", (req, res)=>{
    res.send("Welcome to server");
})

mongoose.connect(mongodb, {useNewUrlParser: true})
.then(()=> {
    app.listen(port, ()=> console.log(`Connected to database`));
})
.catch((err)=> console.log(err))
