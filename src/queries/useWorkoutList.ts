import { useSuspenseQuery } from '@tanstack/react-query';
import { WORKOUT_LIST_QUERY_KEY } from 'constants/queryKeys';
import { getWorkoutList } from 'fetches/getWorkoutList';

export const useWorkoutList = (routineId: string | undefined) => {
  return useSuspenseQuery({
    queryKey: [WORKOUT_LIST_QUERY_KEY],
    queryFn: () => getWorkoutList(routineId),
    staleTime: 500,
  });
};
