import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export class SocketTest {
  // 信息id
@PrimaryGeneratedColumn("uuid")
id: string;

@Column({type: "text", nullable: true})
systemMsg: string;

// me name
@Column({type: "varchar",length: 20, nullable:  true})
name: string;

// me id
@Column({type: "int",length: 10, nullable:  true})
userId: number;

// 好友id
@Column({type: "int",length: 10, nullable:  true})
friendId: number;

// 好友 name
@Column({type: "varchar",length: 20, nullable:  true})
friendName: string;

// 发送time
@Column({type: 'timestamp',nullable: true})
sendTime: string;

// content
@Column({type: "text", nullable: true})
content: string;

// 头像
@Column({type: 'text', nullable: true})
photo: string;

@Column({type: 'text', nullable: true})
friendPhoto: string;

}
