import { ArticleService } from "./article.service";
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    findAll(query: any): Promise<any>;
    findById(id: any): Promise<any>;
    searchList(query: any): Promise<any>;
    create(body: any): void;
    updateOne(id: any, body: any): Promise<String>;
    delete(id: any): Promise<String>;
}
