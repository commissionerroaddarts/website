export interface Plan {
  id: string;
  name: string;
  description?: string;
  icon: string;
  prices: {
    monthly: {
      priceId: string;
      price: number;
    };
    yearly: {
      priceId: string;
      price: number;
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
