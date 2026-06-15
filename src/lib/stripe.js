import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PLAN_PRICE_ID = {
  seekar_pro: "price_1TiZdgL0CdGh4kzo9teUffer",
  seekar_premium: "price_1TibRML0CdGh4kzowQZNddPf",
  recruiter_growth: "price_1TibVaL0CdGh4kzoaIO1LV05",
  recruiter_enterprise: "price_1TibWwL0CdGh4kzoHwuyEMjX",
};
