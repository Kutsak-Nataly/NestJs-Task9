import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { BoardService } from './board.service';
import { Board } from './board';

@Controller('boards')
export class BoardController {
    constructor(private readonly boardService: BoardService) {
    }

    @Get()
    async getAll(): Promise<Board[]> {
        const boards = await this.boardService.getAll();
        if (!boards) {
            throw new HttpException('Boards Not found', HttpStatus.NOT_FOUND);
        } else {
            return boards;
        }
    }

    @Get(':boardId')
    async getById(@Param('boardId') boardId: string): Promise<Board> {
        const board = await this.boardService.getById(boardId);
        if (!board) {
            throw new HttpException('Board Not found', HttpStatus.NOT_FOUND);
        } else {
            return board;
        }
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async post(@Body() board: Board): Promise<Board> {
        const boardCreate = await this.boardService.post(board);
        if (!boardCreate) {
            throw new HttpException('Board not create', HttpStatus.BAD_REQUEST);
        } else {
            return boardCreate;
        }
    }

    @Put(':boardId')
    async put(@Body() board: Board, @Param('boardId') boardId: string): Promise<Board> {
        board.id = boardId;
        const boardPut = await this.boardService.put(board);
        if (!boardPut) {
            throw new HttpException('Board not update', HttpStatus.NOT_MODIFIED);
        } else {
            return boardPut;
        }

    }

    @Delete(':boardId')
    async deleteById(@Param('boardId')  boardId: string): Promise<DeleteResult> {
        const deleteResult = await this.boardService.deleteById(boardId);
        if(!deleteResult){
            throw new HttpException('Board not delete', HttpStatus.BAD_REQUEST);
        } else {
            return deleteResult;
        }
    }
}
