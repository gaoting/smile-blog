import { Injectable } from "@nestjs/common";
import { RedisService } from "@liaoliaots/nestjs-redis";
import * as Redis from "ioredis";

@Injectable()
export class AppService {
  private redis: Redis.Redis;
  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient("counter");
  }

  async getNum(): Promise<any> {
    let getCounter = await this.redis.get("counter");

    getCounter
      ? await this.redis.set("counter", +getCounter + 1)
      : await this.redis.set("counter", 1);

    return {
      code: 200,
      data: await this.redis.get("counter"),
      message: "ok",
    };
  }
}
