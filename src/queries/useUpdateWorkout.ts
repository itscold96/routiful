import { useMutation, useQueryClient } from '@tanstack/react-query';
import { WORKOUT_LIST_QUERY_KEY } from 'constants/queryKeys';
import { updateWorkout } from 'fetches/updateWorkout';
import { UpdateWorkoutParams } from 'types/workout';

export const useUpdateWorkout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name, reps, sets }: UpdateWorkoutParams) => updateWorkout({ id, name, reps, sets }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WORKOUT_LIST_QUERY_KEY] });
    },
  });
};
