import { useMutation, useQueryClient } from '@tanstack/react-query';
import { WORKOUT_LIST_QUERY_KEY } from 'constants/queryKeys';
import { insertWorkout } from 'fetches/updates/insertWorkout';
import { InsertWorkoutParams } from 'types/workout';

export const useInsertWorkout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ name, sets, reps, related_routine_id }: InsertWorkoutParams) =>
      insertWorkout({ name, sets, reps, related_routine_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WORKOUT_LIST_QUERY_KEY] });
    },
  });
};
