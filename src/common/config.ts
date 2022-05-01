import { Article } from "./../article/article.entity";

const productConfig = {
  type: "mysql",
  host: "localhost",
  port: 3300,
  username: "root",
  password: "12345678",
  database: "smile_blog",
  entities: [Article],
  autoLoadEntities: true,
  synchronize: true,
  logging: "all",
}

const devConfig = {
  type: "mysql",
  host: "localhost",
  port: 3300,
  username: "root",
  password: "12345678",
  database: "smile_blog",
  entities: [Article],
  autoLoadEntities: true,
  synchronize: true,
  logging: "all",
}


const config = process.env.NODE_ENV ? productConfig : devConfig;
 
export default config;