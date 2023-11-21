import { TodoEntity } from "../../entities/todo.entity";
import { TodoDataRepository } from "../../repositories/todo.repository";

export interface DeleteTodoUseCase {
    execute(id: number): Promise<TodoEntity>
}

export class DeleteTodo implements DeleteTodoUseCase {
    
    constructor(
        private readonly repository: TodoDataRepository
    ) {}

    execute(id: number): Promise<TodoEntity> {
        return this.repository.deleteById(id);
    }

}