import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Task } from './task';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) {
    }

    async getAll(boardId: string): Promise<Task[]> {
        return await this.taskRepository.find({where: {boardId}});
    };

    async getById(id: string, boardId: string): Promise<Task | undefined> {
        return await this.taskRepository.findOne({where: {boardId, id}});

    };

    async post(task: Task): Promise<Task | undefined> {
        return await this.taskRepository.save(task);
    };

    async put(task: Task): Promise<Task | undefined> {
        return this.taskRepository.save(task);
    };

    async deleteById(id: string, _boardId: string): Promise<DeleteResult> {
        return await this.taskRepository.delete({ id });
    };
}
