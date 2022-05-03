import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Diary {
  @PrimaryGeneratedColumn()
  id:number

  @Column({ type: "text", nullable: true })
  content: string;

  @Column({ type: "int", default: 0, nullable: true })
  loveNum: number;

  @CreateDateColumn({
    type: "timestamp",
    nullable: true,
  })
  createTime: string;
}