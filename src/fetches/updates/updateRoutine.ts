import { UpdateRoutineParams } from 'types/routine';
import { supabase } from 'utils/supabaseClient';

export const updateRoutine = async ({ id, name }: UpdateRoutineParams) => {
  const { data, error } = await supabase.from('routine_table').update({ name }).eq('id', id);

  if (error) {
    throw new Error('루틴 업데이트 실패');
  }

  return data;
};
