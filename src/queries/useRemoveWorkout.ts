import { useMutation, useQueryClient } from '@tanstack/react-query';
import { WORKOUT_LIST_QUERY_KEY } from 'constants/queryKeys';
import { removeWorkout } from 'fetches/removeWorkout';

export const useRemoveWorkout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (workoutId: string) => removeWorkout({ workoutId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WORKOUT_LIST_QUERY_KEY] });
    },
  });
};
