import { useSuspenseQuery } from '@tanstack/react-query';
import { WORKOUT_LIST_QUERY_KEY } from 'constants/queryKeys';
import { getWorkoutList } from 'fetches/gets/getWorkoutList';

export const useWorkoutList = (routineId: string) => {
  return useSuspenseQuery({
    queryKey: [WORKOUT_LIST_QUERY_KEY, routineId],
    queryFn: () => getWorkoutList(routineId),
    staleTime: 60 * 5 * 1000, // tanstack-query의 gcTime이 5분이므로 최대값 부여
  });
};
