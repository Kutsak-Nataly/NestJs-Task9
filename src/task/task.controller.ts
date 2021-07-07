import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put, UseGuards
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { TaskService } from './task.service';
import { Task } from './task';
import { AuthGuard } from '../auth/auth.guard';

@Controller('/boards/:boardId/tasks')
@UseGuards(AuthGuard)
export class TaskController {
    constructor(private readonly taskService: TaskService) {
    }

    @Get()
    async getAll(@Param('boardId') boardId: string): Promise<Task[]> {
        const tasks = await this.taskService.getAll(boardId);
        if (!tasks) {
            throw new HttpException('Tasks Not found', HttpStatus.NOT_FOUND);
        } else {
            return tasks;
        }
    }

    @Get(':id')
    async getById(@Param('boardId') boardId: string, @Param('id') id: string): Promise<Task> {
        const task = await this.taskService.getById(id, boardId);
        if (!task) {
            throw new HttpException('Task Not found', HttpStatus.NOT_FOUND);
        } else {
            return task;
        }
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async post(@Body() task: Task, @Param('boardId') boardId: string): Promise<Task> {
        task.boardId = boardId;
        const boardCreate = await this.taskService.post(task);
        if (!boardCreate) {
            throw new HttpException('Board not create', HttpStatus.BAD_REQUEST);
        } else {
            return boardCreate;
        }
    }

    @Put(':id')
    async put(@Body() task: Task, @Param('boardId') boardId: string, @Param('id') id: string): Promise<Task> {
        task.id = id;
        task.boardId = boardId;
        const boardPut = await this.taskService.put(task);
        if (!boardPut) {
            throw new HttpException('Board not update', HttpStatus.NOT_MODIFIED);
        } else {
            return boardPut;
        }

    }

    @Delete(':id')
    async deleteById(@Param('id')  id: string, @Param('boardId')  boardId: string): Promise<DeleteResult> {
        const deleteResult = await this.taskService.deleteById(id, boardId);
        if (!deleteResult) {
            throw new HttpException('Board not delete', HttpStatus.BAD_REQUEST);
        } else {
            return deleteResult;
        }
    }
}
