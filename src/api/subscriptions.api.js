import api from "./axios.js"
import { cachedRequest, invalidateCacheNamespace } from "../utils/requestCache.js"

const PLAN_CACHE_TTL = 5 * 60_000
const SUBSCRIPTION_CACHE_TTL = 60_000

export const fetchPlans = async () =>
  cachedRequest(
    "plans",
    "all",
    async () => {
      const { data } = await api.get("/plans/")
      return data
    },
    { ttl: PLAN_CACHE_TTL },
  )

export const createCheckout = async ({ planId, currency }) => {
  if (!planId) {
    throw new Error("Plan ID is required")
  }

  const { data } = await api.post("/subscriptions/checkout/", { plan_id: planId, currency })
  return data
}

export const verifyPayment = async (payload) => {
  const { data } = await api.post("/subscriptions/verify/", payload)
  invalidateCacheNamespace("plans")
  invalidateCacheNamespace("my-subscription")
  return data
}

export const fetchMySubscription = async () =>
  cachedRequest(
    "my-subscription",
    "me",
    async () => {
      const { data } = await api.get("/subscriptions/my/")
      return data
    },
    { ttl: SUBSCRIPTION_CACHE_TTL },
  )
