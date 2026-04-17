import api from "./axios.js"

export const fetchPlans = async () => {
  const { data } = await api.get("/plans/")
  return data
}

export const createCheckout = async ({ planId, currency }) => {
  const { data } = await api.post("/subscriptions/checkout/", { plan_id: planId, currency })
  return data
}

export const verifyPayment = async (payload) => {
  const { data } = await api.post("/subscriptions/verify/", payload)
  return data
}

export const fetchMySubscription = async () => {
  const { data } = await api.get("/subscriptions/my/")
  return data
}
