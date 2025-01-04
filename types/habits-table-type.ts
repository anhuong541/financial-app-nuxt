export type HabitsType = {
  id: string;
  label: string;
  tags: string;
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
