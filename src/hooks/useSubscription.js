import { useEffect, useState } from "react"

import { fetchMySubscription, fetchPlans } from "../api/subscriptions.api.js"
import { useAuthStore } from "../store/authStore.js"
import { useSubscriptionStore } from "../store/subscriptionStore.js"
import { serializeCacheKey } from "../utils/requestCache.js"

const PLANS_TTL = 5 * 60_000
const SUBSCRIPTION_TTL = 60_000
const isFresh = (timestamp, ttl) => timestamp > 0 && Date.now() - timestamp < ttl

export function useSubscriptionData(withCurrent = false) {
  const user = useAuthStore((state) => state.user)
  const plans = useSubscriptionStore((state) => state.plans)
  const plansLoadedAt = useSubscriptionStore((state) => state.plansLoadedAt)
  const subscription = useSubscriptionStore((state) => state.subscription)
  const subscriptionLoadedAt = useSubscriptionStore((state) => state.subscriptionLoadedAt)
  const subscriptionOwnerKey = useSubscriptionStore((state) => state.subscriptionOwnerKey)
  const setPlans = useSubscriptionStore((state) => state.setPlans)
  const setSubscription = useSubscriptionStore((state) => state.setSubscription)

  const subscriptionOwner = user ? String(user.id ?? user.email ?? user.username ?? "") : null
  const hasFreshPlans = plans.length > 0 && isFresh(plansLoadedAt, PLANS_TTL)
  const hasFreshSubscription =
    Boolean(withCurrent) &&
    Boolean(subscriptionOwner) &&
    subscriptionOwnerKey === subscriptionOwner &&
    isFresh(subscriptionLoadedAt, SUBSCRIPTION_TTL)
  const visibleSubscription = subscriptionOwnerKey === subscriptionOwner ? subscription : null
  const shouldFetchPlans = !hasFreshPlans
  const shouldFetchSubscription = Boolean(withCurrent && subscriptionOwner && !hasFreshSubscription)
  const fetchKey =
    shouldFetchPlans || shouldFetchSubscription
      ? serializeCacheKey({ shouldFetchPlans, shouldFetchSubscription, subscriptionOwner })
      : null

  const [resolvedFetchKey, setResolvedFetchKey] = useState(null)
  const loading = Boolean(fetchKey) && resolvedFetchKey !== fetchKey

  useEffect(() => {
    let mounted = true
    const requests = []

    if (shouldFetchPlans) {
      requests.push(fetchPlans().then((data) => mounted && setPlans(data)))
    }

    if (shouldFetchSubscription) {
      requests.push(
        fetchMySubscription()
          .then((data) => {
            if (mounted) {
              setSubscription(data, subscriptionOwner)
            }
          })
          .catch(() => {
            if (mounted) {
              setSubscription(null, subscriptionOwner)
            }
          }),
      )
    }

    if (requests.length === 0) {
      return undefined
    }

    Promise.all(requests).finally(() => {
      if (mounted) {
        setResolvedFetchKey(fetchKey)
      }
    })

    return () => {
      mounted = false
    }
  }, [fetchKey, setPlans, setSubscription, shouldFetchPlans, shouldFetchSubscription, subscriptionOwner])

  return { plans, subscription: visibleSubscription, loading }
}
