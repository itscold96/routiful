import { supabase } from 'utils/supabaseClient';

export const getWorkoutCount = async (routineId: string) => {
  const { count, error } = await supabase
    .from('workout_table')
    .select('*', { count: 'exact', head: true }) // 데이터를 반환하지 않고 개수만 요청
    .eq('related_routine_id', routineId);

  if (error) {
    throw new Error('운동 개수 반환 실패');
  }

  return count;
};
