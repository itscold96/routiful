import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTINE_LIST_QUERY_KEY } from 'constants/queryKeys';
import { removeRoutine } from 'fetches/removeRoutine';

export const useRemoveRoutine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (workoutId: string) => removeRoutine(workoutId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ROUTINE_LIST_QUERY_KEY] });
    },
  });
};
