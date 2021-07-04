import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Board } from './board';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private boardRepository: Repository<Board>,
    ) {
    }

    async getAll(): Promise<Board[]> {
        return await this.boardRepository.find();
    };

    async getById(boardId: string): Promise<Board | undefined> {
        return await this.boardRepository.findOne({ id: boardId });

    };

    async post(board: Board): Promise<Board | undefined> {
        return await this.boardRepository.save(board);
    };

    async put(board: Board): Promise<Board | undefined> {
        return this.boardRepository.save(board);
    };

    async deleteById(boardId: string): Promise<DeleteResult> {
        return await this.boardRepository.delete({ id: boardId });
    };
}
