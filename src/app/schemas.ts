export interface FeederCreate {
  type: number;
  name: string;
  user_id: number;
  max_meal: number;
}

export interface User {
  id: number;
  email: string;
  name: string;
  disabled: boolean;
  family_id: number;
  family_admin: boolean;
  registered_at: string;
}

export interface FeederUpdate {
  name: string;
  tags: Array<string>;
  schedule: Array<string>;
  portion_meal: number;
  current_meal: number;
}

export interface Feeder extends FeederCreate {
  id: number;
  tags: Array<string>;
  schedule: Array<string>;
  current_meal: number;
  portion_meal: number;
  configured: boolean;
}

export interface FamilyMember {
  id: number;
  name: string;
  registration: string;
}

export interface Family {
  id: number;
  name: string;
  members: Array<FamilyMember>;
  admin: number;
}

export interface NewFamilyMember {
  name: string;
  email: string;
}

export interface NewAdminMember extends NewFamilyMember {
  family_name: string;
}

export interface FeedResponse {
  fed: boolean;
  amount: number;
}

export interface FamilyStatusResponse {
  total_users: number;
  total_feeders: number;
  total_poured: number;
  current_time: string;
}

export interface Log {
  id: number;
  family_id: number;
  feeder_id: number;
  user_id: number;
  log: string;
  meal_pored: number | null;
  registered_at: string;
}
