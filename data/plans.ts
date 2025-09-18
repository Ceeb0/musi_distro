
import { Plan } from "../types";

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    priceDescription: "forever",
    isPopular: false,
    features: ["Upload up to 5 tracks", "Basic analytics", "Standard support", "Low-quality download"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 9.99,
    priceDescription: "month",
    isPopular: true,
    features: ["Unlimited uploads", "Advanced analytics", "Pro badge on profile", "Priority support", "High-quality beat upload"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 49.99,
    priceDescription: "month",
    isPopular: false,
    features: ["All Pro features", "Custom branding", "Team accounts", "Dedicated account manager", "High-quality beat upload"],
  },
];
