import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  tags: string;

  @Column()
  types: string;

  @Column()
  lookNum: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createTime: string;

  @UpdateDateColumn()
  updateTime: string;
}
