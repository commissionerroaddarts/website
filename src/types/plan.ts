export interface Plan {
  id: string;
  name: string;
  icon: string;
  price: string;
  features: string[];
  bgColor: string;
  featured?: boolean;
}

export interface PlanCardProps {
  plan: Plan;
}
