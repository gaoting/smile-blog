import { Repository } from "typeorm";
import { Article } from "./article.entity";
export declare class ArticleService {
    private readonly articleService;
    constructor(articleService: Repository<Article>);
    findAll(query?: any): Promise<any>;
    findById(id: number): Promise<any>;
    searchNum(query?: any): Promise<any>;
    create(obj: any): Promise<any>;
    update(id: any, cat: any): Promise<String>;
    delete(id: any): Promise<String>;
}
