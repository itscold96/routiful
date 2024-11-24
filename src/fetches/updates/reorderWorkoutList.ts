import { ReorderWorkoutListParams } from 'types/workout';
import { supabase } from 'utils/supabaseClient';

export const reorderWorkoutList = async ({ routineId, reorderedWorkoutList }: ReorderWorkoutListParams) => {
  const { error } = await supabase
    .from('workout_table')
    .upsert(reorderedWorkoutList) // `id` 기준 업데이트
    .eq('related_routine_id', routineId); // 특정 루틴에만 적용

  if (error) {
    throw new Error('운동 순서 변경 실패');
  }
};
