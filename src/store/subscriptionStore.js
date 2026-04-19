import { create } from "zustand"

export const useSubscriptionStore = create((set) => ({
  subscription: null,
  subscriptionOwnerKey: null,
  subscriptionLoadedAt: 0,
  plans: [],
  plansLoadedAt: 0,
  setSubscription: (subscription, ownerKey = null) =>
    set({
      subscription,
      subscriptionOwnerKey: ownerKey,
      subscriptionLoadedAt: Date.now(),
    }),
  setPlans: (plans) =>
    set({
      plans,
      plansLoadedAt: Date.now(),
    }),
  clearSubscription: () =>
    set({
      subscription: null,
      subscriptionOwnerKey: null,
      subscriptionLoadedAt: 0,
    }),
}))
