export type HabitsType = {
  id: string;
  label: string;
  tag: string;
  created_at: string;
  category: string[];
  updated_at: string;
  order: number;
  description: string;
  color: string;
  goal: number;
};

export type AddHabitForm = {
  label: string;
  tag: string;
  category: string[];
  order: number;
  description: string;
  color: string;
  goal: number;
};
