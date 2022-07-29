import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Login {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 20 })
  userName: string;

  @Column({ type: "varchar" })
  pwd: string;

  @Column({ type: "text", default: null, nullable: true })
  avatar: string;

  @Column({ type: "varchar", length: 20, default: "未知", nullable: true })
  IP: string;

  @CreateDateColumn({ type: "timestamp" })
  createTime: string;

  @UpdateDateColumn({ type: "timestamp" })
  updateTime: string;
}
