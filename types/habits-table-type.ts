export type HabitsType = {
  id: string;
  label: string;
  tag: string;
  created_at: {
    seconds: number;
    nanoseconds: number;
  };
  category: string[];
  updated_at: {
    seconds: number;
    nanoseconds: number;
  };
  order: number;
  description: string;
  color: string;
};

export type AddHabitForm = {
  label: string;
  tag: string;
  category: string[];
  order: number;
  description: string;
  color: string;
};
