class SettleCache {
  storage: Storage

  constructor(storage: Storage) {
    this.storage = storage
  }

  getCache(key: string): any {
    const value = this.storage.getItem(key)
    if (value) {
      return value
    }
  }

  setCache(key: string, value: any): any {
    this.storage.setItem(key, value)
  }

  removeCache(key: string): void {
    this.storage.removeItem(key)
  }

  clearCache(): void {
    this.storage.clear()
  }

  getCacheSize(): number {
    let size = 0
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i)
      if (key) {
        size += this.storage.getItem(key)?.length || 0
      }
    }
    return size
  }

  hasCache(key: string): boolean {
    return this.storage.getItem(key) !== null
  }
}

const localStorageCache = new SettleCache(localStorage)
const sessionStorageCache = new SettleCache(sessionStorage)

export { localStorageCache, sessionStorageCache }