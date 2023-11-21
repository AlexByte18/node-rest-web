import { CreateTodoDto } from "../../dtos/todos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoDataRepository } from "../../repositories/todo.repository";

export interface CreateTodoUseCase {
    execute(dto: CreateTodoDto): Promise<TodoEntity>
}

export class CreateTodo implements CreateTodoUseCase {
    
    constructor(
        private readonly repository: TodoDataRepository
    ) {}

    execute(dto: CreateTodoDto): Promise<TodoEntity> {
        return this.repository.create(dto);
    }

}