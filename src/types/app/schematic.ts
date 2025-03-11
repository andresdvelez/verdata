export interface Plan {
  company_count: number;
  created_at: Date;
  description: string;
  features: Feature[];
  icon: string;
  id: string;
  is_default: boolean;
  is_free: boolean;
  is_trialable: boolean;
  name: string;
  plan_type: string;
  updated_at: Date;
  audience_type: string;
  billing_product: BillingProduct;
  monthly_price: Price;
  trial_days: number;
  yearly_price: Price;
}

export interface BillingProduct {
  account_id: string;
  created_at: Date;
  currency: string;
  environment_id: string;
  external_id: string;
  name: string;
  price: number;
  prices: Price[];
  product_id: string;
  quantity: number;
  updated_at: Date;
}

export interface Price {
  currency: string;
  external_price_id: string;
  id: string;
  interval: string;
  price: number;
}

export interface Feature {
  created_at: Date;
  description: string;
  feature_type: string;
  flags: Flag[];
  icon: string;
  id: string;
  name: string;
  plans: PlanElement[];
  updated_at: Date;
}

export interface Flag {
  created_at: Date;
  default_value: boolean;
  description: string;
  flag_type: string;
  id: string;
  key: string;
  name: string;
  rules: Rule[];
  updated_at: Date;
}

export interface Rule {
  condition_groups: ConditionGroup[];
  conditions: Condition[];
  created_at: Date;
  environment_id: string;
  id: string;
  name: string;
  priority: number;
  rule_type: string;
  updated_at: Date;
  value: boolean;
}

export interface ConditionGroup {
  conditions: Condition[];
  created_at: Date;
  environment_id: string;
  id: string;
  rule_id: string;
  updated_at: Date;
}

export interface Condition {
  condition_type: string;
  created_at: Date;
  environment_id: string;
  id: string;
  operator: string;
  resource_ids: string[];
  resources: PlanElement[];
  rule_id: string;
  trait_value: string;
  updated_at: Date;
}

export interface PlanElement {
  id: string;
  name: string;
}
