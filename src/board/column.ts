import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from './board';
import { Task } from '../task/task';

@Entity({ name: 'column' })
export class ColumnBoard {

    @Column({ default: 'Title' })
    title: string;
    @Column({ default: 0 })
    order: number;
    @ManyToOne(() => Board, board => board.columns, { onDelete: 'CASCADE' })
    board?: Board;
    @Column()
    boardId: string;
    @OneToMany(() => Task, task => task.column, { cascade: ['remove'] })
    tasks: Task[];
    @PrimaryGeneratedColumn('uuid')
    id?: string;
}
