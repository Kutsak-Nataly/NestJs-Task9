import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from '../board/board';
import { User } from '../user/user';
import { ColumnBoard } from '../board/column';

@Entity({name: 'task'})
export class Task {
    @Column({default: ''})
    title: string;
    @Column({default: 0})
    order: number;
    @Column({default: ''})
    description: string;
    @ManyToOne(() => User, user => user.tasks, {eager: false, onDelete: 'SET NULL', nullable: true})
    user?: User;
    @Column({ nullable: true })
    userId: string | null;
    @ManyToOne(() => Board, board => board.tasks, {eager: false, onDelete: 'CASCADE'})
    board?: Board;
    @Column({ nullable: true })
    boardId: string;
    @ManyToOne(() => ColumnBoard, column => column.tasks, {eager: false, onDelete: 'CASCADE'})
    column?: ColumnBoard;
    @Column({ nullable: true })
    columnId: string;
    @PrimaryGeneratedColumn('uuid')
    id?: string;
}
