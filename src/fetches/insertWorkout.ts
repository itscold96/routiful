import { supabase } from 'utils/supabaseClient';

export interface insertWorkoutParams {
  routineId: string;
  workoutName: string;
  sets: number;
  reps: number;
}

export const insertWorkout = async ({ routineId, workoutName, reps, sets }: insertWorkoutParams) => {
  // 루틴 내 운동 개수 조회
  const { data: countData, error: countError } = await supabase
    .from('workout_table')
    .select('id', { count: 'exact' }) // 총 개수 조회
    .eq('related_routine_id', routineId);

  if (countError) {
    throw new Error('운동 개수 확인 실패');
  }

  const newOrder = (countData?.length || 0) + 1; // 운동 개수 + 1 = 새 order 값

  // 입력된 운동 추가
  const { data, error } = await supabase
    .from('workout_table')
    .insert([
      {
        name: workoutName,
        sets,
        reps,
        related_routine_id: routineId,
        order: newOrder,
      },
    ])
    .select();

  if (error) {
    throw new Error('운동 생성 실패');
  }

  return data;
};
