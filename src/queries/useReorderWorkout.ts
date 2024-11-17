import { useMutation, useQueryClient } from '@tanstack/react-query';
import { WORKOUT_LIST_QUERY_KEY } from 'constants/queryKeys';
import { reorderWorkoutList } from 'fetches/reorderWorkoutList';
import { ReorderWorkoutListParams } from 'types/workout';

export const useReorderWorkout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ routineId, reorderedWorkoutList }: ReorderWorkoutListParams) =>
      reorderWorkoutList({ routineId, reorderedWorkoutList }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WORKOUT_LIST_QUERY_KEY] });
    },
  });
};
