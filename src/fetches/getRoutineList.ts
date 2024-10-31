import { supabase } from 'utils/supabaseClient';

export const getRoutineList = async () => {
  const { data } = await supabase.from('routine_table').select('*');

  return data;
};
