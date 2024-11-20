import { supabase } from 'utils/supabaseClient';

export const insertRoutine = async (routineName: string) => {
  const { data, error } = await supabase
    .from('routine_table')
    .insert([{ name: routineName }])
    .select();

  if (error) {
    throw new Error('루틴 생성 실패');
  }

  return data;
};
