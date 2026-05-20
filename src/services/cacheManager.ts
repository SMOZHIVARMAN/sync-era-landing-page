type Entry<T> = { value: T; expires: number };

const memory = new Map<string, Entry<unknown>>();
const TTL = 1000 * 60 * 10; // 10 min

export const cacheManager = {
  get<T>(key: string): T | null {
    const e = memory.get(key) as Entry<T> | undefined;
    if (!e) return null;
    if (Date.now() > e.expires) {
      memory.delete(key);
      return null;
    }
    return e.value;
  },
  set<T>(key: string, value: T, ttl = TTL) {
    memory.set(key, { value, expires: Date.now() + ttl });
  },
  clear() { memory.clear(); },
};
