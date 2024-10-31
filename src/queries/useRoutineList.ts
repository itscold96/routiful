import { useSuspenseQuery } from '@tanstack/react-query';
import { ROUTINE_LIST_QUERY_KEY } from 'constants/queryKeys';
import { getRoutineList } from 'fetches/getRoutineList';

export const useRoutineList = () => {
  return useSuspenseQuery({ queryKey: [ROUTINE_LIST_QUERY_KEY], queryFn: getRoutineList, staleTime: 500 });
};
