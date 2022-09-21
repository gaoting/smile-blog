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

  @CreateDateColumn({
    type: "timestamp",
    nullable: true,
  })
  createTime: string;
}
