import { UpdateTodoDto } from "../../dtos/todos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoDataRepository } from "../../repositories/todo.repository";

export interface UpdateTodoUseCase {
    execute(dto: UpdateTodoDto): Promise<TodoEntity>
}

export class UpdateTodo implements UpdateTodoUseCase {
    
    constructor(
        private readonly repository: TodoDataRepository
    ) {}

    execute(dto: UpdateTodoDto): Promise<TodoEntity> {
        return this.repository.updateById(dto);
    }

}