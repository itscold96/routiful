import { useQuery } from '@tanstack/react-query';
import { WORKOUT_COUNT_QUERY_KEY, WORKOUT_LIST_QUERY_KEY } from 'constants/queryKeys';
import { getWorkoutCount } from 'fetches/getWorkoutCount';

export const useWorkoutCount = (routineId: string) => {
  return useQuery({
    queryKey: [WORKOUT_LIST_QUERY_KEY, WORKOUT_COUNT_QUERY_KEY, routineId],
    queryFn: () => getWorkoutCount(routineId),
  });
};
