import { supabase } from 'utils/supabaseClient';

export const removeWorkout = async ({ workoutId }: { workoutId: string }) => {
  const { error } = await supabase.from('workout_table').delete().eq('id', workoutId);

  if (error) {
    throw new Error('운동 삭제 실패');
  }
};
