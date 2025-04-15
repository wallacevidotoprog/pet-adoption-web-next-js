type Base = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Pets = Base & {
  name: string;
  type: string;
  size: string;
  breed: string;
  gender: string;
  age: number;
  description: string;
  vaccines: string;
  neutered: boolean;
  healthy: boolean;
  specialNeeds: boolean;
  category: string;
  availableForAdoption: boolean;
  images: string[];
  user_id: string;
};
