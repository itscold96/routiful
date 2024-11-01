import { supabase } from 'utils/supabaseClient';

export const getWorkoutList = async (routineId: string | undefined) => {
  if (!routineId) {
    return [];
  }

  const { data } = await supabase.from('workout_table').select('*').eq('related_routine_id', routineId);

  return data;
};
