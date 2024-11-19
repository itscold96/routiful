import { supabase } from 'utils/supabaseClient';

export const removeRoutine = async (routineId: string) => {
  const { error } = await supabase.from('routine_table').delete().eq('id', routineId);

  if (error) {
    throw new Error('루틴 삭제 실패');
  }
};
