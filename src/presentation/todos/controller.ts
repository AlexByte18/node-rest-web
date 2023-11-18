import { CreateTodoDto, UpdateTodoDto } from './../../domain/dtos/todos';
import { Request, Response } from "express";
import { prisma } from "../../data/postgres";

// const todos = [
//     {id: 1, text: 'Buy milk', completedAt: new Date()},
//     {id: 2, text: 'Buy bread', completedAt: null},
//     {id: 3, text: 'Buy butter', completedAt: new Date()},
// ];

export class TodosController {


    constructor() {}

    public getTodos = async (req: Request, res: Response) => {
        const myTodos = await prisma.todo.findMany();
        return res.json(myTodos);
        // return res.json(todos);
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;

        if(isNaN(id)) return res.status(400).json({error: 'ID argument not valid'});

        const todo = await prisma.todo.findFirst({
            where: {id}
        });
        // const todo = todos.find(todo => todo.id === id);

        todo ? res.json(todo) : res.status(404).json({error: `Todos with id ${id} not found`});
    }

    public createTodo = async (req: Request, res: Response) => {

        // const {text} = req.body;
        
        // if (!text ) return res.status(400).json({ error: 'text property is required'});
        
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) return res.status(400).json({error});

        const newTodo = await prisma.todo.create({
            data: createTodoDto!
        });

        // const newTodo = {
        //     id: todos.length + 1,
        //     text: text,
        //     completedAt: null
        // };

        // todos.push(newTodo);

        res.json(newTodo);
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});

        if(error) return res.status(400).json({error});
        // if(isNaN(id)) return res.status(400).json({error: 'ID argument not valid'});

        // const todo = todos.find(todo => todo.id === id);

        const todo = await prisma.todo.findFirst({
            where: {id}
        });
        if (!todo) return res.status(404).json({error: `Todo with id ${id} not found`});
        
        // const {text, completedAt} = req.body;
        // (completedAt === null) ? todo.completedAt = null : todo.completedAt = new Date(completedAt || todo.completedAt); 
        // todo.text = text || todo.text;

        const updatedTodo = await prisma.todo.update({
            where: {id},
            data: updateTodoDto!.values
            // {
                // text,
                // completedAt: (completedAt) ? new Date(completedAt) : null
                
            // }
        });

        return res.json(updatedTodo);
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: 'ID argument not valid'});

        // const todo = todos.find(todo => todo.id === id);
        const todo = await prisma.todo.findFirst({
            where: {id}
        });
        if (!todo) return res.status(404).json({error: `Todo with id ${id} not found`});

        // todos.splice(todos.indexOf(todo), 1);

        const deletedTodo = await prisma.todo.delete({
            where: {id}
        });

        (deletedTodo) ? res.json(deletedTodo) : res.status(400).json({error: `Todo with id ${id} not found`});

        res.json({todo, deletedTodo});
    }
}