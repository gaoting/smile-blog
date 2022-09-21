import { MessageBoard } from './../messageBoard/messageboard.entity';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 20, nullable: true  })
  userName: string;

  @Column({ type: "varchar", length: 100, nullable: true  })
  pwd: string;

  @Column({ type: "text", default: null, nullable: true })
  avatar: string;

  @Column({ type: "varchar", length: 20, default: "未知", nullable: true })
  IP: string;

  @CreateDateColumn({ type: "timestamp" })
  createTime: string;

  @UpdateDateColumn({ type: "timestamp" })
  updateTime: string;

  @OneToMany(type=> MessageBoard, messageBoard => messageBoard.userName)
  messageBoard: MessageBoard[]
}
