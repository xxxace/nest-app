import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 50 })
    name: string

    @Column({ type: 'int', unsigned: true })
    gender: number

    @Column({ type: 'int', unsigned: true })
    age: number

    @CreateDateColumn({ type: 'timestamp' })
    create_at: Date
}