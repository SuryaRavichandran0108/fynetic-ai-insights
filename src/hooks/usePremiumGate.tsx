import { useMemo } from "react";

// TODO: replace with real auth/billing lookup later
const IS_PREMIUM = true; // set false to see the paywall

export function usePremiumGate() {
  const isPremium = useMemo(() => IS_PREMIUM, []);
  return { isPremium };
}
