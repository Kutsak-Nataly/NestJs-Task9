import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../task/task';

export type UserPublic = Omit<User, 'password'>;

@Entity({ name: 'user' })
export class User {
    @Column({ default: 'USER' })
    name: string;
    @Column({ default: 'user', unique: true })
    login: string;
    @Column({ default: 'P@55w0rd' })
    password: string;
    @OneToMany(() => Task, (task) => task.user, { cascade: ['remove'] })
    tasks?: Task[];
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    static toResponse(user: User): UserPublic {
        const { id, name, login } = user;
        return { id, name, login };
    }
}
