import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 20, default: "", nullable: true })
  author: string;

  @Column({ type: "varchar", length: 20, default: "", nullable: true })
  tags: string;

  @Column({ type: "varchar", length: 20, default: "", nullable: true })
  types: string;

  @Column({ type: "int", default: 0, nullable: true })
  lookNum: number;

  @Column({ type: "int", default: 0, nullable: true })
  loveNum: number;

  @Column({ type: "varchar", length: 60, default: "", nullable: true })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "text", nullable: true })
  content: string;

  @Column({ type: "text", nullable: true })
  picture: string;

  @Column({ type: "varchar", length: 2, default: "2", nullable: true })
  activeKey: string;

  @Column({ type: "int", default: null, nullable: true })
  preId: number;

  @Column({ type: "int", default: null, nullable: true })
  nextId: number;

  @Column({ type: "varchar", length: 60, default: "", nullable: true })
  preTitle: string;

  @Column({ type: "varchar", length: 60, default: "", nullable: true })
  nextTitle: string;

  @CreateDateColumn({
    type: "timestamp",
    nullable: true,
  })
  createTime: string;

  @UpdateDateColumn({
    type: "timestamp",
    nullable: true,
  })
  updateTime: string;
}
