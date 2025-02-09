import { Database } from './database.types';

export type WorkoutRows = Database['public']['Tables']['workout_table']['Row'];

export type WorkoutWithoutId = Omit<WorkoutRows, 'order'>;

export type WorkoutWithoutRelatedId = Omit<WorkoutRows, 'related_routine_id'>;

export type UpdateWorkoutParams = Omit<WorkoutRows, 'related_routine_id' | 'order'>;

export type InsertWorkoutParams = Omit<WorkoutRows, 'order' | 'id'>;

export interface ReorderWorkoutListParams {
  routineId: string;
  reorderedWorkoutList: WorkoutRows[];
}
