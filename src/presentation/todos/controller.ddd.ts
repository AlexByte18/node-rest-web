import { CreateTodoDto, UpdateTodoDto } from './../../domain/dtos/todos';
import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { TodoDataRepository } from '../../domain';

// const todos = [
//     {id: 1, text: 'Buy milk', completedAt: new Date()},
//     {id: 2, text: 'Buy bread', completedAt: null},
//     {id: 3, text: 'Buy butter', completedAt: new Date()},
// ];

export class TodosController {


    constructor(
        private readonly todoRepository: TodoDataRepository
    ) {}

    public getTodos = async (req: Request, res: Response) => {
        const todos = await this.todoRepository.getAll();
        // console.log({todos});
        return res.json(todos);
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;

        try {
            const todo = await this.todoRepository.findById(id);
            return res.json(todo);
        } catch (error) {
            res.status(400).json({error})
        }
    }

    public createTodo = async (req: Request, res: Response) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({error});

        const newTodo = await this.todoRepository.create(createTodoDto!);

        res.json(newTodo);
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});

        if(error) return res.status(400).json({error});

        try {
            const updatedTodo = await this.todoRepository.updateById(updateTodoDto!);
            return res.json(updatedTodo);
        }catch (error) {
            res.status(400).json({error})
        }

    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: 'ID argument not valid'});

        const deletedTodo = await this.todoRepository.deleteById(id);
        res.json(deletedTodo);
    }
}