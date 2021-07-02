import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../task/task';
import { ColumnBoard } from './column';

@Entity({name: 'board'})
export class Board {
    @Column({default: 'string'})
    title: string;
    @OneToMany(() => ColumnBoard, column => column.board, {cascade: ['insert', 'update', 'remove', 'soft-remove', 'recover'], eager: true})
    columns: ColumnBoard[];
    @OneToMany(() => Task, task => task.board, {cascade: ['remove']})
    tasks: Task[];
    @PrimaryGeneratedColumn('uuid')
    id?: string;
}
