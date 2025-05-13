export interface Plan {
  id: string;
  name: string;
  description?: string;
  icon: string;
  prices: {
    monthly: {
      priceId: string;
      amount: number;
      currency: string;
    };
    yearly: {
      priceId: string;
      amount: number;
      currency: string;
    };
  };
  currency: string;
  features: { name: string }[];
  bgColor: string;
  featured?: boolean;
  billingCycle?: string;
}

export interface PlanCardProps {
  plan: Plan;
}
