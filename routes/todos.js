import express from "express";
import { createTodos, readTodos, updateTodos, deleteTodos } from "../controller/todos.js";

const router = express.Router();
router.get("/", readTodos);
router.post("/", createTodos);
router.patch("/:id", updateTodos)
router.delete("/:id", deleteTodos)

export default router;