import { supabase } from 'utils/supabaseClient';

export const getRoutineList = async (keyword = '') => {
  let query = supabase.from('routine_table').select('*');

  if (keyword) {
    // %는 sql에서 와일드카드로 사용되는 문자이다.
    // %를 사용하면 해당 문자가 특정 문자열의 앞, 뒤, 중간 어디에 있던 들어만 있다면 검색한다.
    query = query.like('name', `%${keyword}%`);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error('루틴 검색 실패');
  }

  return data;
};
