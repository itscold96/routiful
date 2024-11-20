import { supabase } from 'utils/supabaseClient';

export const getWorkoutList = async (routineId: string) => {
  if (!routineId) {
    return [];
  }

  const { data, error } = await supabase
    .from('workout_table')
    .select('*')
    .eq('related_routine_id', routineId)
    .order('order');

  if (error) {
    throw new Error('운동 검색 실패');
  }

  return data;
};
