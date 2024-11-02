import { supabase } from 'utils/supabaseClient';

export interface insertWorkoutParams {
  routineId: string;
  workoutName: string;
  sets: number;
  reps: number;
}

export const insertWorkout = async ({ routineId, workoutName, reps, sets }: insertWorkoutParams) => {
  const { data } = await supabase
    .from('workout_table')
    .insert([
      {
        name: workoutName,
        sets,
        reps,
        related_routine_id: routineId,
      },
    ])
    .select();

  return data;
};
