import { create } from "zustand"

export const useSubscriptionStore = create((set) => ({
  subscription: null,
  plans: [],
  setSubscription: (subscription) => set({ subscription }),
  setPlans: (plans) => set({ plans }),
}))

