import { supabase } from 'utils/supabaseClient';

export const insertRoutine = async (routineName: string) => {
  const { data } = await supabase
    .from('routine_table')
    .insert([{ name: routineName }])
    .select();

  return data;
};
