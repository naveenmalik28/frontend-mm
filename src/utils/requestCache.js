const responseCache = new Map()
const inflightCache = new Map()

const isPlainObject = (value) => Object.prototype.toString.call(value) === "[object Object]"

const stableSerializeValue = (value) => {
  if (Array.isArray(value)) {
    return `[${value.map((item) => stableSerializeValue(item)).join(",")}]`
  }

  if (isPlainObject(value)) {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableSerializeValue(value[key])}`)
      .join(",")}}`
  }

  return JSON.stringify(value)
}

const getCacheKey = (namespace, key) => `${namespace}:${stableSerializeValue(key)}`

export const serializeCacheKey = (value) => stableSerializeValue(value)

export const cachedRequest = async (namespace, key, fetcher, { ttl = 60_000 } = {}) => {
  const cacheKey = getCacheKey(namespace, key)
  const cachedEntry = responseCache.get(cacheKey)

  if (cachedEntry && Date.now() - cachedEntry.timestamp < ttl) {
    return cachedEntry.data
  }

  const pendingRequest = inflightCache.get(cacheKey)
  if (pendingRequest) {
    return pendingRequest
  }

  const request = Promise.resolve()
    .then(fetcher)
    .then((data) => {
      responseCache.set(cacheKey, { data, timestamp: Date.now() })
      return data
    })
    .finally(() => {
      inflightCache.delete(cacheKey)
    })

  inflightCache.set(cacheKey, request)
  return request
}

export const invalidateCacheNamespace = (namespace) => {
  const cacheKeyPrefix = `${namespace}:`

  for (const key of responseCache.keys()) {
    if (key.startsWith(cacheKeyPrefix)) {
      responseCache.delete(key)
    }
  }

  for (const key of inflightCache.keys()) {
    if (key.startsWith(cacheKeyPrefix)) {
      inflightCache.delete(key)
    }
  }
}
