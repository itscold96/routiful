import { useMutation, useQueryClient } from '@tanstack/react-query';
import { WORKOUT_LIST_QUERY_KEY } from 'constants/queryKeys';
import { updateRoutine } from 'fetches/updateRoutine';
import { UpdateRoutineParams } from 'types/routine';

export const useUpdateRoutine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name }: UpdateRoutineParams) => updateRoutine({ id, name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WORKOUT_LIST_QUERY_KEY] });
    },
  });
};
