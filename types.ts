
export enum UnitSystem {
  METRIC = 'Metric',
  IMPERIAL = 'Imperial'
}

export interface BMIRecord {
  id: string;
  timestamp: number;
  bmi: number;
  category: string;
  weight: number;
  height: number;
  unit: UnitSystem;
}

export type BMICategory = 'Underweight' | 'Normal' | 'Overweight' | 'Obese';

export interface BMIResult {
  score: number;
  category: BMICategory;
  color: string;
  range: string;
}
