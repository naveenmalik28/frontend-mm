const INDIA_TIMEZONE_MARKERS = ["Asia/Kolkata", "Asia/Calcutta"]

export const normalizeCurrency = (value) => {
  const currency = String(value || "INR").toUpperCase()
  return currency === "USD" ? "USD" : "INR"
}

export const isIndianUserTimezone = () => {
  const timezone =
    typeof Intl !== "undefined" && typeof Intl.DateTimeFormat === "function"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone || ""
      : ""
  return INDIA_TIMEZONE_MARKERS.some((marker) => timezone.includes(marker))
}

export const detectPreferredCurrency = () => (isIndianUserTimezone() ? "INR" : "USD")

export const getDisplayCurrency = (plan, preferredCurrency = "INR") => {
  const currency = normalizeCurrency(preferredCurrency)
  if (currency === "USD" && Number(plan?.price_usd || 0) > 0) {
    return "USD"
  }
  return "INR"
}

export const getPlanPriceValue = (plan, preferredCurrency = "INR") => {
  const currency = getDisplayCurrency(plan, preferredCurrency)
  return currency === "USD" ? plan?.price_usd : plan?.price
}

export const formatCurrencyAmount = (amount, currency = "INR") => {
  const normalizedCurrency = normalizeCurrency(currency)
  const locale = normalizedCurrency === "USD" ? "en-US" : "en-IN"
  const numericAmount = Number(amount || 0)
  const shouldShowDecimals = !Number.isInteger(numericAmount)
  const symbol = normalizedCurrency === "USD" ? "$" : "\u20b9"

  return `${symbol}${new Intl.NumberFormat(locale, {
    minimumFractionDigits: shouldShowDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(numericAmount)}`
}

export const formatPlanPrice = (plan, preferredCurrency = "INR") => {
  const currency = getDisplayCurrency(plan, preferredCurrency)
  return formatCurrencyAmount(getPlanPriceValue(plan, currency), currency)
}
