import { prisma } from "../data/postgres";
import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto } from "../domain";


export class TodoDataSourceImpl implements TodoDataSource {

    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const newTodo = await prisma.todo.create({
            data: createTodoDto!
        });

        return TodoEntity.fromObject(newTodo);
    }
    
    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        
        return todos.map(todo => TodoEntity.fromObject(todo));
    }

    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({
            where: {id}
        });

        if (!todo) throw `todo with id ${id} not found`;

        return TodoEntity.fromObject(todo);
    }

    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        const todo = await this.findById(updateTodoDto.id);

        const updatedTodo = await prisma.todo.update({
            where: {id: updateTodoDto.id},
            data: updateTodoDto!.values
        });
        
        return TodoEntity.fromObject(updateTodoDto);
    }

    async deleteById(id: number): Promise<TodoEntity> {
        const todo = await this.findById(id);

        const deletedTodo = await prisma.todo.delete({
            where: {id}
        });

        return TodoEntity.fromObject(deletedTodo);
    }

}