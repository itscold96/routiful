import { useQuery } from '@tanstack/react-query';
import { ROUTINE_LIST_QUERY_KEY } from 'constants/queryKeys';
import { getWorkoutCount } from 'fetches/getWorkoutCount';

export const useWorkoutCount = (routineId: string) => {
  return useQuery({ queryKey: [ROUTINE_LIST_QUERY_KEY, routineId], queryFn: () => getWorkoutCount(routineId) });
};
