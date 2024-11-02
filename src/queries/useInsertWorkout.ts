import { useMutation, useQueryClient } from '@tanstack/react-query';
import { WORKOUT_LIST_QUERY_KEY } from 'constants/queryKeys';
import { insertWorkout, insertWorkoutParams } from 'fetches/insertWorkout';

export const useInsertWorkout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ workoutName, sets, reps, routineId }: insertWorkoutParams) =>
      insertWorkout({ workoutName, sets, reps, routineId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WORKOUT_LIST_QUERY_KEY] });
    },
  });
};
