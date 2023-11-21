import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDataSourceImpl } from "../../infrastructure/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todo.repository.impl";


export class TodosRoutes {

    static get routes(): Router {
        const router = Router();

        const dataSource = new TodoDataSourceImpl();
        const todoRepository = new TodoRepositoryImpl(dataSource);
        const todoController = new TodosController(todoRepository);

        router.get('/', todoController.getTodos);
        router.get('/:id', todoController.getTodoById);
        router.post('/', todoController.createTodo);
        router.patch('/:id', todoController.updateTodo);
        router.delete('/:id', todoController.deleteTodo);

        return router;
    }
}