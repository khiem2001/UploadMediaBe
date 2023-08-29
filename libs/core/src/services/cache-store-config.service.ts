import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import * as redis from 'redis';

@Injectable()
export class CacheStoreConfigService implements CacheOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    const database: redis.ClientOpts = {
      host: this.config.get<string>('CACHING_REDIS_HOST'),
      port: this.config.get<number>('CACHING_REDIS_PORT'),
      password: this.config.get<string>('CACHING_REDIS_PASSWORD'),
    };

    const caching: { ttl: number; max: number } = {
      ttl: this.config.get<number>('CACHING_TTL'),
      max: this.config.get<number>('CACHING_MAX'),
    };

    if (database?.password === '') {
      delete database.password;
    }
    return {
      store: redisStore,
      ttl: caching?.ttl | 10,
      max: caching?.max | 15,
      options: {
        ...database,
      },
    };
  }
}
