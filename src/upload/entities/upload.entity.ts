import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Upload {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 30, default: "", nullable: true })
  fileName: string;

  @Column({ type: "text", nullable: true })
  url: string;

  @CreateDateColumn({type: "timestamp",nullable: true})
  date: string;
}
