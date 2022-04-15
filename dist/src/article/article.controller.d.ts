import { ArticleService } from "./article.service";
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    findAll(): Promise<any>;
    create(body: any): void;
    updateOne(id: any, body: any): Promise<String>;
    delete(id: any, body: any): Promise<String>;
}
