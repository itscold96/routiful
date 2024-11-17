import { UpdateWorkoutParams, WorkoutRows } from 'types/workout';
import { supabase } from 'utils/supabaseClient';

export const updateWorkout = async ({ id, name, reps, sets }: UpdateWorkoutParams) => {
  const { data, error } = await supabase.from('workout_table').update({ name, reps, sets }).eq('id', id);

  if (error) {
    throw new Error('운동 업데이트 실패');
  }

  return data;
};
