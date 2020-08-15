import "module-alias/register";
import { cacheInit } from "@core/modules/cache";

type ValueType =
  | string
  | number
  | {
      [key: string]: string | number;
    }
  | (string | number)[];

export function cacheClientCreate(credentials: {
  port?: number;
  host?: string;
}) {
  const cacheManager = cacheInit(credentials);
  return {
    /***
     * value должно быть объектом имей в виду
     *
     * @example
     * req.cache.save({ key: '1', value: { test: Date.now() } });
     */
    save: ({ key, value }: { key: string; value: ValueType }) => {
      return new Promise<Error | boolean>((resolve, reject) => {
        cacheManager.hmset(key, value, (err: Error | null) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        });
      });
    },
    saveTemporary: ({
      key,
      value,
      time,
    }: {
      key: string;
      value: ValueType;
      time: number;
    }) => {
      return new Promise<boolean>((resolve, reject) => {
        cacheManager.hmset(key, value, (err: Error | null) => {
          if (err) {
            reject(err);
          } else {
            cacheManager.expire(key, time);
            resolve(true);
          }
        });
      });
    },
    get: ({ key }: { key: string }) => {
      return new Promise<{
        [key: string]: string;
      }>((resolve, reject) => {
        cacheManager.hgetall(key, (err: Error | null, reply: any) => {
          if (err) {
            reject(err);
          }
          resolve(reply);
        });
      });
    },
    getExpirationTime: ({ key }: { key: string }) => {
      return new Promise<Error | null>((resolve) => {
        cacheManager.ttl(key, (data: any) => {
          console.log(data);
          resolve();
        });
      });
    },
    deleteKey: ({ key }: { key: string }) => {
      return new Promise<boolean>((resolve, reject) => {
        cacheManager.del(key, (err: Error | null, response: any) => {
          if (err) reject(false);
          if (response === 1) {
            resolve(true);
          } else {
            reject(false);
          }
        });
      });
    },
    client: cacheManager,
  };
}

export type CacheClientCreateType = ReturnType<typeof cacheClientCreate>;
