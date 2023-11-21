import { UpdateTodoDto } from '../dtos/todos';
import { TodoEntity } from '../entities/todo.entity';
import { CreateTodoDto } from './../dtos/todos/create-todo.dto';


export abstract class TodoDataRepository {
    abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;
    abstract getAll(): Promise<TodoEntity[]>;
    abstract findById(id: number): Promise<TodoEntity>;
    abstract updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>;
    abstract deleteById(id: number): Promise<TodoEntity>;
}