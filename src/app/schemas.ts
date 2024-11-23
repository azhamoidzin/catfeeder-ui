export interface FeederBase {
  type: number;
  name: string;
  user_id: number;
  tags: Array<string>;
  schedule: Array<string>;
  max_meal: number;
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

export interface Feeder extends FeederBase {
  feeder_id: number;
}
