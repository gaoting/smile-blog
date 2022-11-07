import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class MessageBoard {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  userName: string;

  @Column({ type: "text", nullable: true })
  content: string;
  
  @Column({ type: "text", default: null, nullable: true })
  avatar: string;

  @Column({ type: "int", default: 0, nullable: true })
  loveNum: number;

  @Column({ type: "varchar", length: 20, default: "未知IP", nullable: true })
  IP: string;

  @Column({ type: "varchar", length: 20, default: "未知位置", nullable: true })
  city: string;


  @CreateDateColumn({
    type: "timestamp",
    nullable: true,
  })
  createTime: string;
}
