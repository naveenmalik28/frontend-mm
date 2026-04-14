import { useEffect, useState } from "react"

import { fetchMySubscription, fetchPlans } from "../api/subscriptions.api.js"
import { useSubscriptionStore } from "../store/subscriptionStore.js"

export function useSubscriptionData(withCurrent = false) {
  const plans = useSubscriptionStore((state) => state.plans)
  const subscription = useSubscriptionStore((state) => state.subscription)
  const setPlans = useSubscriptionStore((state) => state.setPlans)
  const setSubscription = useSubscriptionStore((state) => state.setSubscription)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const requests = [fetchPlans().then((data) => mounted && setPlans(data))]
    if (withCurrent) {
      requests.push(fetchMySubscription().then((data) => mounted && setSubscription(data)).catch(() => null))
    }

    Promise.all(requests).finally(() => {
      if (mounted) setLoading(false)
    })

    return () => {
      mounted = false
    }
  }, [setPlans, setSubscription, withCurrent])

  return { plans, subscription, loading }
}
