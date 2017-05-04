
export interface Project {
  $$index
  $key: string;
  id: string;
  name: string;
  owner: string;
  description: string;
  goal: string;
  active: boolean;
  from: Date | string;
  to: Date | string;
}
